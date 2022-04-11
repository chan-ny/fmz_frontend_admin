<template>
  <div>
    <v-card class="ml-2 mr-2">
      <v-card-title>
        <span class="headline">
          <div class="font">ເພີ່ມສິນຄ້າ</div>
        </span>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn color="black" small dark left @click="clearFormState">
          <v-icon>mdi-arrow-left-bold</v-icon>ກັບຄືນ
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-card elevation="3" outlined>
          <v-container>
            <Form model="POST" enctype="multipart/form-data">
              <div>
                <v-row>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      outlined
                      dense
                      disabled
                      v-model="pdId"
                      name="pdId"
                      required
                      label="ລະຫັດສິນຄ້າ"
                      placeholder="P001"
                    ></v-text-field>
                    <v-text-field
                      dense
                      outlined
                      v-model="pdName"
                      name="pdname"
                      required
                      :error-messages="pdNameError"
                      label="ຊື່ສິນຄ້າ"
                      placeholder="Adidas"
                      @input="$v.pdName.$touch()"
                      @blur="$v.pdName.$touch()"
                      :counter="30"
                    ></v-text-field>
                    <v-textarea
                      outlined
                      dense
                      name="pdfullname"
                      v-model="pdFullname"
                      label="ຊື່ເຕັມສິນຄ້າ"
                      placeholder="ຕ້ອງປ້ອນຂໍ້ມູນຊື່ເຕັມສິນຄ້າ"
                      auto-grow
                      :error-messages="pdFullnameError"
                      @input="$v.pdFullname.$touch()"
                      @blur="$v.pdFullname.$touch()"
                      :counter="120"
                    ></v-textarea>

                    <v-combobox
                      outlined
                      dense
                      v-model="CategoriesName"
                      :items="categorys.productcategory"
                      chips
                      required
                      label="ປະເພດສິນຄ້າ"
                      item-text="ctname"
                      item-value="ctname"
                      :error-messages="categoryError"
                      @input="$v.CategoriesName.$touch()"
                      @blur="$v.CategoriesName.$touch()"
                    ></v-combobox>
                    <v-combobox
                      outlined
                      dense
                      v-model="ColourName"
                      :items="colours.productcolour"
                      chips
                      required
                      label="ສີສີນຄ້າ"
                      item-text="cname"
                      item-value="cname"
                      :error-messages="colourError"
                      @input="$v.ColourName.$touch()"
                      @blur="$v.ColourName.$touch()"
                    ></v-combobox>
                    <v-select
                      dense
                      outlined
                      v-model="pdRate"
                      :items="itemRate"
                      name="Rate"
                      label="ອັດຕາສ່ວນ"
                      placeholder="1.2, 1.5, 4 "
                      :counter="4"
                      :error-messages="pdRateError"
                      @input="$v.pdRate.$touch()"
                      @blur="$v.pdRate.$touch()"
                      @change="caludator"
                    ></v-select>
                    <v-text-field
                      dense
                      outlined
                      v-model="pdCost"
                      name="Cost"
                      label="ລາຄາຕົ້ນທືນ"
                      placeholder="10.000"
                      :error-messages="pdCostError"
                      @input="$v.pdCost.$touch()"
                      @blur="$v.pdCost.$touch()"
                      :counter="8"
                      @change="caludator"
                    ></v-text-field>
                    <v-text-field
                      dense
                      outlined
                      disabled
                      v-model="pdPrice"
                      label="ລາຄາຂາຍ"
                      placeholder="15.000"
                      :error-messages="pdPriceError"
                      @input="$v.pdPrice.$touch()"
                      @blur="$v.pdPrice.$touch()"
                      :counter="8"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-combobox
                      outlined
                      dense
                      v-model="BrandName"
                      :items="brands.productbrand"
                      required
                      chips
                      label="ແບຣນສິນຄ້າ"
                      item-text="bname"
                      item-value="bname"
                      :error-messages="brandError"
                      @input="$v.BrandName.$touch()"
                      @blur="$v.BrandName.$touch()"
                    ></v-combobox>
                    <v-combobox
                      outlined
                      dense
                      v-model="SupplierName"
                      :items="suppliers.productsup"
                      chips
                      required
                      label="ຜູ້ສະໜອງ"
                      item-text="supfullname"
                      item-value="supfullname"
                      :error-messages="supplierError"
                      @input="$v.SupplierName.$touch()"
                      @blur="$v.SupplierName.$touch()"
                    ></v-combobox>
                    <v-select
                      outlined
                      dense
                      v-model="pdProgression"
                      :items="item"
                      required
                      label="ສະຖານະເຮັດວຽກ"
                      :error-messages="pdProgressionError"
                      @input="$v.pdProgression.$touch()"
                      @blur="$v.pdProgression.$touch()"
                      :counter="15"
                    ></v-select>
                    <br />
                    <br />

                    <!-- point componetn Image -->

                    <image-form
                      :clearForm="stateClearFormImage"
                      @photos_main="hasdleImage_main"
                      @photos_sub="hasdlImage_sub"
                    ></image-form>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <h2>ເພີ່ມໄຊຣ ແລະ ຈຳນວນ,ລາຄາ</h2>
                    <br />
                    <v-divider class="mb-2" color="orange"></v-divider>

                    <!-- point Storage Form -->
                    <storage-form
                      :products_Id="pdId"
                      @dataFormStorage="hasdleDateStorage"
                    ></storage-form>
                  </v-col>
                </v-row>
              </div>
            </Form>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="mr-2">
              <v-btn small color="warning darken-1" @click="clearForm"
                >ຍົກເລີກ</v-btn
              >
            </div>
            <v-btn small color="green darken-1" dark @click="addProduct"
              >ບັນທຶກ</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";

import ProductService from "@/service/Products";
import Images from "./Images";
import Storage from "./Storage/indexStorage";
import Notify from "@/notify/notifycation";
export default {
  components: {
    "image-form": Images,
    "storage-form": Storage
  },
  mixins: [validationMixin],
  validations: {
    BrandName: { required },
    CategoriesName: { required },
    ColourName: { required },

    SupplierName: { required },
    pdName: { required, minLength: minLength(4), maxLength: maxLength(30) },
    pdFullname: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(120)
    },
    pdProgression: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(15)
    },
    pdCost: { required, between: between(1000, 10000000) },
    pdRate: { required, between: between(1, 4) },
    pdPrice: { required, between: between(1000, 10000000) }
  },
  data() {
    return {
      pdId: "",
      brands: [],
      categorys: [],
      colours: [],
      suppliers: [],
      item: ["on", "off"],
      itemRate: [1.3, 1.5, 1.7, 1.8, 2.0, 2.3, 2.5, 2.8, 3.0],
      cleanImages: false,

      //validator
      BrandName: "",
      CategoriesName: "",
      ColourName: "",
      SupplierName: "",
      pdName: "",
      pdFullname: "",
      pdCost: 0,
      pdRate: 0,
      pdPrice: 0,
      pdProgression: "",
      photos_main: null,
      lilstImage: null,

      ///point number and price
      dataStorage: [],

      /// Form Image
      stateClearFormImage: false
    };
  },
  methods: {
    //seriesProduct
    async seriesProduct() {
      try {
        this.products = (await ProductService.index()).data;
        this.pdId = this.products.maxId;
        // console.log( this.products)
      } catch (error) {
        Notify.showMessage("error", "ເຊີເວີບໍ່ຕອບສະໜອງ", 4000);
      }
    },

    ///clearForm
    clearForm() {
      this.stateClearFormImage = true;
      this.$router.push("Product");
    },
    clearFormState() {
      this.$router.push({
        name: "Product"
      });
    },

    ///point method conbobox
    async comBrand() {
      try {
        this.brands = (await ProductService.showBrand()).data;
      } catch (error) {
        console.log("error brands");
      }
    },
    async comCategory() {
      try {
        this.categorys = (await ProductService.showCategory()).data;
      } catch (error) {
        console.log("error category");
      }
    },
    async comColour() {
      try {
        this.colours = (await ProductService.showColour()).data;
      } catch (error) {
        console.log("error colour");
      }
    },

    async comSupplier() {
      try {
        this.suppliers = (await ProductService.showSupplier()).data;
      } catch (error) {
        console.log("error supplier");
      }
    },

    //alert message

    showMessage(title, msg, event) {
      this.$swal(title, msg, event);
    },

    ///point image
    hasdleImage_main(item) {
      this.photos_main = item;
    },
    hasdlImage_sub(item) {
      this.lilstImage = item;
    },

    ///point of Storage
    hasdleDateStorage(item) {
      this.dataStorage = item;
    },

    ///point of addproduct
    addProduct() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.showMessage(
          "ປ້ອນຂໍ້ມູນ",
          "ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາລອງໄໝ່",
          "question"
        );
      } else if (this.photos_main == undefined) {
        this.showMessage("ປ້ອນຂໍ້ມູນ", "ເລືອກຮູບໄໝ່ ກອ່ນ!!!", "question");
      } else if (this.dataStorage.length == 0) {
        Notify.showMessage("error", "ເພີ່ມໄຊຣ ແລະ ຈຳນວນ", 4000);
      } else {
        let product = new FormData();
        product.append("pdId", this.pdId);
        product.append("brand_Id", this.BrandName.bId);
        product.append("categories_Id", this.CategoriesName.ctId);
        product.append("colour_Id", this.ColourName.cId);
        product.append("supplier_Id", this.SupplierName.supId);
        product.append("pdname", this.pdName);
        product.append("pdfullname", this.pdFullname);
        product.append("pdcost", this.pdCost);
        product.append("pdrate", this.pdRate);
        product.append("pdprice", this.pdPrice);
        product.append("pdprogression", this.pdProgression);
        product.append("pdphotos_main", this.photos_main);

        for (let index = 0; index < this.lilstImage.length; index++) {
          let file = this.lilstImage[index];
          product.append("pdphotos_sub[" + index + "]", file);
        }

        this.saveProduct(product, this.dataStorage);

        // const form = Array.from(product.entries());
        // for (const [name, value] of form) {
        //   console.log({ name, value });
        // }
        // console.log(this.dataStorage);
      }
    },
    ///point add product
    async saveProduct(product, storage) {
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      try {
        await ProductService.create(product, config);
        await ProductService.createStorage(storage, config);
        Notify.showMessage("success", "ບັນທືກສິນຄ້າສຳເລັດແລ້ວ", 3000);
        this.$router.push({
          name: "Product"
        });
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດບັນທືກສິນຄ້າ ກະລຸນາລອງໄໝ່", 3000);
      }
    },

    /// caludator cost and price
    caludator() {
      let result = this.pdRate * this.pdCost;
      this.pdPrice = result;
    }
  },
  created() {
    this.seriesProduct();
    this.comBrand();
    this.comCategory();
    this.comColour();
    this.comSupplier();
  },
  computed: {
    brandError() {
      const error = [];
      if (!this.$v.BrandName.$dirty) return error;
      !this.$v.BrandName.required && error.push("ເພີ່ມຂໍ້ມູນແບຣນກ່ອນ");
      return error;
    },
    categoryError() {
      const error = [];
      if (!this.$v.CategoriesName.$dirty) return error;
      !this.$v.CategoriesName.required && error.push("ເພີ່ມຂໍ້ມູນປະເພດກ່ອນ");
      return error;
    },
    colourError() {
      const error = [];
      if (!this.$v.ColourName.$dirty) return error;
      !this.$v.ColourName.required && error.push("ເພີ່ມຂໍ້ມູນສີກ່ອນ");
      return error;
    },

    supplierError() {
      const error = [];
      if (!this.$v.SupplierName.$dirty) return error;
      !this.$v.SupplierName.required && error.push("ເພີ່ມຂໍ້ມູນຜູ້ສະໜອງກ່ອນ");
      return error;
    },
    pdNameError() {
      const error = [];
      if (!this.$v.pdName.$dirty) return error;
      !this.$v.pdName.minLength &&
        error.push("ຊື່ສິນຄ້າຕ້ອງຫຼາຍກວ່າ 3 ຕົວອັກສອນ");
      !this.$v.pdName.maxLength &&
        error.push("ຊື່ສິນຄ້າຕ້ອງນ້ອງກວ່າ 30 ຕົວອັກສອນ");
      !this.$v.pdName.required && error.push("ປ້ອນຂໍ້ມູນຊື່ກ່ອນ!!");
      return error;
    },
    pdFullnameError() {
      const error = [];
      if (!this.$v.pdFullname.$dirty) return error;
      !this.$v.pdFullname.minLength &&
        error.push("ຊື່ເຕັມສິນຄ້າຕ້ອງຫຼາຍກວ່າ 7 ຕົວອັກສອນ");
      !this.$v.pdFullname.maxLength &&
        error.push("ຊື່ເຕັມສິນຄ້າຕ້ອງນ້ອງກວ່າ 120 ຕົວອັກສອນ");
      !this.$v.pdFullname.required && error.push("ປ້ອນຂໍ້ມູນຊື່ເຕັມກ່ອນ!!");
      return error;
    },
    pdCostError() {
      const error = [];
      if (!this.$v.pdCost.$dirty) return error;
      !this.$v.pdCost.between &&
        error.push("ລາຄາຕົ້ນທືນຕ້ອງເລີ່ມຕົ້ນ 1000 ຫາ 1,000,000 ກີບ");
      !this.$v.pdCost.required && error.push("ປ້ອນຂໍ້ມູນລາຄາຕົ້ນທືນອນ!!");
      return error;
    },
    pdRateError() {
      const error = [];
      if (!this.$v.pdRate.$dirty) return error;
      !this.$v.pdRate.between &&
        error.push("ອັດຕາສ່ວນຕ້ອງເລີ່ມຕົ້ນ 1 ຫາ 4 ອັດຕາສ່ວນ");
      !this.$v.pdRate.required && error.push("ປ້ອນຂໍ້ມູນອັດຕາສ່ວນກ່ອນ!!");
      return error;
    },
    pdPriceError() {
      const error = [];
      if (!this.$v.pdPrice.$dirty) return error;
      !this.$v.pdPrice.between &&
        error.push("ລາຄາຂາຍຕ້ອງເລີ່ມຕົ້ນ 1000 ຫາ 1,000,000 ກີບ");
      !this.$v.pdPrice.required && error.push("ປ້ອນຂໍ້ມູນລາຄາຂາຍກ່ອນ!!");
      return error;
    },
    pdProgressionError() {
      const error = [];
      if (!this.$v.pdProgression.$dirty) return error;
      !this.$v.pdProgression.minLength &&
        error.push("ຂໍ້ມູນຂັ້ນຕອນຕ້ອງຫຼາຍກວ່າ 2 ຕົວອັກສອນ");
      !this.$v.pdProgression.maxLength &&
        error.push("ຂໍ້ມູນຂັ້ນຕອນຕ້ອງນ້ອຍກວ່າ 15 ຕົວອັກສອນ");
      !this.$v.pdProgression.required && error.push("ປ້ອນຂໍ້ມູນຂັ້ນຕອນກ່ອນ!!");
      return error;
    }
  }
};
</script>
<style></style>
