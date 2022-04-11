<template>
  <div>
    <v-card outlined class="mx-2">
      <v-card-title class="elevation-1 grey lighten-3 pt-2 pb-2">
        ລາຍການສິນຄ້າ
      </v-card-title>
      <div class="mx-3">
        <v-row>
          <v-col cols="12" sm="3" md="3">
            <v-text-field
              v-model="searchName"
              class="ma-1 pt-2"
              outlined
              dense
              label="ຊື່ສິນຄ້າ"
            ></v-text-field>
            <div class="ml-2 mt-n3">
              <strong>{{ count }}</strong> ລາຍການ
            </div>
          </v-col>
        </v-row>
        <v-data-table
          dense
          :headers="headerColumn"
          :items="products"
          class="elevation-1 grey lighten-3 mt-2"
          loading="true"
          :search="searchName"
        >
          <template v-slot:item.pdprice="{ item }">
            <span class="indigo--text">{{
              new Intl.NumberFormat().format(item.pdprice)
            }}</span>
          </template>
          <template v-slot:item.pdcost="{ item }">
            <span class="indigo--text">{{
              new Intl.NumberFormat().format(item.pdcost)
            }}</span>
          </template>
          <template v-slot:item.cname="{ item }">
            <v-chip dark small :color="item.cname">{{ item.cname }}</v-chip>
          </template>
          <template v-slot:item.active="{ item }">
            <v-btn small color="success" @click="isOpenReport(item)">
              <v-icon>mdi-file-pdf</v-icon> ລາຍງານ</v-btn
            >
          </template>
        </v-data-table>
      </div>
    </v-card>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import Reporting from "@/service/Reporting/ReportProduct";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      searchName: "",
      count: 0,
      products: [],
      headerColumn: [
        { text: "ລະຫັດ", value: "pdId", width: "10px" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ຊື່ເຕັມ", value: "pdfullname", width: "180px" },
        { text: "ແບຣນ", value: "bname" },
        { text: "ຜູ້ສະໜອງ", value: "supfullname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ສິ", value: "cname" },
        { text: "ລາຄາທືນ", value: "pdcost" },
        { text: "ເລດ", value: "pdrate" },
        { text: "ລາຄາຂາຍ", value: "pdprice" },
        { text: "ຈຳນວນ", value: "QTY" },
        { text: "ວັນທີ", value: "created_at" },
        { text: "ລາຍງານ", value: "active", sortable: false }
      ]
    };
  },
  methods: {
    async ViewReportProduct() {
      try {
        let value = (await Reporting.viewReportProduct()).data;
        this.products = value.data;
        this.count = value.count;
        // console.log(value.data);
      } catch (error) {
        console.log("error report product");
      }
    },
    async isOpenReport(item) {
      var p = await window.open(
        "/viewreportproduct/" + item.pdId,
        "_blank",
        "resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, width=1200px, height=740px,left=200px, top=200px"
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
    this.ViewReportProduct();
  }
};
</script>
<style></style>
