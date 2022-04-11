<template>
  <div>
    <v-dialog
      v-model="dialogform"
      persistent
      :overlay="false"
      max-width="400px"
    >
      <v-card>
        <v-card-title class="grey lighten-2">
          <h3>ເພີ່ມຂໍ້ມຸນ ຈຳນວນ ແລະ ລາຄາ</h3>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-row>
            <v-col>
              <h4 class="blue--text">ຊື່ສິນຄ້າ: {{ pdname }}</h4>
            </v-col>
            <v-col> </v-col>
          </v-row>
          <br />
          <v-divider></v-divider>
          <v-combobox
            dense
            outlined
            v-model="sId"
            label="ຂະໜາດສິນຄ້າ"
            :items="sizes.productsize"
            item-value="sname"
            item-text="sname"
          >
          </v-combobox>
          <v-text-field
            name="name"
            style="display: none"
            label="ID"
            v-model="srId"
          ></v-text-field>
          <v-text-field
            name="name"
            style="display: none"
            label="ID"
            v-model="pdId"
          ></v-text-field>
          <v-text-field
            name="name"
            style="display: none"
            label="ID"
            v-model="sId"
          ></v-text-field>
          <v-text-field
            dense
            outlined
            name="name"
            label="ຈຳນວນ"
            v-model="srqty"
          ></v-text-field>
          <v-card-actions class="d-flex justify-center">
            <div>
              <v-btn color="orange" text @click="closeForm">ຍົກເລີກ</v-btn>
              <v-btn
                color="success"
                :loading="loadingbtn"
                text
                @click="addStorage"
                >ບັນທືກ</v-btn
              >
            </div>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SizeServiec from "@/service/SizeServies";
import ProductService from "@/service/Products";
import Notify from "@/notify/notifycation";
export default {
  props: {
    dialogform: Boolean,
    Itemproduct: Array
  },
  data() {
    return {
      sizes: [],
      loadingbtn: false,
      pdname: "",
      sId: "",
      pdId: 0,
      srId: 0,
      sname: "",
      srate: 1.2,
      srqty: 0,
      srcost: 0,
      srprice: 0
    };
  },
  methods: {
    clearForm() {
      this.srate = 1.2;
      this.srqty = 0;
    },
    async addStorage() {
      try {
        let add = await ProductService.addStorage({
          product_Id: this.pdId,
          size_Id: this.sId.sId,
          srqty: this.srqty,
          srstate: "on"
        });
        Notify.showMessage("success", add.data.message, 3000);
        this.$emit("closeForm");
        this.$emit("addSuccess");
        this.clearForm();
      } catch (error) {
        this.$swal("ຜີດພາດ", "ໄຊຣຊ້ຳກັນ ບໍ່ສາມາດບັນທືກ", "error");
      }
    },
    closeForm() {
      this.$emit("closeForm");
    },
    async seriestable() {
      try {
        this.sizes = (await SizeServiec.index()).data;
      } catch (error) {
        console.log("error size");
      }
    }
  },
  watch: {
    Itemproduct() {
      if (this.Itemproduct.length > 0) {
        this.pdname = this.Itemproduct[0].pdname;
        this.pdId = this.Itemproduct[0].pdId;
        // console.log(this.Itemproduct);
      }
    }
  },
  created() {
    this.seriestable();
  }
};
</script>
<style></style>
