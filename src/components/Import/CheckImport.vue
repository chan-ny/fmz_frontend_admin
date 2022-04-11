<template>
  <div>
    <v-card class="ma-2">
      <v-card-title primary-title>
        <h3>ກວດສອບສິນຄ້າທີ່ສັ່ງຊື່</h3>
      </v-card-title>
      <v-divider color="orange"></v-divider>
      <v-row>
        <v-col cols="12" md="4" sm="4">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <div>ເລືອກບີນທີ່ສັ່ງຊື່ສິນຄ້າ</div>
                <br />
                <v-list-item-subtitle
                  >ຈຳນວນ
                  <strong style="color:blue">{{ countCheck }}</strong>
                  ລາຍການ</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-data-table
              dense
              :headers="headerBill"
              :items="checkImports.data"
              class="elevation-2 pa2 text-center grey lighten-3"
              item-key="id"
              loading="true"
            >
              <template #item.impId="{item}">
                <v-chip
                  small
                  color="pink lighten-4"
                  class="blue--text"
                  @click="pushvalue(item.impId)"
                  >{{ item.impId }}</v-chip
                >
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" sm="8">
          <v-card>
            <v-list-item>
              <v-list-item-content>
                <div>ລາຍການຈັດຊື່ສິນຄ້າ</div>
                <br />
                <v-list-item-subtitle>
                  <h4>
                    ບີນເລທີ: <strong>{{ billImport }}</strong>
                  </h4>
                </v-list-item-subtitle>
                <div class="d-flex justify-end mt-n4">
                  <v-btn small color="success" text @click="isOpenCheckFinal"
                    >ກວດສອບສຳເລັດ</v-btn
                  >
                </div>

                <v-list-item-subtitle
                  >ຈຳນວນ
                  <strong style="color:blue">{{ countlist }}</strong>
                  ລາຍການ
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-data-table
              dense
              :headers="headerProduct"
              :items="listimport.data"
              class="elevation-2 pa-3 text-center grey lighten-3"
              item-key="index"
              loading="true"
            >
              <template #item.check="{item}">
                <a @click="aleertCheck(item)"><u>ກວດສອບ</u></a>
              </template>

              <template v-slot:top>
                <v-dialog
                  v-model="dialogupdate"
                  persistent
                  :overlay="false"
                  max-width="400px"
                >
                  <v-card>
                    <v-card-title class="grey lighten-2">
                      <h3>ປ່ຽນແປ່ງຂໍ້ມູນ</h3>
                    </v-card-title>
                    <v-card-text class="mt-4 ">
                      <div class="ma-4  mb-3 text-left">
                        <v-row>
                          <v-col>
                            <h2 class="pb-2">ເລກບີນ: {{ billImport }}</h2>
                            <h3 class="pb-2">ຊື່ສິນຄ້າ: {{ Pdname }}</h3>
                            <h3 class="pb-2">ປະເພດສິນຄ້າ: {{ Ctname }}</h3>
                            <h3 class="pb-2">ຂະໜາດສິນຄ້າ: {{ Sname }}</h3>
                            <h3 class="pb-2">ລາຄາສິນຄ້າ: {{ Price }}</h3>
                          </v-col>
                        </v-row>
                      </div>
                      <v-divider class="mb-5 deep-orange"></v-divider>
                      <v-text-field
                        v-model="QtyB"
                        dense
                        name="name"
                        disabled
                        label="ຈຳນວນກ່ອນ"
                      ></v-text-field>
                      <v-text-field
                        v-model="QtyA"
                        dense
                        name="name"
                        label="ຈຳນວນຫຼັງ"
                        @keyup.enter="calcudator"
                      ></v-text-field>
                      <v-alert
                        text
                        dense
                        color="deep-orange"
                        icon="mdi-clock-fast"
                        border="left"
                        name="after"
                      >
                        <div v-if="number < 0">ຈຳນວນເພີ່ມ: {{ -number }}</div>
                        <div v-else>ຈຳນວນຂາດ:{{ -number }}</div>
                      </v-alert>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="orange" text @click="dialogupdate = false">
                        ຍົກເລີກ
                      </v-btn>
                      <v-btn color="red" text @click="isOpenDelItem">
                        ລືບຂໍ້ມູນ
                      </v-btn>
                      <v-btn color="success" @click="checngNumber" text>
                        ປ່ຽນແປ່ງ
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <story-check class="mt-3" :clock="refreshStory"></story-check>

    <!-- delete item in import list -->
    <delete-item
      :dialogForm="dialogDel"
      :item="Itemdel"
      @closeForm="dialogDel = !dialogDel"
      @delSuccess="callBill"
    ></delete-item>

    <!-- final check complete -->
    <check-final
      :dialogForm="dialogFinal"
      :item="ItemFinal"
      @closeForm="dialogFinal = !dialogFinal"
      @finalSuccess="checkImport"
      @checklist="callBill"
    ></check-final>

  </div>
</template>
<script>
import CheckImport from "@/service/Imports/ImportService";
import Notify from "@/notify/notifycation";
import deleteFormItem from "./deleteItem";
import finalForm from "./CheckFinal";

import StoryCheck from "./Storycheck";

export default {
  components: {
    "delete-item": deleteFormItem,
    "check-final": finalForm,
    "story-check": StoryCheck,

  },
  data() {
    return {
      impId: "",
      checkImports: [],
      countCheck: 0,
      listimport: [],
      countlist: 0,
      billImport: 0,
      dialogupdate: false,
      headerBill: [
        { text: "ເລກບີນ", value: "impId" },
        { text: "ຜູ້ສະໜອງ", value: "supfullname" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" }
      ],
      headerProduct: [
        { text: "check", value: "check" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ຈຳນວນ B", value: "order_qty" },
        { text: "ຈຳນວນ A", value: "reciev_qty" },
        { text: "ລາຄາ", value: "imlprice" }
      ],

      imlId: "",
      Pdname: "",
      Ctname: "",
      Sname: "",
      QtyB: 0,
      QtyA: 0,
      Price: 0,
      number: 0,

      dialogDel: false,
      Itemdel: 0,

      dialogFinal: false,
      ItemFinal: null,

      refreshStory: 0
    };
  },
  methods: {
    //load checkimport
    async checkImport() {
      try {
        this.checkImports = (await CheckImport.checkImport()).data;
        this.countCheck = this.checkImports.count;
        this.refreshStory = this.checkImports.count;
        // console.log(this.checkImports.count);
      } catch (error) {
        console.log(" error check");
      }
    },

    ///load listproduct
    async listProduct(impId) {
      try {
        this.listimport = (await CheckImport.showlistProduct(impId)).data;
        this.countlist = this.listimport.count;
        this.billImport = this.listimport.importbill;
        // console.log( this.listimport.data
      } catch (error) {
        console.log(" error check list");
      }
    },

    ///push value biilimport
    pushvalue(Id) {
      this.listProduct(Id);
    },

    ///send data binding from index of import
    bindingBillimport() {
      this.ImpId = this.$route.params.impId;
      if (this.ImpId != undefined) {
        this.listProduct(this.ImpId);
      }
    },

    aleertCheck(item) {
      this.dialogupdate = true;
      this.ImpId = this.billImport;
      this.Pdname = item.pdname;
      this.Ctname = item.ctname;
      this.Sname = item.sname;
      this.QtyB = item.order_qty;
      this.QtyA = item.reciev_qty;
      this.Price = item.imlprice;
      this.imlId = item.imlId;
    },
    calcudator() {
      if (this.QtyB > 0) {
        let before = parseInt(this.QtyB);
        let after = parseInt(this.QtyA);
        this.number = before - after;
      }
    },

    // change number
    async checngNumber() {
      if (this.QtyA >= 0) {
        let contents = {
          imlId: this.imlId,
          iml_after_qty: this.QtyA
        };
        try {
          await CheckImport.checkNumber(contents);
          this.dialogupdate = false;
          Notify.showMessage("success", "ກວດສອບສຳເລັດແລ້ວ", 3000);

          if (this.ImpId != null) {
            this.listProduct(this.ImpId);
          }
        } catch (error) {
          Notify.showMessage("error", "ບໍ່ສາມາດກວດສອບ", 4000);
        }
      }
    },
    isOpenDelItem() {
      this.dialogDel = true;
      this.Itemdel = this.imlId;
    },
    callBill() {
      this.dialogupdate = false;
      if (this.ImpId != null) {
        this.listProduct(this.ImpId);
      }
    },
    isOpenCheckFinal() {
      this.dialogFinal = true;
      this.ItemFinal = this.listimport.importbill;
    }
  },

  created() {
    this.checkImport();
    this.bindingBillimport();
  }
};
</script>
<style></style>
