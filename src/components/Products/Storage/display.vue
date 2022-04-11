<template>
  <div>
    <v-btn
      class="ml-3"
      color="black"
      dark
      tile
      elevation="5"
      @click="headelClose"
      >ກັບໜ້າແລກ</v-btn
    >
    <v-btn
      class="ml-3"
      color="primary"
      dark
      tile
      elevation="5"
      @click="headleAdd"
      >ເພີ່ມຂະໜາດ</v-btn
    >
    <v-card class="ma-2">
      <v-data-table
        dense
        :headers="headcolumnsStorage"
        :items="storages.data"
        :items-per-page="5"
        :search="search"
        class="elevation-1 pa-2 grey lighten-3"
      >
        <!-- format date -->
        <template v-slot:item.srprice="{ item }">
          <span>{{ new Intl.NumberFormat().format(item.srprice) }}</span>
        </template>
        <template v-slot:item.srcost="{ item }">
          <span>{{ new Intl.NumberFormat().format(item.srcost) }}</span>
        </template>
        <template v-slot:item.active="{ item }">
          <v-btn small color="success" text @click="isOpenEdit(item)"
            >ແກ້ໄຂຂໍ້ມູນ</v-btn
          >
          <v-btn small color="red" text @click="isOpenDelete(item)"
            >ລືບຂໍ້ມູນ</v-btn
          >
        </template>
        <template v-slot:top>
          <update-storage
            :dialogform="dialogFormEidt"
            :ValueStorage="ItemStorage"
            @closeForm="dialogFormEidt = !dialogFormEidt"
            @editSuccess="seriesStorage"
          ></update-storage>
        </template>
      </v-data-table>
    </v-card>

    <!-- point for add storage -->
    <add-storage
      :dialogform="dialogAdd"
      :Itemproduct="ItemAdd"
      @closeForm="dialogAdd = !dialogAdd"
      @addSuccess="seriesStorage"
    ></add-storage>

    <!-- point for remove storage -->
    <delete-storag
      :dialogForm="dialogDel"
      :ItemStorage="ItemDel"
      @closeForm="dialogDel = !dialogDel"
      @delSuccess="seriesStorage"
    ></delete-storag>
  </div>
</template>
<script>
import ProductServer from "@/service/Products";

import editStorage from "./edit";
import addStorage from "./add";
import deleteStorage from "./delete";
export default {
  components: {
    "update-storage": editStorage,
    "add-storage": addStorage,
    "delete-storag": deleteStorage
  },
  props: {
    productId: String
  },
  data() {
    return {
      search: "",
      storages: [],
      headcolumnsStorage: [
        {
          text: "ລະຫັດສິນຄ້າ",
          align: "start",
          sortable: false,
          value: "pdId",
          width: "100px"
        },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ລາຍອຽດໄຊຣ", value: "sdetail" },
        { text: "ອັດຕາສ່ວນ", value: "pdrate" },
        { text: "ລາຄາຕົ້ນທືນ", value: "pdcost" },
        { text: "ລາຕາຂາຍ", value: "pdprice" },
        { text: "ຈຳນວນ", value: "srqty" },
        { text: "ເລືອກ", value: "active" }
      ],
      dialogAdd: false,
      ItemAdd: null,
      dialogFormEidt: false,
      ItemStorage: null,
      dialogDel: false,
      ItemDel: null
    };
  },
  methods: {
    async seriesStorage() {
      try {
        this.storages = (await ProductServer.storageIndex(this.productId)).data;
        // console.log(this.storages.data);
      } catch (error) {
        console.log(error);
      }
    },
    headelClose() {
      this.$emit("closeFormStorage");
    },
    isOpenEdit(item) {
      this.dialogFormEidt = true;
      this.ItemStorage = item;
    },
    headleAdd() {
      this.dialogAdd = true;
      this.ItemAdd = this.storages.data;
      // console.log(this.storages);
    },
    isOpenDelete(item) {
      this.dialogDel = true;
      this.ItemDel = item;
    }
  },
  created() {
    this.seriesStorage();
    //  console.log(this.productId)
  }
};
</script>
<style></style>
