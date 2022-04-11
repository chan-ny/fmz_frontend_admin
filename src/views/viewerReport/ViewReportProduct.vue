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
    <div class="ml-6">
      <div>
        ລະຫັດສິນຄ້າ: <strong>{{ productId }}</strong>
      </div>
      <div>ວັນທີລາຍງານ: {{ new Date().toLocaleString(Date.now()) }}</div>
    </div>
    <div class="text-center fontsize30"><u>ລາຍງານຂໍ້ມູນສິນຄ້າ</u></div>
    <div class="mx-1 mt-4">
      <v-card outlined>
        <v-row>
          <v-col cols="12" sm="3" md="3">
            <v-img
              :src="
                'http://127.0.0.1:8000/storage/images/clothing/' +
                  products[0].pdphotos_main
              "
              class="ma-2"
            ></v-img>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <div v-for="(item, index) in products" :key="index">
              <div class="ma-2">
                ລະຫັດສິນຄ້າ: <strong>{{ item.pdId }}</strong>
              </div>
              <div class="ma-2">
                ຊື່ສິນຄ້າ: <strong>{{ item.pdname }}</strong>
              </div>
              <div class="ma-2">
                ຊື່ເຕັມ: <strong>{{ item.pdfullname }}</strong>
              </div>
              <div class="ma-2">
                ແບຣນສິນຄ້າ: <strong>{{ item.bname }}</strong>
              </div>
              <div class="ma-2">
                ປະເພດສິນຄ້າ: <strong>{{ item.ctname }}</strong>
              </div>
              <div class="ma-2">
                ສິສິນຄ້າ: <strong>{{ item.cname }}</strong>
              </div>
              <div class="ma-2">
                ຜູ້ສະໜອງ: <strong>{{ item.supfullname }}</strong>
              </div>
              <div class="ma-2">
                ສະຖານະສິນຄ້າ: <strong>{{ item.pdprogression }}</strong>
              </div>
              <div class="ma-2">
                ວັນທີ: <strong>{{ item.created_at }}</strong>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-data-table
              :headers="headerColumn"
              :items="storages"
              class="elevation-1 ma-2"
            >
              <template v-slot:item.pdcost="{ item }">
                <span class="indigo--text">{{
                  new Intl.NumberFormat().format(item.pdcost)
                }}</span>
              </template>
              <template v-slot:item.pdprice="{ item }">
                <span class="indigo--text">{{
                  new Intl.NumberFormat().format(item.pdprice)
                }}</span>
              </template>
              <template v-slot:item.code="{ index }">
                <span class="indigo--text">{{ index + 1 }}</span>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <div class="text-left ml-6 mt-6 fontsize18">
      <div>
        ຈຳນວນສິນຄ້າ: <strong>{{ TotalNumer }}</strong>
      </div>
      <div>
        ລວມລາຄາຕົ້ນທືນສິນຄ້າ:
        <strong>{{ new Intl.NumberFormat().format(Totalcost) }} ກີບ</strong>
      </div>
      <div>
        ລວມລາຄາຂາຍສິນຄ້າ:
        <strong>{{ new Intl.NumberFormat().format(Totalprice) }} ກີບ</strong>
      </div>
    </div>
    <div v-if="productId == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import ProductService from "@/service/Reporting/ReportProduct";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      productId: "",
      products: [],
      storages: [],
      headerColumn: [
        { text: "ລ/ດ", value: "code" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ລາຍລະອຽດ", value: "sdetail" },
        { text: "ຈຳນວນ", value: "srqty" },
        { text: "ເລດ", value: "pdrate" },
        { text: "ຕົ້ນທືນ", value: "pdcost" },
        { text: "ລາຄາຂາຍ", value: "pdprice" }
      ]
    };
  },
  methods: {
    async seriesProduct() {
      try {
        let value = await ProductService.viewProduct(this.$route.params.pdId);
        this.products = value.data.data;
        this.productId = value.data.data[0].pdId;
      } catch (error) {
        console.log("error report product");
      }
    },

    async ViewStorage() {
      try {
        let value = await ProductService.viewStorage(this.$route.params.pdId);
        this.storages = value.data.data;
      } catch (error) {
        console.log("error report Storage");
      }
    }
  },
  computed: {
    TotalNumer() {
      let num = 0;
      this.storages.forEach(element => {
        num += parseInt(element.srqty);
      });
      return num;
    },
    Totalcost() {
      let num = 0;
      this.storages.forEach(element => {
        num += parseInt(element.srqty) * parseFloat(element.pdcost);
      });
      return num;
    },
    Totalprice() {
      let num = 0;
      this.storages.forEach(element => {
        num += parseInt(element.srqty) * parseFloat(element.pdprice);
      });
      return num;
    }
  },
  created() {
    this.seriesProduct();
    this.ViewStorage();
  }
};
</script>
<style></style>
