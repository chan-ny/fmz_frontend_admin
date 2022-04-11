<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <v-text-field
          v-model="products_Id"
          style="display: none"
          name="name"
          label="label"
          id="id"
        ></v-text-field>
        <v-combobox
          dense
          outlined
          v-model="SizeName"
          :items="sizes.productsize"
          required
          chips
          label="ຂະໜາດສິນຄ້າ"
          item-text="sname"
          item-value="sname"
          :error-messages="sizeError"
          @input="$v.SizeName.$touch()"
          @blur="$v.SizeName.$touch()"
        ></v-combobox>
        <v-text-field
          dense
          outlined
          v-model="srQty"
          label="ຈຳນວນ"
          name="QTY"
          placeholder="150"
          :error-messages="srQtyrror"
          @input="$v.srQty.$touch()"
          @blur="$v.srQty.$touch()"
          :counter="12"
        ></v-text-field>
        <v-btn small dark color="blue" @click="plusStorage">ເພີ່ມ</v-btn>
      </v-col>
      <v-col cols="12" sm="8" dm="8">
        <h4><u>ຕາຕະລາງຂໍ້ມູນ ຂະໜາດ, ຈຳນວນ, ລາຄາ</u></h4>
        <v-card outlined class="mt-2">
          <v-simple-table fixed-header height="200px" class="ma-2" dense>
            <template>
              <thead>
                <tr>
                  <th>ລະຫັດສິນຄ້າ</th>
                  <th>ຊື່ໄຊຣ</th>
                  <th>ຈຳນວນ</th>
                  <th>ລືບອອກ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in storage" :key="index">
                  <td>{{ item.product_Id }}</td>
                  <td>{{ item.sizename }}</td>
                  <td>{{ item.srqty }}</td>
                  <td>
                    <v-btn icon color="red">
                      <v-icon @click="deleteStorage()">mdi-window-close</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProductService from "@/service/Products";
import { validationMixin } from "vuelidate";
import { required, between } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    SizeName: { required },
    srQty: { required, between: between(0, 100000) }
  },
  props: {
    products_Id: String
  },
  data() {
    return {
      srQty: 0,
      sizes: [],
      SizeName: "",
      storage: []
    };
  },
  methods: {
    // alert message
    showMessage(title, msg, event) {
      this.$swal(title, msg, event);
    },
    async comSize() {
      try {
        this.sizes = (await ProductService.showSize()).data;
      } catch (error) {
        console.log("error");
      }
    },
    plusStorage() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.showMessage(
          "ປ້ອນຂໍ້ມູນ",
          "ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາລອງໄໝ່",
          "question"
        );
      } else {
        let sr = {
          product_Id: this.products_Id,
          sizename: this.SizeName.sname,
          size_Id: this.SizeName.sId,
          srqty: this.srQty,
          srstate: "on"
        };
        this.storage.push(sr);
        let array = [];
        for (let index = 0; index < this.storage.length; index++) {
          array.push(this.storage[index].size_Id);
        }

        if (this.hasdleCheck(array)) {
          this.showMessage(
            "ໄຊຣຕ້ອງບໍ່ຊ້ຳກັນ",
            "ກະລຸນາເລືອກຂໍ້ມູນທີ່ບໍ່ຊ້ຳກັນ",
            "error"
          );
          this.storage.pop(sr);
        }

        this.$emit("dataFormStorage", this.storage);
        // console.log(this.storage);
      }
    },

    // check duplicate array
    hasdleCheck(arr) {
      return new Set(arr).size !== arr.length;
    },

    deleteStorage() {
      this.storage.splice(this.storage, 1);
    }
  },
  created() {
    this.comSize();
  },
  computed: {
    sizeError() {
      const error = [];
      if (!this.$v.SizeName.$dirty) return error;
      !this.$v.SizeName.required && error.push("ເພີ່ມຂໍ້ມູນຂະໜາດກ່ອນ");
      return error;
    },

    srQtyrror() {
      const error = [];
      if (!this.$v.srQty.$dirty) return error;
      !this.$v.srQty.between &&
        error.push("ຈຳນວນຕ້ອງເລີ່ມຕົ້ນ 0 ຫາ 100,000 ຈຳນວນ");
      !this.$v.srQty.required && error.push("ປ້ອນຂໍ້ມູນຳນວນກ່ອນ!!");
      return error;
    }
  }
};
</script>
<style></style>
