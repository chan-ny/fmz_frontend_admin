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
      <div>ເລກທີບິນ: {{ importId }}</div>
      <div>ວັນທີອອກບີນ: {{ new Date().toLocaleString(Date.now()) }}</div>
    </div>

    <div class="text-center fontsize30"><u>ໃບບິນສັ່ງຊື້ສິນຄ້ານຳເຂົ້າ</u></div>
    <div class="ma-6">
      <v-data-table
        dense
        :headers="hederColumn"
        :items="Item"
        class="elevation-1 grey lighten-3"
      >
        <template v-slot:item.imlprice="{ item }">
          <span class="indigo--text"
            >{{ new Intl.NumberFormat().format(item.imlprice) }} ກີບ</span
          >
        </template>
        <template v-slot:item.imlamount="{ item }">
          <span class="indigo--text"
            >{{ new Intl.NumberFormat().format(item.imlamount) }} ກີບ</span
          >
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

    <div class="float-right mr-12 mt-2">
      <span class="mr-16"><u>ຜູ້ສະໜອງ</u></span>

      <span class="ml-16"><u>ເຈົ້າຂອງຮ້ານ</u></span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      hederColumn: [
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ຈຳນວນ", value: "order_qty" },
        { text: "ລາຄາ", value: "imlprice" },
        { text: "ລວມ", value: "imlamount" }
      ],
      importId: 0,
      Item: []
    };
  },
  computed: {
    ...mapState(["billorder"]),
    TotalNumer() {
      let num = 0;
      this.Item.forEach(element => {
        num += parseInt(element.order_qty);
      });
      return num;
    },
    Totalprice() {
      let num = 0;
      this.Item.forEach(element => {
        num += parseFloat(element.imlamount);
      });
      return num;
    }
  },
  methods: {},
  created() {
    this.Item = this.billorder;
    this.importId = this.Item[0].import_Id;
  }
};
</script>
<style></style>
