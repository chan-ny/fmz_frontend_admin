<template>
  <div>
    <v-card outlined class="ma-2">
      <v-card-title primary-title>
        <div class="fontsize24">ຂໍ້ມູນຄີວອາໂຄດ</div>
      </v-card-title>
      <div class="mt-n2 pl-4">
        ຈຳນວນ <strong style="color: red">{{ counts }}</strong> ລາຍການ
      </div>
      <!-- add bank -->
      <add-bank @addSuccess="seriesBank"></add-bank>

      <!-- update bank -->
      <update-bank
        :dialogForm="dialogEdit"
        :ItemBank="ItemEdit"
        @closeForm="dialogEdit = !dialogEdit"
        @editSuccess="seriesBank"
      ></update-bank>

      <!-- remove form -->
      <delete-bank
        :dialogDelete="dialogDel"
        :bankID="ItemDel"
        @closeForm="dialogDel = !dialogDel"
        @deleteSuccess="seriesBank"
      ></delete-bank>

      <v-data-table
        dense
        :headers="headerColumn"
        :items="bankAccounts"
        class="elevation-1 mt-2 grey lighten-2"
        loading="true"
      >
        <template v-slot:item.bkImage="{ item }" left>
          <v-list-item>
            <v-card class="ma-1" elevation="5">
              <v-img
                max-width="70"
                :src="
                  'http://127.0.0.1:8000/storage/images/bank/' + item.bkImage
                "
                class="ma-2"
              ></v-img>
            </v-card>
          </v-list-item>
        </template>
        <template v-slot:item.bkState="{ item }">
          <v-chip
            small
            dark
            :close-icon="formatchipStatus(item.bkState)"
            close
            :color="formatchipColor(item.bkState)"
            label
            >{{ item.bkState }}</v-chip
          >
        </template>
        <template v-slot:item.created_at="{ item }">
          <span>{{ new Date(item.created_at).toLocaleString() }}</span>
        </template>
        <template v-slot:item.updated_at="{ item }">
          <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
        </template>

        <template v-slot:item.active="{ item }">
          <v-btn small color="orange" dark @click="headerEdit(item)"
            >ແກ້ໄຂ</v-btn
          >
          <v-btn small class="ml-1" color="red" dark @click="headerDel(item)"
            >ລືບຂໍ້ມູນ</v-btn
          >
        </template>
      </v-data-table>
    </v-card>
    <div v-if="counts == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import BankService from "@/service/BankService";
import Notify from "@/notify/notifycation";

import AddBank from "./Add";
import Update from "./Update";
import Delete from "./Delete";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "add-bank": AddBank,
    "update-bank": Update,
    "delete-bank": Delete,
    "data-loading": loding
  },
  data() {
    return {
      counts: 0,
      bankAccounts: [],
      headerColumn: [
        // { text: "code", value: "bkId" },
        { text: "ຄີວອາໂຄດ", value: "bkImage" },
        { text: "ຊື່ທະນາຄານ", value: "bkName" },
        { text: "ຊື່ບັນຊີທະນາຄານ", value: "bkAccount" },
        { text: "ເລກບັນຊີທະນາຕານ", value: "bkNumberic" },
        { text: "ສະຖານະ", value: "bkState" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" },
        { text: "ວັນທີ່ແກ້ໄຂ", value: "updated_at" },
        { text: "ເລືອກ", value: "active" }
      ],

      dialogEdit: false,
      ItemEdit: null,

      dialogDel: false,
      ItemDel: null
    };
  },
  methods: {
    async seriesBank() {
      try {
        let bank = (await BankService.index()).data;
        this.counts = bank.count;
        this.bankAccounts = bank.data;
        // console.log(this.maxId);
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດຕີດຕໍ່ເຊີເວີ ຊົວຄານ", 3000);
      }
    },
    headerEdit(item) {
      this.dialogEdit = true;
      this.ItemEdit = item;
      //   console.log(item);
    },
    headerDel(item) {
      this.dialogDel = true;
      this.ItemDel = item;
      //   console.log(item);
    },
    formatchipStatus(pdprogression) {
      if (pdprogression == "on") {
        return "mdi-sync";
      } else {
        return "mdi-sync-off";
      }
    },
    formatchipColor(pdprogression) {
      if (pdprogression == "on") {
        return "green";
      } else {
        return "red";
      }
    }
  },
  created() {
    this.seriesBank();
  }
};
</script>
<style></style>
