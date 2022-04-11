<template>
  <div class="ml-4 mt-1">
    <v-btn small color="success" tile @click="dialogForm = true"
      >ເພີ່ມຂໍ້ມູນ</v-btn
    >
    <v-dialog outlined v-model="dialogForm" persistent width="450px">
      <v-card>
        <v-card-title class="grey lighten-2">
          <div>ເພີ່ມຂໍ້ມູນ QR</div>
        </v-card-title>
        <v-form class="mx-4">
          <v-text-field
            v-model="Bkname"
            name="name"
            class="mt-2"
            dense
            solo
            label="ຊື່ທະນາຕານ"
            append-icon="mdi-bank"
            :error-messages="NameError"
            @input="$v.Bkname.$touch()"
            @blur="$v.Bkname.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="BkAccount"
            class="mt-n2"
            name="account"
            dense
            solo
            label="ບັນຊີທະນາຄານ"
            append-icon="mdi-account-circle"
            :error-messages="AccountError"
            @input="$v.BkAccount.$touch()"
            @blur="$v.BkAccount.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="Bknumberic"
            name="number"
            class="mt-n2"
            dense
            solo
            label="ເລກບັນຊີ"
            append-icon="mdi-credit-card"
            :error-messages="NumbericError"
            @input="$v.Bknumberic.$touch()"
            @blur="$v.Bknumberic.$touch()"
          ></v-text-field>
          <h4 class="mt-n3">ຮູບແລກ</h4>
          <div class="d-flex justify-center">
            <v-card elevation="14" max-width="300px" class="mb-2 ">
              <div v-if="!preview" @click="selectImage">
                <v-img width="100%" src="@/assets/plus image.jpeg"></v-img>
              </div>
              <div v-else @click="selectImage">
                <v-img contain height="100%" :src="preview"></v-img>
              </div>
              <input
                style="display: none"
                type="file"
                ref="fileinput"
                accept="image/*"
                @change="priviewImage"
              />
            </v-card>
          </div>
          <v-select
            v-model="BkState"
            :items="item"
            label="ສະຖານະ"
            :error-messages="StateError"
            @change="$v.BkState.$touch()"
            @blur="$v.BkState.$touch()"
            solo
          ></v-select>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn dark small color="orange" @click="dialogForm = false"
            >ຍົກເລີກ</v-btn
          >
          <v-btn small color="success" @click="isOpenAdd">ບັນທືກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

import Notify from "@/notify/notifycation";
import BankService from "@/service/BankService";

export default {
  mixins: [validationMixin],
  validations: {
    Bkname: { required, maxLength: maxLength(50) },
    BkAccount: { required, maxLength: maxLength(100) },
    Bknumberic: { required, maxLength: maxLength(100) },
    BkState: { required, maxLength: maxLength(15) }
  },
  data() {
    return {
      dialogForm: false,
      preview: null,
      image: null,
      Bkname: "",
      BkAccount: "",
      Bknumberic: "",
      BkState: "",
      item: ["on", "off"]
    };
  },
  methods: {
    selectImage() {
      this.$refs.fileinput.click();
    },
    priviewImage(event) {
      var input = event.target;
      if (input.files) {
        var resder = new FileReader();
        resder.onload = e => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        resder.readAsDataURL(input.files[0]);
        // console.log(this.image);
      }
    },
    async isOpenAdd() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage("error", "ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາລອງໄໝ່", 3000);
      } else {
        let bank = new FormData();
        bank.append("bkName", this.Bkname);
        bank.append("bkAccount", this.BkAccount);
        bank.append("bkNumberic", this.Bknumberic);
        bank.append("bkImage", this.image);
        bank.append("bkState", this.BkState);

        // const form = Array.from(bank.entries());
        // for (const [name, value] of form) {
        //   console.log({ name, value });
        // }

        const config = {
          hesders: { "content-type": "multipart/form-data" }
        };
        try {
          let save = await BankService.createBank(bank, config);
          this.dialogForm = false;
          this.$emit("addSuccess");
          Notify.showMessage("success", save.data.message, 3000);
        } catch (error) {
          Notify.showMessage("error", "ບໍ່ສາມາດບັນທືກຂໍ້ມູນ ກະລຸນາລອງໄໝ່");
        }
      }
    }
  },
  computed: {
    NameError() {
      const error = [];
      if (!this.$v.Bkname.$dirty) return error;
      !this.$v.Bkname.maxLength &&
        error.push("ຂໍ້ມູນຫຼາຍສຸດບໍ່ໃຫ້ກາຍ 50 ຕົວອັກສອນ");
      !this.$v.Bkname.required && error.push("ປ້ອນຂໍ້ມູນທະນາຄານກ່ອນ");
      return error;
    },
    AccountError() {
      const error = [];
      if (!this.$v.BkAccount.$dirty) return error;
      !this.$v.BkAccount.maxLength &&
        error.push("ຂໍ້ມູນຫຼາຍສຸດບໍ່ໃຫ້ກາຍ 100 ຕົວອັກສອນ");
      !this.$v.BkAccount.required && error.push("ປ້ອນຂໍ້ມູນບັນຊີກ່ອນ");
      return error;
    },
    NumbericError() {
      const error = [];
      if (!this.$v.Bknumberic.$dirty) return error;
      !this.$v.Bknumberic.maxLength &&
        error.push("ຂໍ້ມູນຫຼາຍສຸດບໍ່ໃຫ້ກາຍ 100 ຕົວອັກສອນ");
      !this.$v.Bknumberic.required && error.push("ປ້ອນຂໍ້ມູນເລກບັນຊີກ່ອນ");
      return error;
    },
    StateError() {
      const error = [];
      if (!this.$v.BkState.$dirty) return error;
      !this.$v.BkState.maxLength &&
        error.push("ຂໍ້ມູນຫຼາຍສຸດບໍ່ໃຫ້ກາຍ 15 ຕົວອັກສອນ");
      !this.$v.BkState.required && error.push("ປ້ອນຂໍ້ມູນທະນາຄານກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
