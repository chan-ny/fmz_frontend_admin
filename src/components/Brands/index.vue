<template>
  <div>
    <v-card class="ma-3 ">
      <v-card-title class="font-weight-bold"
        ><h2>ແບຣນສິນຄ້າ</h2>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <!-- text search brand Name -->
        <v-text-field
          v-model="search"
          label="ຄົ້ນຫາ ຊື່ສິນຄ້າ..."
          id="id"
          class="font-weight-light"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>
      <v-card-subtitle
        >ຈຳນວນ <strong>{{ brands.count }}</strong> ລາຍການ</v-card-subtitle
      >
      <!-- point add brands  -->
      <add-brand :brandId="BrandMaxID" @addSuccess="seriesdata"></add-brand>

      <!-- point of edit brand -->
      <edit-brand
        :dialogfromEdit="dialogformEdit"
        :brandItem="BrandItemEdit"
        @closeForm="dialogformEdit = !dialogformEdit"
        @editSuccess="seriesdata"
      ></edit-brand>

      <!-- popint of delete brand -->
      <delete-brand
        :dialogDelete="dialogFormDelte"
        :brandId="BrandItemDel"
        @closeForm="dialogFormDelte = !dialogFormDelte"
        @deleteSuccess="seriesdata"
      ></delete-brand>

      <!-- table -->
      <v-card class="ma-2 ">
        <v-data-table
          :headers="headcolumn"
          :items="brands.data"
          :items-per-page="5"
          :search="search"
          class="elevation-1 pa-2"
        >
          <!-- format bstate -->
          <template v-slot:item.bstate="{ item }">
            <v-chip
              class="pr-5"
              small
              dark
              :close-icon="formatStatusIcon(item.bstate)"
              :color="formatStatusColor(item.bstate)"
              label
              close
            >
            </v-chip>
          </template>

          <!-- format created date -->
          <template v-slot:item.created_at="{ item }">
            <span>{{ new Date(item.created_at).toLocaleString() }}</span>
          </template>

          <!-- format updated date -->
          <template v-slot:item.updated_at="{ item }">
            <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
          </template>

          <!-- template btn -->
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
      <!-- end table -->
    </v-card>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import Notify from "@/notify/notifycation";
import BrandService from "@/service/BrandService";

import addBrand from "./add";
import editBrand from "./edit";
import deleteBrand from "./delete";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "add-brand": addBrand,
    "edit-brand": editBrand,
    "delete-brand": deleteBrand,
    "data-loading": loding
  },
  data() {
    return {
      count: 0,
      search: "",
      brands: [], // rendering data from table
      headcolumn: [
        // header match table
        // { text: "ລະຫັດແບຣນ", align: "start", sortable: false, value: "bId" },
        { text: "ຊື່ແບຣນ", value: "bname" },
        { text: "ສະຖານະເຮັດວຽກ", value: "bstate" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "ວັນທີ່ແກ້ໄຂ", value: "updated_at" },
        { text: "Active", value: "active", sortable: false }
      ],
      BrandMaxID: 0,
      dialogformEdit: false,
      BrandItemEdit: null,

      dialogFormDelte: false,
      BrandItemDel: null
    };
  },
  methods: {
    // loading data table brands
    async seriesdata() {
      try {
        this.brands = (await BrandService.index()).data;
        this.BrandMaxID = this.brands.maxId;
        this.count = this.brands.count;
        // console.log(this.brands.count);
      } catch (error) {
        Notify.showMessage("error", "ເຊີເວີບໍ້ສາມາດຕອບສະໜອງ", 2000);
      }
    },

    isOpenEdit(item) {
      this.dialogformEdit = true;
      this.BrandItemEdit = item;
      // console.log(item)
    },
    isOpenDelete(item) {
      (this.dialogFormDelte = true), (this.BrandItemDel = item);
    },

    //format columns
    formatStatusIcon(bstate) {
      if (bstate == "on") {
        return "mdi-sync";
      } else {
        return "mdi-sync-off";
      }
    },

    ///for color
    formatStatusColor(bstate) {
      if (bstate == "on") {
        return "green";
      } else {
        return "red";
      }
    }
  },

  created() {
    this.seriesdata();
  }
};
</script>
<style scoped>
.bold {
  font-weight: bold !important;
}
th {
  color: black !important;
  font-size: 14px !important;
}
</style>
