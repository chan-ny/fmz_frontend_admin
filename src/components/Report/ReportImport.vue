<template>
  <div>
    <v-card outlined class="mx-2">
      <v-card-title class="elevation-1 grey lighten-3 pt-2 pb-2">
        ລາຍການນຳເຂົ້າສິນຄ້າ
      </v-card-title>
      <div class="mx-3">
        <v-row>
          <v-col cols="12" sm="3" md="3">
            <v-card outlined class="mt-2">
              <v-text-field
                v-model="searchName"
                class="ma-2 pt-2"
                outlined
                dense
                label="ຊື່ສິນຄ້າ"
              ></v-text-field>
              <v-btn dark class="ml-2 mt-n2 mb-2" color="orange">ຄົ້ນຫາ</v-btn>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-card outlined class="ma-2 pa-2">
              <div class="blue--text ma-2">ລາຍງານຮູບແບບເດືອນ</div>
              <v-menu
                ref="selectMonth"
                v-model="selectMonth"
                :close-on-content-click="false"
                :return-value.sync="dateMonth"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateMonth"
                    label="ເລືອກວັນ"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  type="month"
                  locale="lo"
                  v-model="dateMonth"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="selectMonth = false">
                    ຍົກເລີກ
                  </v-btn>
                  <v-btn text color="primary" @click="isOpenMonth">
                    ຕົກລົງ
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-card>
          </v-col>
        </v-row>
        <div class="ml-2 mt-3 mb-2">
          <strong>{{ count }}</strong> ລາຍການ
        </div>
        <v-data-table
          dense
          :headers="headerColumn"
          :items="imports"
          class="elevation-1 grey lighten-3"
          loading="true"
          :search="searchName"
          group-by="impId"
          :items-per-page="20"
          :footer-props="{
            'items-per-page-options': page
          }"
        >
          <template v-slot:item.total="{ item }">
            <span class="indigo--text"
              >{{ new Intl.NumberFormat().format(Total(item)) }} ກີບ</span
            >
          </template>
          <template v-slot:item.imlprice="{ item }">
            <span class="indigo--text">{{
              new Intl.NumberFormat().format(item.imlprice)
            }}</span>
          </template>
          <template v-slot:group.header="{ group, headers, toggle, isOpen }">
            <td :colspan="headers.length">
              <v-btn
                @click="toggle"
                small
                icon
                :ref="group"
                :data-open="isOpen"
              >
                <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
                <v-icon v-else>mdi-chevron-down</v-icon>
              </v-btn>
              <b style="color:blue">
                ເລກບິນ: <b style="color:red">{{ group }}</b>
              </b>
            </td>
            <td>
              <div>
                <b
                  ><a @click="isOpenToatl(group)"><u>Total</u></a></b
                >
              </div>
            </td>
            <td>
              <a @click="isOpenPdf(group)"> <u>ລາຍງານ</u></a>
            </td>
          </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="200px">
          <v-card>
            <v-card-title class="grey lighten-2">
              ລວມບີນ
            </v-card-title>
            <div align="center">
              <div class="pt-3">
                ລວມຈຳນວນ: <strong>{{ totalNumber }}</strong>
              </div>
              <div class="pa-3">
                ລວມລາຄາ:
                <strong
                  >{{ new Intl.NumberFormat().format(totalPrice) }} ກີບ</strong
                >
              </div>
            </div>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import Reporting from "@/service/Reporting/ReportImport";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      searchName: "",
      dateMonth: new Date().toISOString().substr(0, 7),
      selectMonth: false,
      imports: [],
      count: 0,
      headerColumn: [
        { text: "ບີນທີ", value: "impId" },
        { text: "ລະຫັດ", value: "pdId" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ຜູ້ສະໜອງ", value: "supfullname" },
        { text: "ລວມຈຳນວນ", value: "QTY" },
        { text: "ລາຄາ", value: "imlprice" },
        { text: "ລວມລາຄາ", value: "total" },
        { text: "ວັນທີ່", value: "created_at" }
      ],
      dialog: false,
      totalNumber: 0,
      totalPrice: 0,
      page: [5, 10, 20, 30, 100, 1000, 10000, 1000000]
    };
  },
  methods: {
    async viewReportImport() {
      try {
        let value = (
          await Reporting.viewReportImport({ month: this.dateMonth })
        ).data;
        this.imports = value.data;
        this.count = value.count;
        // console.log(value);
      } catch (error) {
        console.log("error repotimport");
      }
    },
    isOpenMonth() {
      this.selectMonth = false;
      this.viewReportImport();
    },
    Total(element) {
      let data = "";
      data = element.QTY * element.imlprice;
      return data;
      // console.log(data);
    },
    isOpenToatl(item) {
      const greaterThanTen = this.imports.filter(
        element => element.impId == item
      );
      let num = 0;
      let amount = 0;
      greaterThanTen.forEach(element => {
        num += parseInt(element.QTY);
        amount += parseFloat(element.imlprice) * parseInt(element.QTY);
      });
      this.dialog = true;
      this.totalNumber = num;
      this.totalPrice = amount;
    },
    async isOpenPdf(item) {
      var p = await window.open(
        "/viewimport?item=" + item,
        "_blank",
        "resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, width=900px, height=700px,left=400px, top=200px"
      );
      await setTimeout(() => {
        p.print();
      }, 2000);
      await setTimeout(() => {
        p.close();
      }, 4000);
    }
  },

  created() {
    this.viewReportImport();
  }
};
</script>
<style></style>
