<template>
  <div>
    <v-card class="ma-1">
      <div class="fontsize24 ma-3">ຂໍ້ມູນລູກຄ້າທັງໝົດ</div>
      <v-divider color="orange"></v-divider>

      <div class="ml-3 mt-1">
        <v-text-field
          v-model="search"
          outlined
          dense
          class="search"
          name="search"
          label="ຄົ້ນຫາລູກຄ້າ"
        ></v-text-field>
      </div>
      <div class="fontsize16 ml-3 mt-n4">
        ຈຳນວນ <strong style="color: red">{{ count }}</strong> ລາຍການ
      </div>
      <v-data-table
        dense
        :headers="headercolumn"
        :items="customers"
        class="elevation-1 grey lighten-3 ma-2"
        :items-per-page="15"
        loading="true"
        :search="search"
      >
        <template v-slot:item.created_at="{ item }">
          <span>{{ new Date(item.created_at).toLocaleString() }}</span>
        </template>
        <template v-slot:item.updated_at="{ item }">
          <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
        </template>
        <template v-slot:item.active="{ item }">
          <v-btn small color="success" outlined @click="isOpenAddress(item)"
            >ທີ່ຢູ່ລຸກຄ້າ</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="grey lighten-2">
          <div class="fontsize18">ລາຍລະອຽດທີ່ຢູ່ລຸກຄ້າ</div>
        </v-card-title>
        <v-card-text class="fontsize16 mt-3">
          <div><strong>ແຂວງ:</strong> {{ provice }}</div>
          <div><strong>ເມືອງ:</strong> {{ district }}</div>
          <div><strong>ບ້ານ:</strong> {{ house }}</div>
          <div><strong>ລາຍລະອຽດອື່ນ: </strong> {{ description }}</div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import CustomerService from "@/service/Customer";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      count: 0,
      search: "",
      customers: [],
      headercolumn: [
        { text: "ລະຫັດ", value: "cusId" },
        { text: "ເພດ", value: "cus_gender" },
        { text: "ຊື່ລູກຄ້າ", value: "cus_fullname" },
        { text: "ເບີໂທ", value: "cus_phone" },
        { text: "ອີເມວ", value: "email" },
        { text: "ສະຖານະ", value: "cus_state" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "ວັນທີ່ແກ້ໄຂ", value: "updated_at" },
        { text: "ເລືອກ", value: "active", sorttable: false }
      ],
      dialog: false,
      provice: "",
      district: "",
      house: "",
      description: ""
    };
  },
  methods: {
    isOpenAddress(item) {
      this.dialog = true;
      this.provice = item.cus_provint;
      this.district = item.cus_distric;
      this.house = item.cus_home;
      this.description = item.cus_description;
    },
    async serviesCustomer() {
      try {
        let value = (await CustomerService.viewCustomer()).data;
        this.count = value.count;
        this.customers = value.data;
        // console.log(value.data);
      } catch (error) {
        console.log("error view Customer");
      }
    }
  },
  mounted() {
    this.serviesCustomer();
  }
};
</script>
<style>
.search {
  width: 180px !important;
}
</style>
