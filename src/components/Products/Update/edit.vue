<template>
  <div>
    <v-card class="ml-2 mr-2">
      <v-card-title>
        <span class="headline">
          <div class="font">ແກ້ໄຂສິນຄ້າ</div>
        </span>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-card elevation="18">
          <v-container>
            <Form model="POST" enctype="multipart/form-data">
              <div>
                <v-row>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      disabled
                      v-model="pdId"
                      name="pdId"
                      required
                      label="ລະຫັດສິນຄ້າ"
                      placeholder="P001"
                    ></v-text-field>
                    <v-text-field
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
                      name="pdfullname"
                      v-model="pdFullname"
                      label="ຊື່ເຕັມສິນຄ້າ"
                      placeholder="ຕ້ອງປ້ອນຂໍ້ມູນຊື່ເຕັມສິນຄ້າ"
                      auto-grow
                      :error-messages="pdFullnameError"
                      @input="$v.pdFullname.$touch()"
                      @blur="$v.pdFullname.$touch()"
                      :counter="120"
                    >
                    </v-textarea>

                    <v-combobox
                      v-model="CategoriesName"
                      :items="categorys.data"
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
                      v-model="ColourName"
                      :items="colours.data"
                      chips
                      required
                      label="ສີສີນຄ້າ"
                      item-text="cname"
                      item-value="cname"
                      :error-messages="colourError"
                      @input="$v.ColourName.$touch()"
                      @blur="$v.ColourName.$touch()"
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-combobox
                      v-model="BrandName"
                      :items="brands.Data"
                      required
                      chips
                      label="ແບຣນສິນຄ້າ"
                      item-text="bname"
                      item-value="bname"
                      :error-messages="brandError"
                      @input="$v.BrandName.$touch()"
                      @blur="$v.BrandName.$touch()"
                    >
                    </v-combobox>
                    <v-combobox
                      v-model="SupplierName"
                      :items="suppliers.data"
                      chips
                      required
                      label="ຜູ້ສະໜອງ"
                      item-text="supfullname"
                      item-value="supfullname"
                      :error-messages="supplierError"
                      @input="$v.SupplierName.$touch()"
                      @blur="$v.SupplierName.$touch()"
                    ></v-combobox>
                    <v-combobox
                      v-model="pdProgression"
                      :items="item"
                      required
                      label="ສະຖານະເຮັດວຽກ"
                      :error-messages="pdProgressionError"
                      @input="$v.pdProgression.$touch()"
                      @blur="$v.pdProgression.$touch()"
                      :counter="15"
                    ></v-combobox>

                    <!-- point componetn Image -->
                    <image-form
                      :clearForm="stateClearFormImage"
                      :image_mage="photos_main"
                      :image_sub="lilstImage"
                      @photos_main="hasdleImage_main"
                      @photos_sub="hasdlImage_sub"
                    ></image-form>
                  </v-col>
                </v-row>
              </div>
            </Form>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="mr-2">
              <v-btn color="warning darken-1" @click="clearForm">ຍົກເລີກ</v-btn>
            </div>
            <v-btn color="green darken-1" dark @click="editProduct">
              ປ່ຽນແປ່ງ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

import ProductService from "@/service/Products";
import Images from "./editImage";
export default {
  components: {
    "image-form": Images
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
    }
  },
  data() {
    return {
      titleForm: false,
      pdId: 0,
      brands: [],
      categorys: [],
      colours: [],
      suppliers: [],
      item: ["off"],
      cleanImages: false,

      //validator
      BrandName: "",
      CategoriesName: "",
      ColourName: "",
      SupplierName: "",
      pdName: "",
      pdFullname: "",
      pdProgression: "",
      photos_main: null,
      lilstImage: null,

      /// Form Image
      stateClearFormImage: false,
      image_main: null,
      image_sub: null
    };
  },
  methods: {
    /// show value product
    async seriesEidtProduct() {
      try {
        let showproduct = (await ProductService.showproduct(this.pdId)).data;
        let i = 0;
        this.pdName = showproduct.data[i].pdname;
        this.pdFullname = showproduct.data[i].pdfullname;
        this.showCategory(showproduct.data[i].categories_Id);
        this.showBrand(showproduct.data[i].brand_Id);
        this.showColour(showproduct.data[i].colour_Id);
        this.showSupplier(showproduct.data[i].supplier_Id);
        this.pdProgression = showproduct.data[i].pdprogression;

        this.photos_main = showproduct.data[i].pdphotos_main;
        this.lilstImage = showproduct.data[i].pdphotos_sub;
        // console.log(showproduct.data[i]);
      } catch (error) {
        console.log("product error");
      }
    },

    // show data compobox
    async showBrand(brandId) {
      try {
        let brand = (await ProductService.showbrand(brandId)).data;
        this.BrandName = brand.Data;
      } catch (error) {
        console.log("brand error");
      }
    },
    async showCategory(categoryId) {
      try {
        let category = (await ProductService.showcategory(categoryId)).data;
        this.CategoriesName = category.data;
      } catch (error) {
        console.log("brand error");
      }
    },
    async showColour(colourId) {
      try {
        let colour = (await ProductService.showcolour(colourId)).data;
        this.ColourName = colour.data;
      } catch (error) {
        console.log("brand error");
      }
    },
    async showSupplier(supId) {
      try {
        let sup = (await ProductService.showsupplier(supId)).data;
        this.SupplierName = sup.data;
      } catch (error) {
        console.log("brand error");
      }
    },

    ///clearForm
    clearForm() {
      this.stateClearFormImage = true;
      this.$store.commit("productchange", 0);
      this.$router.push({
        name: "Product"
      });
    },

    ///point method conbobox
    async comBrand() {
      try {
        this.brands = (await ProductService.showBrand()).data;
      } catch (error) {
        console.log("error");
      }
    },
    async comCategory() {
      try {
        this.categorys = (await ProductService.showCategory()).data;
      } catch (error) {
        console.log("error");
      }
    },
    async comColour() {
      try {
        this.colours = (await ProductService.showColour()).data;
      } catch (error) {
        console.log("error");
      }
    },

    async comSupplier() {
      try {
        this.suppliers = (await ProductService.showSupplier()).data;
      } catch (error) {
        console.log("error");
      }
    },

    //alert message

    showMessage(title, msg, event) {
      this.$swal(title, msg, event);
    },

    ///point image
    hasdleImage_main(item) {
      this.image_main = item;
      // console.log(item)
    },
    hasdlImage_sub(item) {
      this.image_sub = item;
      // console.log(item);
    },

    ///point of addproduct
    editProduct() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.showMessage(
          "ປ້ອນຂໍ້ມູນ",
          "ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາລອງໄໝ່",
          "question"
        );
      } else {
        let product = new FormData();
        product.append("pdId", this.pdId);
        product.append("brand_Id", this.BrandName.bId);
        product.append("categories_Id", this.CategoriesName.ctId);
        product.append("colour_Id", this.ColourName.cId);
        product.append("supplier_Id", this.SupplierName.supId);
        product.append("pdname", this.pdName);
        product.append("pdfullname", this.pdFullname);
        product.append("pdprogression", this.pdProgression);

        if (this.image_main != undefined) {
          product.append("pdphotos_main", this.image_main);
        }
        if (this.image_sub != null) {
          for (let index = 0; index < this.image_sub.length; index++) {
            let file = this.image_sub[index];
            product.append("pdphotos_sub[" + index + "]", file);
          }
        }

        this.updateProduct(product);

        // const form = Array.from(product.entries());
        // for (const [name, value] of form) {
        //   console.log({ name, value });
        // }
      }
    },
    ///point crud product
    async updateProduct(product) {
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      try {
        await ProductService.updateProduct(product, config);
        this.showMessage("ແກ້ໄຂສຳເລັດ", "ແກ້ໄຂສິນຄ້າສຳເລັດແລ້ວ!!!", "success");
        //statemanagement
        this.$store.commit("productchange", 0);
        this.$router.push({
          name: "Product"
        });
      } catch (error) {
        this.showMessage(
          "ເກີດຂໍ້ຜີດພາດ",
          "ບໍ່ສາມາດແກ້ໄຂສິນຄ້າ ກະລຸນາລອງໄໝ່",
          "error"
        );
      }
    }
  },
  created() {
    this.pdId = this.$store.state.product_Id;
    this.seriesEidtProduct();
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
