<template>
  <div>
    <v-card class="ma-3">
      <v-card-title class="font-weight-bold">
        <h2>ຂໍ້ມູນສິນຄ້າ</h2>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <!-- text search -->
        <v-text-field
          v-model="search"
          label="ຄົ້ນຫາສິນຄ້າ ...."
          id="search"
          class="font-weight-light"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>
      <v-card-subtitle>
        ຈຳນວນ <strong>{{ count }}</strong> ລາຍການ
      </v-card-subtitle>

      <div v-if="StateOn == false">
        <div>
          <v-btn
            small
            class="ml-3"
            color="success"
            dark
            tile
            elevation="5"
            @click="headleAddProduct"
            >ເພີ່ມສີນຄ້າ</v-btn
          >
        </div>
        <v-card class="ma-2">
          <v-data-table
            dense
            :headers="headcolumnsProduct"
            :items="products.data"
            :items-per-page="10"
            :search="search"
            class="elevation-1 pa-2  grey lighten-3"
          >
            <template v-slot:item.pdphotos_main="{ item }" left>
              <v-list-item>
                <v-card class="ma-1" elevation="5">
                  <v-img
                    max-width="70"
                    :src="
                      'http://127.0.0.1:8000/storage/images/clothing/' +
                        item.pdphotos_main
                    "
                    class="ma-2"
                  ></v-img>
                </v-card>
              </v-list-item>
            </template>
            <template v-slot:item.pdname="{ item }">
              <a color="success" @click="selectDetial(item.pdId)"
                ><u>{{ item.pdname }}</u></a
              >
            </template>
            <!-- format columns -->
            <template v-slot:item.pdprogression="{ item }">
              <v-chip
                small
                dark
                :close-icon="formatchipStatus(item.pdprogression)"
                :color="formatchipColor(item.pdprogression)"
                label
                close
                >{{ item.pdprogression }}</v-chip
              >
            </template>

            <template v-slot:item.created_at="{ item }">
              <span>{{ new Date(item.created_at).toLocaleString() }}</span>
            </template>
            <template v-slot:item.updated_at="{ item }">
              <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
            </template>
            <template v-slot:item.active="{ item }">
              <v-btn
                small
                dark
                color="orange darken-2"
                class="ma-1"
                @click="editItem(item)"
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
                class="ma-1"
                @click="isOpenDelete(item)"
              >
                <v-icon medium>
                  mdi-delete
                </v-icon>
                ລືບ
              </v-btn>

              <div v-if="item.pdprogression == 'complete'"></div>
              <div v-else>
                <v-btn
                  small
                  dark
                  color="deep-orange accent-2"
                  class="ma-1"
                  @click="activeProgression(item)"
                >
                  <v-icon medium>
                    mdi-plus
                  </v-icon>
                  state
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </div>
      <div v-else>
        <display-storage
          :productId="storageItem"
          @closeFormStorage="StateOn = false"
        ></display-storage>
      </div>

      <!-- point for remove product -->
      <delete-product
        :dialogForm="dialogFormDel"
        :productItem="ItemDel"
        @closeForm="dialogFormDel = !dialogFormDel"
        @deleteSuccess="seriesProduct"
      ></delete-product>
    </v-card>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import ProductServer from "@/service/Products";
import Notify from "@/notify/notifycation";
import DisplayStorage from "./Storage/display";
import deleteProduct from "./delete";
import loding from "@/callComponent/dialogLoading";

export default {
  components: {
    "display-storage": DisplayStorage,
    "delete-product": deleteProduct,
    "data-loading": loding
  },
  data() {
    return {
      search: "",
      count: 0,
      products: [],
      headcolumnsProduct: [
        // {
        //   text: "ລະຫັດ",
        //   align: "start",
        //   sortable: true,
        //   value: "pdId",
        //   width: "20px"
        // },
        { text: "ຮູບໜ້າປົກ", value: "pdphotos_main", width: "50px" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ຊື່ເຕັມສິນຄ້າ", value: "pdfullname", width: "150px" },
        { text: "ແບຣນ", value: "bname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ສີ", value: "cname" },
        { text: "ຜູ້ສະໜອງ", value: "supfullname" },
        { text: "ສະຖານະ", value: "pdprogression" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "ວັນທີ່ແກ້ໄຂ", value: "updated_at" },
        { text: "Active", value: "active", sortable: true }
      ],
      StateOn: false,
      storageItem: 0,

      dialogFormDel: false,
      ItemDel: null
    };
  },
  methods: {
    headleAddProduct() {
      this.$router.push("Storage");
    },
    //format columns mdi-refresh
    formatchipStatus(pdprogression) {
      if (pdprogression == "on") {
        return "mdi-sync";
      } else if (pdprogression == "complete") {
        return "mdi-refresh";
      } else {
        return "mdi-sync-off";
      }
    },
    formatchipColor(pdprogression) {
      if (pdprogression == "complete") {
        return "green";
      } else if (pdprogression == "on") {
        return "orange lighten-1";
      } else {
        return "red";
      }
    },

    ///losd Storage
    async seriesProduct() {
      try {
        this.products = (await ProductServer.index()).data;
        this.count = this.products.count;
        // console.log(this.products);
      } catch (error) {
        this.$router.push({
          name: "Login"
        })
        Notify.showMessage("error", "server error incurrect", 4000);
      }
    },

    /// update Progression
    async activeProgression(item) {
      try {
        await ProductServer.updateProgrression(item.pdId);
        Notify.showMessage("success", "ໃຊ້ວຽກໃດ້ສົມບູນແລ້ວ", 3000);
        this.seriesProduct();
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດແກ້ໄຂໄດ້ ກະລຸນາລອງໄໝ່", 3000);
      }
      // console.log(item.pdId);
    },
    //select data Edit
    editItem(item) {
      this.$store.commit("productchange", item.pdId);
      this.$router.push({
        name: "Editproduct"
      });
    },
    selectDetial(item) {
      this.StateOn = true;
      this.storageItem = item;

    },

    isOpenDelete(item) {
      this.dialogFormDel = true;
      this.ItemDel = item;
    }
  },
  created() {
    this.seriesProduct();
  }
};
</script>
<style></style>
