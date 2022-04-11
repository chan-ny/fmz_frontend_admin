<template>
  <div class="ma-3">
    <v-card outlined>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex d-flex lg3 sm6 xs12>
            <widgets
              icon="mdi-account"
              :title="new Intl.NumberFormat().format(cusTotal)"
              subTitle="ສະມາຊີກ"
              :supTitle="cusMonth"
              color="#0866C6"
            ></widgets>
          </v-flex>
          <v-flex d-flex lg3 sm6 xs12>
            <widgets
              icon="money_off"
              :title="new Intl.NumberFormat().format(saleDayTotal)"
              subTitle="ຂາຍລາຍວັນ"
              :supTitle="saleDaylist"
              color="#E65100"
            ></widgets>
          </v-flex>

          <v-flex d-flex lg3 sm6 xs12>
            <widgets
              icon="mdi-cart-plus"
              :title="new Intl.NumberFormat().format(importTotalAll)"
              subTitle="ສິນຄ້າຈັດຊື້ທັງຫົມດ"
              :supTitle="importAllList"
              color="green"
            ></widgets>
          </v-flex>
          <v-flex d-flex lg3 sm6 xs12>
            <widgets
              icon="mdi-cash"
              :title="new Intl.NumberFormat().format(saleTotalAll)"
              subTitle="ຂາຍສິນຄ້າທັງໝົດ"
              :supTitle="saleAllList"
              color="#00b297"
            ></widgets>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <div class="mt-3 ml-3 mb-n2 fontsize20">ສິນຄ້າຂາຍດີ 12 ລາຍການ</div>
    <v-row class="ma-3">
      <v-col cols="12" sm="6" md="6">
        <v-card>
          <v-flex d-flex>
            <line-chart :data="BarChart" />
          </v-flex>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card>
          <v-flex d-flex>
            <pie-chart
              :data="BarChart"
              legend="bottom"
              :donut="true"
            ></pie-chart>
          </v-flex>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="ma-3">
      <v-col cols="12" sm="7" md="7">
        <div class="fontsize20 mb-2">ລູກຄ້າທັງໝົດ</div>

        <v-data-table
          dense
          :headers="hesderColumnCus"
          :items="customers"
          class="elevation-1 grey lighten-3"
          loading="true"
        >
          <template v-slot:item.amount="{ item }">
            <span class="red--text">{{ item.amount }}</span>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" sm="5" md="5">
        <div class="fontsize20 mb-2">ສິນຄ້າທັງໝົດ</div>
        <v-data-table
          dense
          :headers="hesdercolumnAd"
          :items="Admins"
          class="elevation-1 grey lighten-3"
          loading="true"
        >
          <template v-slot:item.pdcost="{ item }">
            <span class="indigo--text">{{
              new Intl.NumberFormat().format(item.pdcost)
            }}</span>
          </template>
          <template v-slot:item.QTY="{ item }">
            <span class="red--text">{{ item.QTY }}</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <div v-if="cusTotal == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import DashBoardService from "@/service/Dashboard";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      cusTotal: 0,
      cusMonth: "",
      saleDayTotal: "",
      saleDaylist: "",
      saleTotalAll: "",
      saleAllList: "",
      importTotalAll: "",
      importAllList: "",
      topsix: [],
      customers: [],
      hesderColumnCus: [
        { text: "ລະຫັດ", value: "cusId" },
        { text: "ເພດ", value: "cus_gender" },
        { text: "ຊື່ເຕັມ", value: "cus_fullname" },
        { text: "ເບີໂທ", value: "cus_phone" },
        { text: "N/P", value: "amount" },
        { text: "ວັນທີ", value: "created_at" }
      ],

      Admins: [],
      hesdercolumnAd: [
        { text: "ຊື່ສິນຄ້າ", value: "pdId" },
        { text: "ຊື່ເຕັມ", value: "pdfullname" },
        { text: "ລາຄາທືນ", value: "pdcost" },
        { text: "ຈຳນວນລວມ", value: "QTY" }
      ]
    };
  },
  methods: {
    async viewCustomer() {
      try {
        let value = (await DashBoardService.customer()).data;
        this.cusTotal = value.count;
        this.cusMonth = "ສະມັກໄໝ່ " + value.mount + "/30 ວັນ";
        // console.log(value);
      } catch (error) {
        this.$router.push({
          name: "Login"
        });
        console.log("error analytical customer");
      }
    },
    async viewSaleDay() {
      try {
        let value = (await DashBoardService.saleDay()).data;
        this.saleDayTotal = value.amount[0].Total;
        this.saleDaylist = " ຈຳນວນຂາຍ " + value.count + " ລາຍການ";
        // console.log(value);
      } catch (error) {
        console.log("error analytical sale Day");
      }
    },
    async viewSaleAll() {
      try {
        let value = (await DashBoardService.saleAll()).data;
        this.saleTotalAll = value.amount[0].total;
        this.saleAllList = "ຈຳນວນລວມ " + value.amount[0].amount + " ໂຕ";
        // console.log(value);
      } catch (error) {
        console.log("error analytical sale all!!!");
      }
    },
    async viewImportAll() {
      try {
        let value = (await DashBoardService.importAll()).data;
        this.importTotalAll = value.amount[0].total;
        this.importAllList = "ຈຳນວນລວມ " + value.amount[0].amount + " ໂຕ";
        // console.log(value);
      } catch (error) {
        console.log("error analytical imprort all");
      }
    },

    async viewSaleBest() {
      try {
        let value = (await DashBoardService.SaleBest()).data;
        this.topsix = value.Topten;
        // console.log(value);
      } catch (error) {
        console.log("error analytical saleBest");
      }
    },

    async viewAdmin() {
      try {
        let value = (await DashBoardService.ViewAdmin()).data;
        this.Admins = value.data;
        // console.log(value);
      } catch (error) {
        console.log("error view Admin");
      }
    },

    async viewCustomerSalebest() {
      try {
        let value = (await DashBoardService.viewCustomerSaleBest()).data;
        this.customers = value.data;
        // console.log(value);
      } catch (error) {
        console.log("error view Customer saleBest");
      }
    }
  },
  computed: {
    BarChart() {
      let data = {};
      for (var key in this.topsix) {
        data[this.topsix[key].pdname] = parseInt(this.topsix[key].amount);
      }
      return data;
    }
  },
  created() {
    this.viewCustomer();
    this.viewSaleDay();
    this.viewSaleAll();
    this.viewImportAll();
    this.viewSaleBest();
    this.viewAdmin();
    this.viewCustomerSalebest();
  }
};
</script>
<style></style>
