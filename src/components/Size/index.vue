<template>
  <div>
    <v-card class="ml-3">
      <v-card-title class="font-weight-bold">
        <h2>ຂະໜາດສິນຄ້າ</h2>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <!-- text search -->
        <v-text-field
          v-model="search"
          label="ຄົ້ນຫາຂະໜາດສິນຄ້າ ...."
          id="search"
          class="font-weight-light"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>
      <v-card-subtitle>
        ຈຳນວນ <strong>{{ count }}</strong> ລາຍການ
      </v-card-subtitle>

      <!-- point for add size -->
      <add-size :sizeId="sizes.maxId" @addSuccess="seriestable"></add-size>

      <!-- point for edit Size -->
      <edit-size
        :dialogForm="dialogFormEdit"
        :sizeItem="ItemEdit"
        @CloseForm="dialogFormEdit = !dialogFormEdit"
        @editSuccess="seriestable"
      ></edit-size>

      <!-- point for remve size -->
      <delete-size
        :dialogForm="dialogFormDel"
        :sizeItem="ItemDel"
        @CloseForm="dialogFormDel = !dialogFormDel"
        @deleteSuccess="seriestable"
      >
      </delete-size>
      <!-- table -->
      <v-card class="ma-2">
        <v-data-table
          :headers="headcolumns"
          :items="sizes.data"
          :items-per-page="5"
          :search="search"
          class="elevation-1 pa-2"
        >
          <!-- format columns -->
          <template v-slot:item.state="{ item }">
            <v-chip
              small
              dark
              :close-icon="formatchipStatus(item.state)"
              :color="formatchipColor(item.state)"
              label
              close
              >{{ item.state }}</v-chip
            >
          </template>

          <!-- format date -->
          <template v-slot:item.created_at="{ item }">
            <span>{{ new Date(item.created_at).toLocaleString() }}</span>
          </template>
          <template v-slot:item.updated_at="{ item }">
            <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
          </template>

          <!-- active function -->
          <template v-slot:item.active="{ item }">
            <v-btn small dark color="orange darken-2" @click="isOpenEdit(item)">
              <v-icon medium>
                mdi-pencil
              </v-icon>
              ແກ້ໄຂ</v-btn
            >
            <v-btn
              small
              dark
              color="error"
              class="ml-2"
              @click="isOpenDelete(item)"
            >
              <v-icon medium>
                mdi-delete
              </v-icon>
              ລືບ
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import SizeServiec from "@/service/SizeServies";

import addSize from "./add";
import editSize from "./edit";
import deleteSize from "./delete";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "add-size": addSize,
    "edit-size": editSize,
    "delete-size": deleteSize,
    "data-loading": loding
  },
  data() {
    return {
      search: "",
      sizes: [],
      count: 0,

      headcolumns: [
        // { text: "ລະຫັດຂະໜາດ", align: "start", sortable: false, value: "sId" },
        { text: "ຊື່ຂະໜາດ", value: "sname" },
        { text: "ລາຍລະອຽດ", value: "sdetail" },
        { text: "ສະຖານະການເຮັດວຽກ", value: "state" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "ວັນທີ່ແກ້ໄຂ", value: "updated_at" },
        { text: "Active", value: "active", sortable: false }
      ],
      dialogFormEdit: false,
      ItemEdit: null,

      dialogFormDel: false,
      ItemDel: null
    };
  },
  methods: {
    // alert
    showalert(title, msg, even) {
      this.$swal(title, msg, even);
    },
    isOpenEdit(item) {
      this.dialogFormEdit = true;
      this.ItemEdit = item;
    },
    isOpenDelete(item) {
      (this.dialogFormDel = true), (this.ItemDel = item);
    },

    async seriestable() {
      try {
        this.sizes = (await SizeServiec.index()).data;
        this.sizeId = this.sizes.maxId;
        this.count = this.sizes.count;
      } catch (error) {
        this.showalert(
          "ເກີດຂໍ້ມູນຜີດພາດ",
          "ກະລຸນາປ້ອນຂໍ້ມູນໃຫມ່ກ່ອນແລ້ວລອງໄໝ່",
          "error"
        );
      }
    },

    // format columns
    formatchipStatus(state) {
      if (state == "on") {
        return "mdi-sync";
      } else {
        return "mdi-sync-off";
      }
    },
    formatchipColor(state) {
      if (state == "on") {
        return "green";
      } else {
        return "red";
      }
    }
  },
  created() {
    this.seriestable();
  }
};
</script>
<style></style>
