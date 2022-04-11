<template>
  <div>
    <v-card class="ma-3">
      <v-card-title class="font-weight-bold">
        <h2>ສີຂອງສິນຄ້າ</h2>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <!-- text search -->
        <v-text-field
          v-model="search"
          label="ຄົ້ນຫາສີ ...."
          id="search"
          class="font-weight-light"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>
      <v-card-subtitle>
        ຈຳນວນ <strong>{{ count }}</strong> ລາຍການ
      </v-card-subtitle>

      <!-- point for colur -->
      <add-colur
        :colourId="colours.maxId"
        @addSuccess="seriestable"
      ></add-colur>

      <!-- point for edit colur -->
      <edit-colur
        :dislogForm="dialogFormeditCol"
        @CloseForm="dialogFormeditCol = !dialogFormeditCol"
        :colurItem="colurItem"
        @editSuccess="seriestable"
      ></edit-colur>

      <!-- point for remove colur -->
      <delete-colour
        :dialogForm="dialogFormDel"
        :colurItem="colurItemDel"
        @CloseFormDel="dialogFormDel = !dialogFormDel"
        @deletSuccess="seriestable"
      ></delete-colour>

      <!-- table -->
      <v-card class="ma-2">
        <v-data-table
          :headers="headcolumns"
          :items="colours.data"
          :items-per-page="5"
          :search="search"
          class="elevation-1 pa-2"
        >
          <!-- point format columns -->
          <template v-slot:item.cstate="{ item }">
            <v-chip
              small
              dark
              :close-icon="formatStatusIcon(item.cstate)"
              :color="formatStatusColor(item.cstate)"
              label
              close
            >
              {{ item.cstate }}
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
              @click="isOpenEditColur(item)"
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
              @click="headleDelete(item)"
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
import ColourService from "@/service/ColourService";
import Notify from "@/notify/notifycation";

import addColour from "./add";
import editColur from "./edit";
import deleteColur from "./delete";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "add-colur": addColour,
    "edit-colur": editColur,
    "delete-colour": deleteColur,
     "data-loading": loding
  },
  data() {
    return {
      search: "",
      colours: [],
      maxId: 0,
      count: 0,

      headcolumns: [
        // { text: "ລະຫັດຂະໜາດ", align: "start", sortable: false, value: "cId" },
        { text: "ຊື່ຂະໜາດ", value: "cname" },
        { text: "ສະຖານະການເຮັດວຽກ", value: "cstate" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "ວັນທີ່ແກ້ໄຂ", value: "updated_at" },
        { text: "Active", value: "active", sortable: false }
      ],

      dialogFormeditCol: false,
      colurItem: null,

      dialogFormDel: false,
      colurItemDel: null
    };
  },
  methods: {
    isOpenEditColur(item) {
      this.dialogFormeditCol = true;
      this.colurItem = item;
      //  console.log(item)
    },
    headleDelete(item){
      this.dialogFormDel = true;
      this.colurItemDel =item;
      

    },
    // CRUD
    async seriestable() {
      try {
        this.colours = (await ColourService.index()).data;
        this.count = this.colours.count;
      } catch (error) {
        Notify.showMessage("error", "ເຊີເວີບໍ່ຕອບສະໜອງ", 4000);
      }
    },

    /// format columns
    formatStatusIcon(cstate) {
      ///for icon
      if (cstate == "on") {
        return "mdi-sync";
      } else {
        return "mdi-sync-off";
      }
    },
    formatStatusColor(cstate) {
      ///for color
      if (cstate == "on") {
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
