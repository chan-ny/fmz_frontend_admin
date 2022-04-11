<template>
  <div>
    <v-card class="ma-3">
      <v-card-title class="font-weight-bold">
        <h2>ປະເພດສິນຄ້າ</h2>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <!-- text search -->
        <v-text-field
          v-model="search"
          label="ຄົ້ນຫາປະເພດສິນຄ້າ ...."
          id="search"
          class="font-weight-light"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>
      <v-card-subtitle>
        ຈຳນວນ <strong>{{ count }}</strong> ລາຍການ
      </v-card-subtitle>

      <!-- point for add Category -->
      <add-category
        :categoryMaxId="categorys.maxId"
        @addSuccess="seriestable"
      ></add-category>

      <!-- point for edit category -->
      <edit-category
        :dialogForm="dialogFormEditCate"
        :categoryItem="categoryItem"
        @closeForm="dialogFormEditCate = !dialogFormEditCate"
        @editSuccess="seriestable"
      ></edit-category>

      <!-- point for delete Category -->
      <delete-category
        :dialogForm="dialogFormDel"
        :categoryItem="categoryItemDel"
        @CloseForm="dialogFormDel = !dialogFormDel"
        @delSuccess="seriestable"
      ></delete-category>

      <!-- table -->
      <v-card class="ma-2">
        <v-data-table
          :headers="headcolumns"
          :items="categorys.data"
          :items-per-page="5"
          :search="search"
          class="elevation-1 pa-2"
        >
          <!-- point format columns  -->
          <template v-slot:item.ctstatus="{ item }">
            <v-chip
              small
              dark
              :close-icon="formatStatusIcon(item.ctstate)"
              :color="formatStatusColor(item.ctstate)"
              label
              close
            >
              {{ item.ctstate }}
            </v-chip>
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
            <v-btn
              small
              dark
              color="orange darken-2"
              @click="isOpenCategory(item)"
            >
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
              @click="isOpenDel(item)"
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
import CategoryServiec from "@/service/CategoryService";
import Notify from "@/notify/notifycation";

import addCategory from "./add";
import editCategory from "./edit";
import deleteCategory from "./delete";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "add-category": addCategory,
    "edit-category": editCategory,
    "delete-category": deleteCategory,
    "data-loading": loding
  },
  data() {
    return {
      search: "",
      categorys: [],
      count: 0,
      headcolumns: [
        // { text: "ລະຫັດປະເພດ", align: "start", sortable: false, value: "ctId" },
        { text: "ຊື່ປະເພດ", value: "ctname" },
        { text: "ສະຖານະການເຮັດວຽກ", value: "ctstatus" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "ວັນທີ່ແກ້ໄຂ", value: "updated_at" },
        { text: "Active", value: "active", sortable: false }
      ],

      dialogFormEditCate: false,
      categoryItem: null,
      dialogFormDel: false,
      categoryItemDel: null
    };
  },
  methods: {
    // CRUD
    async seriestable() {
      try {
        this.categorys = (await CategoryServiec.index()).data;
        this.count = this.categorys.count;
        this.categoryId = this.categorys.maxId;
        // console.log(this.categorys.maxId);
      } catch (error) {
        Notify.showMessage("error", "ເຊີເວີບໍ່ຕອບສະໜອງ");
      }
    },
    isOpenCategory(item) {
      this.dialogFormEditCate = true;
      this.categoryItem = item;
      // console.log(item);
    },
    isOpenDel(item) {
      this.dialogFormDel = true;
      this.categoryItemDel = item;
      // console.log(item);
    },

    /// format columns
    formatStatusIcon(ctstatus) {
      ///for icon
      if (ctstatus == "on") {
        return "mdi-sync";
      } else {
        return "mdi-sync-off";
      }
    },
    formatStatusColor(ctstatus) {
      ///for color
      if (ctstatus == "on") {
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
