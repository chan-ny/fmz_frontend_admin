<template>
  <div>
    <v-list>
      <v-list-item>
        <v-img class="ma-3" max-width="100" src="@/assets/monos.png"></v-img>
        <v-list-item-content>
          <v-list-item-title class="fontsize24"
            >ຮ້ານ: ໂມໂນຂາຍເສື້ອຜ້າຜູ້ຊາຍ</v-list-item-title
          >
          <v-list-item-title class="mt-1"
            >ທີ່ຢູ່: ບ້ານສີສະຫວາດ ເມືອງຈັນທະບູລີ</v-list-item-title
          >
          <v-list-item-title class="mt-1"
            >ເບີໂທ: 020 54929625</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <div class="ml-6 mt-3">
      <div>ວັນທີລາຍງານ: {{ new Date().toLocaleString(Date.now()) }}</div>
    </div>
    <div class="text-center fontsize30"><u>ລາຍງານຂາຍສິນຄ້າປະຈຳເດືອນ </u></div>

    <v-card class="mx-5 mt-2" outlined>
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
        :items-per-page="1000000"
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
          <span class="indigo--text">{{
            new Intl.NumberFormat().format(Total(item))
          }}</span>
        </template>
        <template v-slot:item.created_at="{ item }">
          <span class="indigo--text">{{ item.created_at }}</span>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-left ml-6 mt-6 fontsize18">
      <div>
        ຈຳນວນສິນຄ້າ: <strong>{{ TotalNumer }}</strong>
      </div>
      <div>
        ລວມລາຄາສິນຄ້າ:
        <strong>{{ new Intl.NumberFormat().format(Totalprice) }} ກີບ</strong>
      </div>
    </div>
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
      page: [5, 10, 10000, 100000, 1000000, 100000000]
    };
  },
  methods: {
    async isOpenDay() {
      this.selectDay = false;
      try {
        let value = await Reporting.SearchDatetime(
          { datetime: this.$route.params.month },
          config
        );

        this.reportSale = value.data.data;
        this.count = value.data.count;
        // console.log(this.count);
      } catch (error) {
        console.log("can't Search report sale day");
      }
    },
    Total(element) {
      let data = "";
      data = element.sdQty * element.sdPrice;
      return data;
      // console.log(data);
    }
  },
  computed: {
    TotalNumer() {
      let num = 0;
      this.reportSale.forEach(element => {
        num += parseInt(element.sdQty);
      });
      return num;
    },
    Totalprice() {
      let num = 0;
      this.reportSale.forEach(element => {
        num += parseFloat(element.sdQty * element.sdPrice);
      });
      return num;
    }
  },
  created() {
    this.isOpenDay();
  }
};
</script>
<style></style>
