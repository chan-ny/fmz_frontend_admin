<template>
  <div>
    <v-card class="mx-2">
      <div class="fontsize24 mx-3 pt-3 pb-3">ສະຕ໊ອກສິນຄ້າທີ່ຈັດຊື້</div>
      <v-divider color="orange"></v-divider>
      <v-row>
        <v-col cols="12" sm="4" md="4">
          <div class="fontsize18 ma-2">ລາຍການບີນສິນຄ້າ</div>

          <v-data-table
            dense
            :headers="headercolumn"
            :items="search.data"
            class="elevation-1 grey lighten-3 ma-2"
            loading="true"
            :items-per-page="5"
          >
            <template v-slot:item.impId="{ item }">
              <v-chip small class="blue--text" @click="headleSelectbill(item)"
                ><u>{{ item.impId }}</u></v-chip
              >
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <div class="fontsize18 ma-2">ລາຍການສິນຄ້າທີ່ເຊັກແລ້ວ</div>
          <div class="fontsize14 ma-2">
            ຈຳນວນ <strong style="color:red">{{ countDetail }}</strong> ລາຍການ
          </div>
          <div class="fontsize14 ma-2">
            <v-btn outlined small color="success" @click="headleAddStock"
              >ສະຕ໊ອກອີນ</v-btn
            >
          </div>
          <v-data-table
            dense
            :headers="headercolumL"
            :items="searchList.data"
            class="elevation-1 grey lighten-3 ma-2"
            loading="true"
            :items-per-page="5"
          >
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <history-stock :state="State"></history-stock>
        </v-col>
      </v-row>
    </v-card>
    <div v-if="countDetail == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import Notify from "@/notify/notifycation";
import StockService from "@/service/Stocks/StockInService";
import HistoryStory from "./History";
import loding from "@/callComponent/dialogLoading";

import { mapState } from "vuex";
export default {
  components: {
    "history-stock": HistoryStory,
    "data-loading": loding
  },
  data() {
    return {
      search: [],
      searchList: [],
      countDetail: 0,
      State: "",
      headercolumn: [
        { text: "ເລກບີນ", value: "impId" },
        { text: "ຈຳນວນ", value: "amount" },
        { text: "ວັນທີ່ສັ້ງຊື້", value: "created_at" }
      ],
      headercolumL: [
        { text: "ລະຫັດສິນຄ້າ", value: "pdId", width: 10 },
        { text: "ຊື່ສິນຄ້າ", value: "pdname", width: 90 },
        { text: "ຊື່ເຕັມສິນຄ້າ", value: "pdfullname", width: 120 },
        { text: "ແບຣນ", value: "bname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ຈຳນວນ", value: "stQty" },
        { text: "ລາຄາ", value: "stprice" },
        { text: "ລວມ", value: "amount" }
      ],
      billimport: 0
    };
  },
  methods: {
    async searchBills() {
      try {
        let search = (await StockService.searchBill()).data;
        this.search = search;
        this.countDetail = search.count;
      } catch (error) {
        Notify.showMessage("error", "can't loading bill", 4000);
      }
    },
    headleSelectbill(item) {
      this.searchListBill(item.impId);
      this.billimport = item;
    },

    async searchListBill(impId) {
      try {
        let bill = await StockService.searchDeatil(impId);
        this.searchList = bill.data;
        // console.log(bill.data.data);
      } catch (error) {
        Notify.showMessage("error", "can't search bill import", 4000);
      }
    },
    async headleAddStock() {
      let array = this.searchList.data;
      let arr = [];
      for (let index = 0; index < array.length; index++) {
        let data = {
          import_Id: array[index].import_Id,
          storage_Id: array[index].storage_Id,
          stQty: array[index].stQty
        };
        arr.push(data);
      }

      try {
        let save = await StockService.saveStock(this.billimport.impId, arr);
        this.searchBills();
        this.searchListBill(0);
        this.State = this.billimport.impId;
        Notify.showMessage("success", save.data.message, 3000);
      } catch (error) {
        Notify.showMessage("error", "can't save Stock", 4000);
      }
    }
  },
  computed: {
    ...mapState(["Admin_Id"])
  },
  created() {
    this.searchBills();
  }
};
</script>
<style></style>
