<template lang="">
  <div>
    <v-dialog
      v-model="dialogform"
      persistent
      :overlay="false"
      max-width="400px"
    >
      <v-card>
        <v-card-title class="grey lighten-2">
          <h3>ແກ້ໄຂຂໍ້ມຸນ ຈຳນວນ ແລະ ລາຄາ</h3>
        </v-card-title>
        <v-card-text class="mt-5">
          <v-row>
            <v-col>
              <h4>ຊື່ສິນຄ້າ: {{ pdname }}</h4>
            </v-col>
            <v-col>
              <h4>ຂະໜາດສິນຄ້າ: {{ sname }}</h4>
            </v-col>
          </v-row>
          <br />
          <v-divider></v-divider>
          <v-text-field
            name="name"
            style="display: none"
            label="ID"
            v-model="srId"
          ></v-text-field>
          <v-text-field
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
                @click="changeForm"
                >ປ່ຽນແປ່ຽ</v-btn
              >
            </div>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import notify from "@/notify/notifycation";
import ProductService from "@/service/Products";
export default {
  props: {
    dialogform: Boolean,
    ValueStorage: Object
  },
  data() {
    return {
      loadingbtn: false,
      pdname: "",
      sname: "",
      srId: 0,
      srate: 0,
      srqty: 0,
      srcost: 0,
      srprice: 0
    };
  },
  methods: {
    closeForm() {
      this.$emit("closeForm");
    },
    // calcudator Rate and prive
    calcudator() {
      let rate = parseFloat(this.srate);
      let cost = parseFloat(this.srcost);
      let sum = rate * cost;
      this.srprice = sum;
    },
    async changeForm() {
      try {
        this.loadingbtn = true;
        await ProductService.updateStorage({
          srId: this.srId,
          srate: this.srate,
          srqty: this.srqty,
          srcost: this.srcost,
          srprice: this.srprice
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.loadingbtn = false;

        notify.showMessage("success", "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ", 2000);
        this.$emit("closeForm");
        this.$emit("editSuccess");
      } catch (error) {
        notify.showMessage("error", "ບໍ້ສາມາດແກ້ໄຂຂໍ້ມູນ", 2000);
      }
    }
  },
  watch: {
    dialogform() {
      if (this.dialogform == true) {
        this.srId = this.ValueStorage.srId;
        this.srate = this.ValueStorage.srate;
        this.srqty = this.ValueStorage.srqty;
        this.srcost = this.ValueStorage.srcost;
        this.srprice = this.ValueStorage.srprice;
        this.pdname = this.ValueStorage.pdname;
        this.sname = this.ValueStorage.sname;
        // console.log(this.ValueStorage)
      }
    }
  }
};
</script>
<style lang=""></style>
