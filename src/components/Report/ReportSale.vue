<template>
  <div>
    <v-card outlined class="mx-3 pa-2">
      <v-card-title class="elevation-1 grey lighten-3 pt-2 pb-2">
        <div>ລາຍລະອຽດການຂາຍສິນຄ້າ</div>
      </v-card-title>
      <div>
        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-card class="ma-2 pa-2">
              <div class="green--text">ປະຈຳວັນ</div>
              <v-menu
                ref="selectDay"
                v-model="selectDay"
                :close-on-content-click="false"
                :return-value.sync="dateDay"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateDay"
                    label="ເລືອກວັນ"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="lo"
                  v-model="dateDay"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="selectDay = false">
                    ຍົກເລີກ
                  </v-btn>
                  <v-btn text color="primary" @click="isOpenDay">
                    ຕົກລົງ
                  </v-btn>
                </v-date-picker>
              </v-menu>
              <v-card-actions>
                <v-btn color="orange darken-4" dark @click="isOpenPdf">
                  PDF <v-icon>mdi-file-pdf</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-card class="ma-2 pa-2">
              <div class="green--text">ປະຈຳເດືອນ</div>
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
              <v-card-actions>
                <v-btn color="orange darken-4" dark @click="isOpenPdfm">
                  PDF <v-icon>mdi-file-pdf</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined>
              <v-card-text>
                <div class="mx-3 fontsize18">
                  ຈຳນວນ <strong class="red--text">{{ count }}</strong> ລາຍການ
                </div>
              </v-card-text>
              <v-data-table
                ref="printable"
                dense
                :headers="headerColumn"
                :items="reportSale"
                class="elevation-1 grey lighten-3 ma-2"
                loading="true"
                ite
                :items-per-page="20"
                :footer-props="{
                  'items-per-page-options': page
                }"
              >
                <template v-slot:item.sdPrice="{ item }">
                  <span class="indigo--text">{{
                    new Intl.NumberFormat().format(item.sdPrice)
                  }}</span>
                </template>
                <template v-slot:item.total="{ item }">
                  <span class="indigo--text"
                    >{{ new Intl.NumberFormat().format(Total(item)) }} ກີບ</span
                  >
                </template>
                <template v-slot:item.created_at="{ item }">
                  <span class="indigo--text">{{ item.created_at }}</span>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import Reporting from "@/service/Reporting/ReportSale";
import loding from "@/callComponent/dialogLoading";
const config = {
  header: { "Content-Type": "application/json" }
};
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      dateDay: new Date().toISOString().substr(0, 10),
      dateMonth: new Date().toISOString().substr(0, 7),

      selectDay: false,
      selectMonth: false,

      headerColumn: [
        { text: "ລະຫັດສິນຄ້າ", value: "pdId" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ແບຮນ", value: "bname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ເບີ", value: "sname" },
        { text: "ຈຳນວນ", value: "sdQty" },
        { text: "ລາຄາ", value: "sdPrice" },
        { text: "ລວມ", value: "total" },
        { text: "ວັນທີ່", value: "created_at" }
      ],
      reportSale: [],
      count: 0,
      page: [5, 10, 20, 30, 100, 1000, 10000, 1000000]
    };
  },
  methods: {
    async ViewSaleList() {
      try {
        let value = (await Reporting.viewSale()).data;
        this.reportSale = value.data;
        this.count = value.count;
        // console.log(value.data);
      } catch (error) {
        console.log("Error Report viewSale");
      }
    },
    async isOpenDay() {
      this.$refs.selectDay.save(this.dateDay);
      this.selectDay = false;
      try {
        let value = await Reporting.SearchDatetime(
          { datetime: this.dateDay },
          config
        );

        this.reportSale = value.data.data;
        this.count = value.data.count;
      } catch (error) {
        console.log("can't Search report sale day");
      }
    },
    async isOpenMonth() {
      this.$refs.selectMonth.save(this.dateMonth);
      this.selectMonth = false;
      try {
        let value = await Reporting.SearchDatetime(
          { datetime: this.dateMonth },
          config
        );

        this.reportSale = value.data.data;
        this.count = value.data.count;
      } catch (error) {
        console.log("can't Search report sale month");
      }
    },
    Total(element) {
      let data = "";
      data = element.sdQty * element.sdPrice;
      return data;
      // console.log(data);
    },
    async isOpenPdf() {
      var p = await window.open(
        "viewreportsale/" + this.dateDay,
        "_blank",
        "resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, width=1200px, height=700px,left=200px, top=200px"
      );

      await setTimeout(() => {
        p.print();
      }, 2000);
      await setTimeout(() => {
        p.close();
      }, 4000);
    },
    async isOpenPdfm() {
      var p = await window.open(
        "viewreportsalem/" + this.dateMonth,
        "_blank",
        "resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, width=1200px, height=700px,left=200px, top=200px"
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
    this.ViewSaleList();
  }
};
</script>
<style></style>
