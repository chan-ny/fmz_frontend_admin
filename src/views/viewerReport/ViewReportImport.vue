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
        ເລກທີບີນສັ່ງຊື້: <strong>{{ impId }}</strong>
      </div>
      <div>
        ຜູ້ສະໜອງ: <strong>{{ supplier }}</strong>
      </div>
      <div>ວັນທີລາຍງານ: {{ new Date().toLocaleString(Date.now()) }}</div>
    </div>
    <div class="text-center fontsize30"><u>ລາຍງານສີນຄ້ານຳເຂົ້າ</u></div>

    <div class="ma-2">
      <v-data-table
        dense
        :headers="headerColumn"
        :items="listImport"
        class="elevation-1 grey lighten-3 ma-3"
        loading="true"
        :items-per-page="1000"
      >
        <template v-slot:item.imlprice="{ item }">
          <span class="indigo--text">{{
            new Intl.NumberFormat().format(item.imlprice)
          }}</span>
        </template>
      </v-data-table>
    </div>

    <div class="text-left ml-6 fontsize18">
      <div>
        ຈຳນວນສິນຄ້າ: <strong>{{ TotalNumer }}</strong>
      </div>
      <div>
        ລວມເງິນສິນຄ້າ:
        <strong>{{ new Intl.NumberFormat().format(Totalprice) }} ກີບ</strong>
      </div>
    </div>
    <div v-if="impId == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import ImportService from "@/service/Reporting/ReportImport";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      impId: 0,
      supplier: "",
      listImport: [],
      headerColumn: [
        { text: "ລະຫັດ", value: "pdId" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ແບຣນ", value: "bname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ຈຳນວນ", value: "reciev_qty" },
        { text: "ລາຄາ", value: "imlprice" },
        { text: "ວັນທີ", value: "created_at" }
      ]
    };
  },
  methods: {
    getItem() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("item");
      return id;
    },
    async viewdetail() {
      try {
        let value = (await ImportService.viewDeatilImport(this.getItem())).data;
        this.impId = value.data[0].impId;
        this.supplier = value.data[0].supfullname;
        this.listImport = value.data;
        console.log(value.data);
      } catch (error) {
        console.log("error view datail import");
      }
    }
  },
  computed: {
    TotalNumer() {
      let num = 0;
      this.listImport.forEach(element => {
        num += parseInt(element.reciev_qty);
      });
      return num;
    },
    Totalprice() {
      let num = 0;
      this.listImport.forEach(element => {
        num += parseFloat(element.imlprice);
      });
      return num;
    }
  },
  created() {
    this.viewdetail();
  }
};
</script>
<style></style>
