<template>
  <div>
    <v-card elevation="4" class="ma-2">
      <v-card-title primary-title>
        <h2>ຈັດຊື້ສິນຄ້າ</h2>
      </v-card-title>
      <v-divider color="orange"></v-divider>
      <v-card-title primary-title>
        <h5>ເລືອກສິນຄ້າ ແລະ ໄຊຣ</h5>
      </v-card-title>

      <v-row>
        <v-col cols="12" md="4" sm="4">
          <v-card elevation="5" class="ml-2">
            <div class="pa-2">
              <v-combobox
                dense
                outlined
                v-model="supName"
                :items="supplierCombo.data"
                chips
                required
                label="ເລືອກຜູ້ສະໜອງ"
                item-text="supfullname"
                item-value="supfullname"
                @change="seriesProduct"
                @click="checkAddproduct"
              ></v-combobox>
              <v-combobox
                dense
                outlined
                v-model="pdName"
                class="my-2"
                :items="products.data"
                label="ເລືຶອກສີນຄ້າ"
                counter
                item-text="pdname"
                item-value="pdname"
                @change="seriesBrand"
              >
                <template v-slot:selection="data">
                  <v-chip
                    small
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      v-if="
                        (price = new Intl.NumberFormat().format(
                          data.item.pdcost
                        ))
                      "
                      class="accent white--text"
                      left
                      v-text="data.item.pdname.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item.pdname }} :
                    {{ new Intl.NumberFormat().format(data.item.pdcost) }}
                  </v-chip>
                </template>
              </v-combobox>
              <v-combobox
                dense
                outlined
                v-model="sizeName"
                :items="sizeCombo.data"
                chips
                required
                label="ເລືອກຂະໜາດ"
                item-text="sname"
                item-value="sname"
                @change="searchStorage"
              ></v-combobox>
              <v-text-field
                dense
                outlined
                v-model="qty"
                name="qty"
                label="ຈຳນວນ"
                clearable
              ></v-text-field>
              <v-text-field
                disabled
                id="preice"
                dense
                outlined
                v-model="price"
                prefix="₭"
                name="price"
                label="ລາຄາ"
                clearable
                @keyup.enter="formatNumber"
              ></v-text-field>
              <v-btn tile class="mb-2" color="success" @click="addImport"
                >ເພີ່ມສັ່ງຊື້</v-btn
              >
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" sm="8">
          <v-card elevation="2">
            <v-card-title primary-title>
              ລາຍການສັ່ງຊື້ສິນຄ້າ <v-spacer></v-spacer>
              <v-btn
                small
                dark
                color="success"
                class="ma-2 "
                @click="saveImport"
                >ບັນທຶກ</v-btn
              >
              <v-btn small dark color="orange" @click="clearItem"
                >ລືບອອກທັງໝົດ</v-btn
              >
            </v-card-title>
            <v-data-table
              dense
              :headers="headColumn"
              :items="additems"
              class="elevation-1 ma-1 grey lighten-3"
              :items-per-page="6"
              item-key="id"
              loading="true"
            >
              <template v-slot:item.active="{ item }">
                <v-icon color="red" @click="deleteItem(item)"
                  >mdi-window-close</v-icon
                >
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <br />
    <v-card elevation="4" class="ma-2">
      <v-card-title primary-title>
        <h2>ລາຍການທີ່ຈັດຊື້ສິນຄ້າລ່າສຸດ</h2>
      </v-card-title>
      <v-divider color="orange"></v-divider>
      <v-card-title primary-title>
        <h5>
          ຈຳນວນ <strong style="color:red">{{ countlist }}</strong> ລາຍການ
        </h5>
      </v-card-title>
      <v-data-table
        dense
        :headers="headOrder"
        :items="importlist.data"
        class="elevation-1 grey lighten-3"
        :group-desc="true"
        group-by="impId"
      >
        <template v-slot:group.header="{ group, headers, toggle, isOpen }">
          <td :colspan="headers.length">
            <v-btn @click="toggle" small icon :ref="group" :data-open="isOpen">
              <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
            <b style="color:blue">
              ເລກບິນສັ້ງຊື່: <b style="color:red">{{ group }}</b>
            </b>
          </td>
          <td>
            <b class="ma-2"
              ><a @click="hesdelTotal(group)"><u>Total</u></a></b
            >
            <router-link
              class="green--text"
              small
              :to="{ name: 'checkimport', params: { impId: group } }"
              >Check</router-link
            >
            <b class="ma-2"
              ><a @click="headerDelete(group)"
                ><u class="red--text">ລືບ</u></a
              ></b
            >
          </td>
        </template>

        <template v-slot:item.pdId="{ item }">
          <v-chip small class="text-center blue lighten-4 ">{{
            item.pdId
          }}</v-chip>
        </template>
        <template v-slot:item.billId="{ item }">
          <router-link :to="{ name: 'checki-import' }">{{
            item.billId
          }}</router-link>
        </template>
        <template v-slot:top>
          <v-dialog v-model="alertTotal" max-width="300px">
            <v-card>
              <v-card-title class=" pl-5 text-center"
                >ຈຳນວນລວມ ແລະ ລາຄາລວມ</v-card-title
              >
              <v-divider class="mb-2"></v-divider>
              <v-card-text>
                <div class="fontsize16 blue--text">
                  ລວມຈຳນວນທັງໝົດ: {{ Billamount }}
                </div>
                <div class="fontsize16 blue--text">
                  ລວມລາຄາທັງໝົດ: {{ Billtotal }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="alertTotal = !alertTotal"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:item.imlprice="{ item }">
          <span class="indigo--text">{{
            new Intl.NumberFormat().format(item.imlprice)
          }}</span>
        </template>
        <template v-slot:item.Amount="{ item }">
          <span class="indigo--text">{{
            new Intl.NumberFormat().format(item.Amount)
          }}</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import Suppllire from "@/service/Supplier";
import DisplayProduct from "@/service/Imports/DisplayProduct";
import BrandService from "@/service/BrandService";
import CategoryService from "@/service/CategoryService";

import ImportService from "@/service/Imports/ImportService";
import Notify from "@/notify/notifycation";

export default {
  data() {
    return {
      countlist: 0,
      alertTotal: false,
      supplierCombo: [],
      supName: "",
      sizeCombo: [],
      sizeName: "",
      brands: [],
      category: [],
      products: [],
      pdName: "",
      qty: 0,
      price: 0,
      storageId: 0,
      additems: [],
      headColumn: [
        {
          text: "ລະຫັດສິນຄ້າ",
          align: "start",
          sortable: true,
          value: "product_Id"
        },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ຜູ້ສະໜອງ", value: "supname" },
        { text: "ແບຣນສິນຄ້າ", value: "bname" },
        { text: "ປະເພດສິນຄ້າ", value: "ctname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ຈຳນວນ", value: "order_qty" },
        { text: "ລາຄາ", value: "imlprice" },
        { text: "ລວມ", value: "imlamount" },
        { text: "ເລືອກ", sortable: true, value: "active" }
      ],
      importlist: [],
      headOrder: [
        // { text: "ລະຫັດບິນ", align: "start", sortable: true, value: "billId" },
        { text: "ລະຫັດສິນຄ້າ", value: "pdId" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "່ຊື່ເຕັມຂອງສິນຄ້າ", value: "pdfullname" },
        { text: "ຜູ້ສະໜອງ", value: "supfullname" },
        { text: "ແບຣນ", value: "bname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ສິສີນຄ້າ", value: "cname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ຈຳນວນ", value: "order_qty" },
        { text: "ລາຄາ", value: "imlprice" },
        { text: "ລວມ", value: "Amount" },
        { text: "ສະຖານະ", value: "impstate" },
        { text: "ວັນທີສັ່ງຊື່", value: "created_at" }
      ],
      Billamount: 0,
      Billtotal: 0
    };
  },
  methods: {
    formatNumber() {
      if (this.price) {
        this.price = new Intl.NumberFormat().format(this.price);
      }
    },
    /// load supplier
    async seriesSupplier() {
      try {
        this.supplierCombo = (await Suppllire.index()).data;
      } catch (error) {
        console.log("error");
      }
    },
    async Searchsize() {
      try {
        this.sizeCombo = (
          await ImportService.SearchSize(this.pdName.pdId)
        ).data;
        // console.log(this.sizeCombo);
      } catch (error) {
        console.log("size error");
      }
    },
    async seriesBrand() {
      try {
        this.brands = (await BrandService.show(this.pdName.brand_Id)).data;
        this.seriesCategory();
        this.Searchsize();
        // console.log(item);
      } catch (error) {
        console.log("brand error");
      }
    },
    async seriesCategory() {
      try {
        this.category = (
          await CategoryService.show(this.pdName.categories_Id)
        ).data;
      } catch (error) {
        console.log("brand error");
      }
    },

    // load product
    async seriesProduct() {
      try {
        this.products = (
          await DisplayProduct.displayProduct(this.supName.supId)
        ).data;
        // console.log(this.products);
      } catch (error) {
        Notify.showMessage("error", "error display product", 400);
      }
    },

    //search Storage
    async searchStorage() {
      try {
        let storage = (
          await DisplayProduct.searchStorage(
            this.pdName.pdId,
            this.sizeName.sId
          )
        ).data;
        this.storageId = storage.data[0].srId;
        //  console.log(storage.data[0].srId)
      } catch (error) {
        console.log("can't search storage");
      }
      // console.log(this.pdName.pdId,this.sizeName.sId)
    },
    //addImport
    addImport() {
      if (this.sizeName.sname == undefined || this.qty == 0) {
        Notify.showMessage(
          "warning",
          "ກະລຸນາເລືອກຂະໜາດກ່ອນ ຫຼື ຈຳນວນຫຼາຍກວ່າ 0",
          4000
        );
      } else {
        let number = parseFloat(this.qty);
        let prices = parseFloat(this.price.replace(",", ""));
        let total = number * prices;
        let addListImport = {
          import_Id: this.products.maxId,
          storage_Id: this.storageId,
          product_Id: this.pdName.pdId,
          size_Id: this.sizeName.sId,
          supplier_Id: this.supName.supId,
          pdname: this.pdName.pdname,
          supname: this.supName.supfullname,
          bname: this.brands.data.bname,
          ctname: this.category.data.ctname,
          sname: this.sizeName.sname,
          order_qty: this.qty,
          reciev_qty: 0,
          imlprice: prices,
          imlamount: total
        };
        this.additems.push(addListImport);
        this.clearForm();

        let array = [];
        for (let index = 0; index < this.additems.length; index++) {
          array.push(this.additems[index].size_Id);
        }

        if (this.hasdleCheck(array)) {
          this.showMessage(
            "ໄຊຣຕ້ອງບໍ່ຊ້ຳກັນ",
            "ກະລຸນາເລືອກຂໍ້ມູນທີ່ບໍ່ຊ້ຳກັນ",
            "error"
          );
          this.additems.pop(addListImport);
        }
      }
    },
    hasdleCheck(arr) {
      return new Set(arr).size !== arr.length;
    },

    /// save import
    async saveImport() {
      if (this.additems.length == 0) {
        this.showMessage(
          "ຜີດພາດ",
          "ບໍ່ສາມາດບັນທືກການສັ່ງຊື້ ເພາະຂໍ້ມູນບໍ່ຄົບ",
          "error"
        );
      } else {
        let imports = new FormData();
        imports.append("supplier_Id", this.supName.supId);
        imports.append("impstate", "on");

        try {
          await ImportService.saveImport(imports);
          await ImportService.saveImportList(this.additems);
          Notify.showMessage("success", "ບັນທືກການສັ່ງຊື້ສຳເລັດແລ້ວ", 3000);
          this.$store.dispatch("ActiveImpoerOrder", this.additems);
          let p = window.open(
            "billorder",
            "_blank",
            "resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, width=900px, height=700px,left=400px, top=200px"
          );
          setTimeout(() => {
            p.print();
          }, 2000);
          setTimeout(() => {
            p.close();
          }, 3000);

          setTimeout(() => {
            this.additems.splice(this.additems);
            this.showimportlist();
          }, 3000);
        } catch (error) {
          Notify.showMessage("error", "ບໍ່ສາມາດບັນທືກການສັ່ງຊື້", 4000);
        }
      }
    },

    headerDelete(item) {
      try {
        ImportService.deleteImport(item);
        this.showimportlist();
        Notify.showMessage("success", "ລືບບີນສັ່ງຊື້ສຳເລັດແລ້ວ", 3000);
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດລືບການສັ່ງຊື້", 4000);
      }
    },

    clearForm() {
      this.sizeName = "";
      this.qty = 0;
    },
    async hesdelTotal(item) {
      this.alertTotal = true;
      let check = await DisplayProduct.checkBill(item);
      this.Billamount = check.data.data[0].Amount;
      let total = check.data.data[0].total;
      this.Billtotal = new Intl.NumberFormat().format(total);
    },

    /// display import list item
    async showimportlist() {
      try {
        this.importlist = (await ImportService.showlistimport()).data;
        this.countlist = this.importlist.count;
        // console.log(this.importlist);
      } catch (error) {
        console.log("import liast error");
      }
    },

    /// alert Message
    showMessage(title, msg, even) {
      this.$swal(title, msg, even);
    },
    checkAddproduct() {
      console.log(this.additems);
      if (this.additems.length > 0) {
        this.showMessage("ປະເສດການເລືອກ", "ບໍ່ສາມາດເລືອກຂໍ້ມູນໃດ້", "error");
      }
    },

    //caludator field
    sumField() {
      for (let i = 0; i < this.importlist.length; i++) {
        console.log(this.importlist[i]);
      }
      // return this.importlist.data.reduce((a, b) => a + (b[key] || 0), 0);
    },

    /// remove item
    deleteItem(item) {
      this.additems.splice(item, 1);
    },
    clearItem() {
      this.additems.splice(this.additems);
    }
  },

  created() {
    setTimeout(() => {
      this.sumField();
    }, 2000);
    this.seriesSupplier();
    this.Searchsize();
    this.showimportlist();
  }
};
</script>
<style></style>
