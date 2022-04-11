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

      <!-- add store -->
      <add-store @sucess="displyIndex"></add-store>

      <!-- update store -->
      <update-store
        :dialogForm="dialogFormEdit"
        @closedialog="dialogFormEdit = !dialogFormEdit"
        :storeData="ItemEdit"
        @sucess="displyIndex"
      ></update-store>

      <!-- remove store -->
      <delete-store
        :dialogDelete="dialogFormDel"
        :storeID="ItemDel"
        @closeForm="dialogFormDel = !dialogFormDel"
        @deleteSuccess="displyIndex"
      ></delete-store>

      <!-- table -->
      <v-card class="ma-2">
        <v-data-table
          :headers="headcolumns"
          :items="store.data"
          :items-per-page="5"
          :search="search"
          class="elevation-1 pa-2"
        >
          <template v-slot:item.store_image="{ item }" left>
            <v-list-item>
              <v-card class="ma-1" elevation="5">
                <v-img
                  max-width="60"
                  :src="
                    'http://127.0.0.1:8000/storage/images/store/' +
                      item.store_image
                  "
                  class="ma-2"
                ></v-img>
              </v-card>
            </v-list-item>
          </template>
          <template v-slot:item.store_state="{ item }">
            <v-chip
              small
              dark
              :close-icon="formatchipStatus(item.store_state)"
              close
              :color="formatchipColor(item.store_state)"
              label
              >{{ item.store_state }}</v-chip
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
            <v-btn
              small
              dark
              color="orange darken-2"
              @click="isOpenEdit(item)"
              class="mb-1"
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
import loding from "@/callComponent/dialogLoading";
import StoreService from "@/service/StoreService";
import add from "./add";
import update from "./edit";
import del from "./delete";
export default {
  components: {
    "data-loading": loding,
    "add-store": add,
    "update-store": update,
    "delete-store": del
  },
  data() {
    return {
      search: "",
      store: [],
      count: 0,

      headcolumns: [
        // { text: "ລະຫັດ", align: "start", sortable: false, value: "storeId" },
        { text: "ໂລໂກ", value: "store_image" },
        { text: "ຊື່ຮ້ານຄ້າ", value: "store_name" },
        { text: "ເບິໂທ", value: "store_phone" },
        { text: "ອີເມວ", value: "store_email" },
        { text: "ເວັບໄໍຊຣ", value: "store_website" },
        { text: "ທີ່ຢູ່", value: "store_address" },
        { text: "ສະຖານະ", value: "store_state" },
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
    },

    async displyIndex() {
      try {
        let store = (await StoreService.index()).data;
        this.count = store.count;
        this.store = store;
        // console.log(store);
      } catch (error) {
        this.$router.push({
          name: "Login"
        });
      }
    },
    isOpenEdit(item) {
      this.dialogFormEdit = true;
      this.ItemEdit = item;
    },
    isOpenDelete(item) {
      this.dialogFormDel = true;
      this.ItemDel = item;
    }
  },
  created() {
    this.displyIndex();
  }
};
</script>
<style></style>
