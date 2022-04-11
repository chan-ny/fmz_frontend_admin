<template>
  <div>
    <div class="fontsize20 ma-3">ປະຫັວດການຊື້ສີນຄ້າ</div>
    <div class="fontsize14 ml-3 mb-1">
      ຈຳນວນ <strong style="color: red">{{ count }} ລາຍການ</strong>
    </div>
    <v-divider class="ma-3" color="orange"></v-divider>
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
          color="green white--text"
          close
          close-icon="mdi-check-all"
          >{{ item.pmState }}</v-chip
        >
      </template>
    </v-data-table>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import TransferService from "@/service/Sell/CheckTransfer";
import loding from "@/callComponent/dialogLoading";
import { mapState } from "vuex";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      count: 0,
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
        { text: "ວັນທີ", value: "created_at" }
      ]
    };
  },
  methods: {
    async seriesTransfer() {
      try {
        let value = (await TransferService.checkfinalTranfer()).data;
        this.count = value.count;
        this.viewTranfer = value.data;
        // console.log(value.data);
      } catch (error) {
        console.log("error view transfer");
      }
    }
  },
  computed: {
    ...mapState(["transfer"])
  },
  mounted() {
    this.seriesTransfer();
  },
  watch: {
    transfer() {
      if (this.transfer != null) {
        this.seriesTransfer();
      }
    }
  }
};
</script>
<style></style>
