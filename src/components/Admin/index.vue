<template>
  <div>
    <v-card class="ma-3">
      <div class="fontsize20 pa-3">ຂໍ້ມູນຜູ້ໃຊ້ລະບົບ</div>
      <div class="ma-1">
        <add-admin ></add-admin>
      </div>
      <div class="ml-3">ຈຳນວນ 10 ລາຍການ</div>
      <div class="ml-3 ma-1">
        <v-data-table
          dense
          :headers="headerColumn"
          class="elevation-1 grey lighten-2"
          loading="true"
        >
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>
<script>
import Add from "./add";
export default {
  components: {
    "add-admin": Add
  },
  data() {
    return {
      admins: [],
      headerColumn: [
        { text: "ລະຫັດ", value: "aId" },
        { text: "ຮູບ", value: "avatar" },
        { text: "ຊື່", value: "name " },
        { text: "ອີເມວ", value: "email" },
        { text: "ສະເຕຕັດ", value: "state" },
        { text: "ວັນທີສ້າງ", value: "created_at" },
        { text: "ວັນທີແກ້ໄຂ", value: "updated_at" }
      ],

      dialogAdd: false
    };
  }
};
</script>
<style></style>
