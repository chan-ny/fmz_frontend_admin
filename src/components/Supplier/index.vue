<template>
  <div>
    <v-card class="ma-3">
      <v-card-title class="font-weight-bold">
        <h2>ຜູ້ສະໜອງສິນຄ້າ</h2>
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
      <!-- point for add supplier -->
      <add-supplier
        :supId="this.suppliers.maxId"
        @AddSuccess="seriesTable"
      ></add-supplier>

      <!-- point for edit supplier -->
      <edit-supplier
        :dialogForm="dialogFormEdit"
        :supplierItem="ItemEdit"
        @CloseForm="dialogFormEdit = !dialogFormEdit"
        @editSuccess="seriesTable"
      ></edit-supplier>

      <!-- point for remove supplier -->
      <delete-supplier
        :dialogForm="dialogFormDel"
        :supplierItem="itemDel"
        @closeForm="dialogFormDel = !dialogFormDel"
        @deleteSuccess="seriesTable"
      ></delete-supplier>

      <!-- table -->
      <v-card class="mt-2 pa-3">
        <v-data-table
          :headers="headcolumns"
          :items="suppliers.data"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
        >
          <!-- point of format supstate -->
          <template v-slot:item.supstate="{ item }">
            <v-chip
              small
              dark
              :close-icon="formatStatusIcon(item.supstate)"
              :color="formatStatusColor(item.supstate)"
              label
              close
            >
              {{ item.supstate }}
            </v-chip>
          </template>

          <template v-slot:item.created_at="{ item }">
            <span>{{ new Date(item.created_at).toLocaleString() }}</span>
          </template>
          <template v-slot:item.updated_at="{ item }">
            <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
          </template>

          <!-- active function -->
          <template v-slot:item.active="{ item }">
            <v-btn dark small color="orange darken-2" @click="isOpenEdit(item)">
              <v-icon medium>
                mdi-pencil
              </v-icon>
              ແກ້ໄຂ</v-btn
            >
            <v-btn
              dark
              small
              color="error"
              class="ml-2 mt-1"
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
import Supplier from "@/service/Supplier";
import Notify from "@/notify/notifycation";

import addSupplier from "./add";
import editSupplier from "./edit";
import deleteSupplier from "./delete";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "add-supplier": addSupplier,
    "edit-supplier": editSupplier,
    "delete-supplier": deleteSupplier,
     "data-loading": loding
  },
  data() {
    return {
      suppliers: [],
      count: 0,
      search: "",
      selectfrom: false,
      headcolumns: [
        // {
        //   text: "ລະຫັດຜູ້ສະໜອງ",
        //   align: "start",
        //   sortable: false,
        //   value: "supId"
        // },
        { text: "ເພດ", value: "supgender" },
        { text: "ຊື້ຜູ້ສະໜອງ", value: "supfullname" },
        { text: "ເບີໂທລະສັບ", value: "suptell" },
        { text: "ທີ່ຢູ້", value: "supaddress" },
        { text: "ອີເມວ", value: "supemail" },
        { text: "ສະຖານະ", value: "supstate" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "ວັນທີ່ແກ້ໄຂ", value: "updated_at" },
        { text: "Active", value: "active", sortable: false }
      ],

      dialogFormEdit: false,
      ItemEdit: null,

      dialogFormDel: false,
      itemDel: null
    };
  },
  methods: {
    isOpenEdit(item) {
      this.dialogFormEdit = true;
      this.ItemEdit = item;
    },
    isOpenDelete(item) {
      this.dialogFormDel = true;
      this.itemDel = item;
    },
    // point CRUD
    async seriesTable() {
      try {
        this.suppliers = (await Supplier.index()).data;
        this.count = this.suppliers.count;
      } catch (error) {
        Notify.showMessage("error", "ເຊີເວີບໍ່ຕອບສະໜອງ", 4000);
      }
    },
    //format columns
    formatStatusIcon(supstate) {
      ///for icon
      if (supstate == "on") {
        return "mdi-sync";
      } else {
        return "mdi-sync-off";
      }
    },
    formatStatusColor(supstate) {
      ///for color
      if (supstate == "on") {
        return "green";
      } else {
        return "red";
      }
    }
  },

  created() {
    this.seriesTable();
  }
};
</script>
<style></style>
