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
        ລະຫັດລຸກຄ້າ: <strong>{{ cusId }}</strong>
      </div>
      <div>
        ເພດ: <strong>{{ gender }}</strong>
      </div>
      <div>ວັນທີລາຍງານ: {{ new Date().toLocaleString(Date.now()) }}</div>
    </div>
    <div class="text-center fontsize30"><u>ລາຍງານຂໍ້ມູນສ່ວນບຸກຄົນ</u></div>
    <v-divider class="ma-3" color="primary"></v-divider>
    <div class="ma-3"><u>ລາຍລະອຽດລູກຄ້າ</u></div>
    <div class="ma-2">
      <v-simple-table dense color="primary">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                ຊື່ເຕັມ:
              </th>
              <th class="text-left">
                ເບີໂທ:
              </th>
              <th class="text-left">
                ອີເມວ
              </th>
              <th class="text-left">
                ແຂວງ:
              </th>
              <th class="text-left">
                ເມືອງ:
              </th>
              <th class="text-left">
                ບ້ານ:
              </th>
              <th class="text-left">
                ລາຍລະອຽດອື່ນ:
              </th>
              <th class="text-left">
                ວັນທີສະມັກ:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in customers" :key="item.cusId">
              <td>{{ item.cus_fullname }}</td>
              <td>{{ item.cus_phone }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.cus_provint }}</td>
              <td>{{ item.cus_distric }}</td>
              <td>{{ item.cus_home }}</td>
              <td>{{ item.cus_description }}</td>
              <td>{{ item.created_at }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div v-if="cusId == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import ReportService from "@/service/Reporting/ReportCustomer";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      customers: [],
      cusId: "",
      gender: ""
    };
  },
  methods: {
    getItem() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get("item");
      return id;
    },

    async ViewCustomer() {
      try {
        let value = (await ReportService.ViewSearchCus(this.getItem())).data;
        this.customers = value.data;
        this.cusId = value.data[0].cusId;
        this.gender = value.data[0].cus_gender;
      } catch (error) {
        console.log("error Search Customer");
      }
    }
  },
  mounted() {
    this.ViewCustomer();
  }
};
</script>
<style scoped>
.dashed {
  text-decoration-line: underline;
  text-decoration-style: solid !important;
}
</style>
