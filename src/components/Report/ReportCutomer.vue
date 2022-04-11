<template>
  <div>
    <v-card outlined class="mx-2">
      <v-card-title class="elevation-1 grey lighten-3 pt-2 pb-2">
        ລາຍການຂໍ້ມູນລູກຄ້າ
      </v-card-title>
      <div class="mx-3">
        <v-row>
          <v-col cols="12" sm="3" md="3">
            <v-text-field
              v-model="searchName"
              class="ma-2 pt-2"
              outlined
              dense
              label="ຊື່ສິນຄ້າ"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="ml-2 mb-2">
          <strong> ຈຳນວນ {{ count }}</strong> ລາຍການ
        </div>
        <v-data-table
          dense
          :headers="headerColumn"
          :items="customers"
          class="elevation-1 grey lighten-3"
          loading="true"
          :search="searchName"
        >
          <template v-slot:item.active="{ item }">
            <v-btn small color="success" @click="isOpenReport(item)">
              <v-icon>mdi-file-pdf</v-icon> ລາຍງານ</v-btn
            >
          </template>
          <template v-slot:item.address="{ item }">
            <span class="indigo--text">{{ item.address }}</span>
          </template>
          <template v-slot:item.cus_email="{ item }">
            <span class="blue--text">{{ item.cus_email }}</span>
          </template>
          <template v-slot:item.cus_phone="{ item }">
            <span class="pink--text">{{ item.cus_phone }}</span>
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
import Reporting from "@/service/Reporting/ReportCustomer";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      searchName: "",
      customers: [],
      count: 0,
      headerColumn: [
        { text: "ລະຫັດ", value: "cusId" },
        { text: "ເພດ", value: "cus_gender" },
        { text: "ຊື່ເຕັມ", value: "cus_fullname" },
        { text: "ເບີໂທ", value: "cus_phone" },
        { text: "ອີເມວ", value: "email" },
        { text: "ທີ່ຢູ່", value: "address" },
        { text: "ວັນທີ", value: "created_at" },
        { text: "ລາຍງານ", value: "active", sortable: false }
      ]
    };
  },
  methods: {
    async viewReportCustomer() {
      try {
        let value = (await Reporting.ViewReportCus()).data;
        this.customers = value.data;
        this.count = value.count;
        // console.log(value.data);
      } catch (error) {
        console.log("error view report customer");
      }
    },
    async isOpenReport(item) {
      var p = await window.open(
        "/viewcustomer?item=" + item.cusId,
        "_blank",
        "resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, width=1200px, height=600px,left=300px, top=200px"
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
    this.viewReportCustomer();
  }
};
</script>
<style></style>
