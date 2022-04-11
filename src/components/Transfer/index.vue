<template>
  <div>
    <div class="ma-4">
      <div class="fontsize18 indigo--text ma-3">ການລາຍບີນທີ່ໂອນແລ້ວ</div>
      <div class="fontsize14 ml-3 mb-1">
        ຈຳນວນ <strong style="color: red">{{ count }} ລາຍການ</strong>
      </div>
      <v-data-table
        dense
        :headers="deaderColumn"
        :items="viewTranfer"
        class="elevation-1 grey lighten-4"
        loading="true"
      >
        <template v-slot:item.invId="{ item }">
          <span class="teal--text darken-4">{{ item.invId }}</span>
        </template>
        <template v-slot:item.pmPrice="{ item }">
          <span class="green--text">{{
            new Intl.NumberFormat().format(item.pmPrice)
          }}</span>
        </template>
        <template v-slot:item.invPrice="{ item }">
          <span class="green--text">{{
            new Intl.NumberFormat().format(item.invPrice)
          }}</span>
        </template>
        <template v-slot:item.pmNumbersix="{ item }">
          <span class="indigo--text">{{
            item.pmNumbersix.replace(/(\d{3})(\d{3})/, "$1-$2")
          }}</span>
        </template>
        <template v-slot:item.pmState="{ item }">
          <v-chip
            small
            color="orange white--text"
            close
            close-icon="mdi-swap-horizontal"
            >{{ item.pmState }}</v-chip
          >
        </template>
        <template v-slot:item.active="{ item }">
          <v-btn small color="success" @click="checkDate(item)">ກວດສອບ</v-btn>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" persistent width="800px">
      <v-card>
        <v-card-title class="grey lighten-1">
          <div>ຂໍ້ມູນລາຍລະອຽດ</div>
        </v-card-title>
        <v-expansion-panels class="ma-4">
          <v-expansion-panel>
            <v-expansion-panel-header>
              ການໂອນເງິນ
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <v-row>
                  <v-col cols="12" sm="3" md="3">
                    <v-img
                      :src="
                        'http://127.0.0.1:8000/storage/images/payment/' +
                          listOreder.pmImage
                      "
                      width="200px"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <div>
                      ເລກບັນຊີ:
                      {{ listOreder.pmNumbersix }}
                    </div>
                    <div>
                      ຈຳນວນໂອນ:
                      {{ new Intl.NumberFormat().format(listOreder.invPrice) }}
                    </div>
                    <div>ຈຳນວນສິນຄ້າ: {{ listOreder.invQty }}</div>
                    <div>
                      ລາຄາລວມ:
                      {{ new Intl.NumberFormat().format(listOreder.invPrice) }}
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-data-table
          dense
          :headers="headeerDetail"
          :items="ordered"
          class="elevation-1"
          loading="true"
        >
        </v-data-table>
        <v-card-actions>
          <v-btn color="red" @click="dialog = false" dark>ປີດ</v-btn>
          <v-btn color="ordered" @click="isOpenCancell" dark
            >ຍົກເລີກການສັ່ງຊື້</v-btn
          >
          <v-btn color="green" @click="isOpenCommit" dark>ກວດສອບສຳເລັດ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import TransferService from "@/service/Sell/CheckTransfer";
import Notify from "@/notify/notifycation";
import { mapState } from "vuex";
export default {
  data() {
    return {
      count: 1,
      dialog: false,
      viewTranfer: [],
      deaderColumn: [
        { text: "ບີນ", value: "invId", width: "10" },
        { text: "ລູກຄ້າ", value: "cus_fullname" },
        { text: "ເບີໂທ", value: "cus_phone" },
        { text: "ຈັດສົ່ງທີ່", value: "address", width: "410" },
        { text: "ເລກບັນຊີ", value: "pmNumbersix" },
        { text: "ໂອນ", value: "pmPrice" },
        { text: "ຈຳນວນ", value: "invQty" },
        { text: "ລວມ", value: "invPrice" },
        { text: "ສະຖານະ", value: "pmState" },
        { text: "ວັນທີ", value: "created_at" },
        { text: "ເລືອກ", value: "active" }
      ],
      headeerDetail: [
        { text: "ລະຫັດສິນຄ້າ", value: "invId" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ຈຳນວນ", value: "sdQty" },
        { text: "ລາຄາ", value: "sdPrice" },
        { text: "ລວມ", value: "total" }
      ],
      InvoinceId: "",
      ordered: [],
      listOreder: {},
      paymentId: ""
    };
  },
  methods: {
    async seriesTransfer() {
      try {
        let value = (await TransferService.checkViewTranfer()).data;
        this.count = value.count;
        this.viewTranfer = value.data;
        // console.log(value.data);
      } catch (error) {
        console.log("error view transfer");
      }
    },
    async viewOrdered() {
      try {
        let value = (await TransferService.viewOrdered(this.InvoinceId)).data;
        this.ordered = value.data;
      } catch (error) {
        console.log("error view Order");
      }
    },
    async viewTransfer() {
      try {
        let value = (await TransferService.viewTransfer(this.InvoinceId)).data;
        this.listOreder = value.data[0];
        this.paymentId = value.data[0].pmId;
        this.$store.dispatch("EventNotifycation", []);

        // console.log(this.listOreder);
      } catch (error) {
        console.log("error viewtransfer");
      }
    },
    async isOpenCommit() {
      try {
        let up = await TransferService.CommitTransfer(this.paymentId);
        Notify.showMessage("success", up.data.message, 3000);
        this.dialog = false;
        this.$store.commit("changeTransfer", this.paymentId);
        this.$store.dispatch("EventNotifycation", []);
        this.seriesTransfer();

        await TransferService.SaveTransfer({
          payment_id: this.paymentId,
          chconfirm: "commit"
        });
        // console.log(this.paymentId);
      } catch (error) {
        console.log("error commit");
      }
    },
    async isOpenCancell() {
      try {
        let del = await TransferService.CencelInvoince(
          this.InvoinceId,
          this.ordered
        );
        Notify.showMessage("success", del.data.message, 3000);
        this.dialog = false;
        this.$store.commit("changeTransfer", this.paymentId);
        this.$store.dispatch("EventNotifycation", []);
        this.seriesTransfer();
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດລືບບີນໄດ້", 3000);
      }
    },
    checkDate(item) {
      this.dialog = true;
      this.InvoinceId = item.invId;
      this.viewOrdered();
      this.viewTransfer();
      //   console.log(this.InvoinceId);
    }
  },
  computed: {
    ...mapState(["notifycation"])
  },
  mounted() {
    this.seriesTransfer();
  },
  watch: {
    notifycation() {
      if (this.notifycation.length != 0) {
        this.seriesTransfer();
        // console.log("ok")
      } else {
        this.seriesTransfer();
      }
    }
  }
};
</script>
<style></style>
