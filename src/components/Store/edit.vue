<template>
  <div class="ml-4 mt-1">
    <v-dialog outlined v-model="dialogForm" persistent width="450px">
      <v-card>
        <v-card-title class="grey lighten-2">
          <div>ແກ້ໄຂຂໍ້ມູນຮ້ານ</div>
        </v-card-title>
        <v-form class="mx-4">
          <h4 class="mt-4">ຮູບໂລໂກ</h4>
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
          <input type="hidden" v-model="storeId" />
          <v-text-field
            v-model="Name"
            class="mt-2"
            dense
            solo
            label="ຊື່ຮ້ານຄ້າ"
            append-icon="mdi-store"
            :error-messages="NameError"
            @change="$v.Name.$touch"
            @blur="$v.Name.$touch"
          ></v-text-field>
          <v-text-field
            v-model="Phone"
            class="mt-n2"
            dense
            solo
            label="ເບີໂທ"
            append-icon="mdi-phone"
            :error-messages="PhoneError"
            @change="$v.Phone.$touch"
            @blur="$v.Phone.$touch"
          ></v-text-field>
          <v-text-field
            v-model="Email"
            class="mt-n2"
            dense
            solo
            label="ອີເມວ"
            append-icon="mdi-email"
            :error-messages="EmailError"
            @change="$v.Email.$touch"
            @blur="$v.Email.$touch"
          ></v-text-field>
          <v-text-field
            v-model="Website"
            class="mt-n2"
            dense
            solo
            label="ເວັບໄຊ"
            append-icon="mdi-google-chrome"
            :error-messages="WebsiteError"
            @change="$v.Website.$touch"
            @blur="$v.Website.$touch"
          ></v-text-field>
          <v-textarea
            v-model="Address"
            class="mt-n2"
            dense
            solo
            label="ທີ່ຢູ່ອື່ນໆ"
            :error-messages="AddtressError"
            @change="$v.Address.$touch"
            @blur="$v.Address.$touch"
          ></v-textarea>
          <v-select
            v-model="State"
            :items="item"
            label="ສະຖານະ"
            solo
            :error-messages="StateError"
            @change="$v.State.$touch"
            @blur="$v.State.$touch"
          ></v-select>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn dark small color="orange" @click="closedialog">ຍົກເລີກ</v-btn>
          <v-btn small color="success" @click="UpdateStore">ປຽນແປງ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

import Notify from "@/notify/notifycation";
import StoreService from "@/service/StoreService";
export default {
  mixins: [validationMixin],
  validations: {
    Name: { required, maxLength: maxLength(50) },
    Phone: { required, maxLength: maxLength(15) },
    Email: { required, maxLength: maxLength(50) },
    Website: { required, maxLength: maxLength(30) },
    Address: { required },
    State: { required, maxLength: maxLength(15) }
  },
  props: {
    dialogForm: Boolean,
    storeData: Object
  },
  data() {
    return {
      preview: null,
      image: null,
      storeId: "",
      Name: "",
      Phone: "",
      Email: "",
      Website: "",
      Address: "",
      State: "",
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
    async UpdateStore() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage("error", "ຂໍ້ມູນບໍ່ຄົບຖ້ວນ ກະລຸນາລອງໄໝ່", 3000);
      } else {
        try {
          let format = new FormData();
          format.append("storeId", this.storeId);
          format.append("store_name", this.Name);
          format.append("store_phone", this.Phone);
          format.append("store_email", this.Email);
          format.append("store_website", this.Website);
          format.append("store_address", this.Address);
          format.append("store_image", this.image);
          format.append("store_state", this.State);
          const config = {
            hesders: { "content-type": "multipart/form-data" }
          };
          let save = await StoreService.updateStore(format, config);
          Notify.showMessage("success", save.data.message, 3000);
          this.$emit("sucess");
          this.$emit("closedialog");

        } catch (error) {
          Notify.showMessage(
            "error",
            "ຂໍ້ມູນບໍ່ສາມາດແກ້ໄຂ ກະລຸນາລອງໄໝ່",
            3000
          );
        }
      }
    },
    closedialog() {
      this.$emit("closedialog");
    }
  },
  watch: {
    storeData() {
      if (this.storeData != null) {
        this.storeId = this.storeData.storeId;
        this.Name = this.storeData.store_name;
        this.Phone = this.storeData.store_phone;
        this.Email = this.storeData.store_email;
        this.Website = this.storeData.store_website;
        this.Address = this.storeData.store_address;
        this.State = this.storeData.store_state;
        this.preview =
          "http://127.0.0.1:8000/storage/images/store/" +
          this.storeData.store_image.replace(/['"]/g, "");
      }
    }
  },
  computed: {
    NameError() {
      const error = [];
      if (!this.$v.Name.$dirty) return error;
      !this.$v.Name.maxLength &&
        error.push("ຂໍ້ມູນຫຼາຍສຸດບໍ່ໃຫ້ກາຍ 50 ຕົວອັກສອນ");
      !this.$v.Name.required && error.push("ປ້ອນຂໍ້ມູນຮາ້ນກ່ອນ");
      return error;
    },
    PhoneError() {
      const error = [];
      if (!this.$v.Phone.$dirty) return error;
      !this.$v.Phone.maxLength &&
        error.push("ຂໍ້ມູນຫຼາຍສຸດບໍ່ໃຫ້ກາຍ 15 ຕົວອັກສອນ");
      !this.$v.Phone.required && error.push("ປ້ອນຂໍ້ມູນເບີໂທກ່ອນ");
      return error;
    },
    EmailError() {
      const error = [];
      if (!this.$v.Email.$dirty) return error;
      !this.$v.Email.maxLength &&
        error.push("ຂໍ້ມູນຫຼາຍສຸດບໍ່ໃຫ້ກາຍ 50 ຕົວອັກສອນ");
      !this.$v.Email.required && error.push("ປ້ອນຂໍ້ມູນອີເມວກ່ອນ");
      return error;
    },
    WebsiteError() {
      const error = [];
      if (!this.$v.Website.$dirty) return error;
      !this.$v.Website.maxLength &&
        error.push("ຂໍ້ມູນຫຼາຍສຸດບໍ່ໃຫ້ກາຍ 30 ຕົວອັກສອນ");
      !this.$v.Website.required && error.push("ປ້ອນຂໍ້ມູນເວັບກ່ອນ");
      return error;
    },
    AddtressError() {
      const error = [];
      if (!this.$v.Address.$dirty) return error;
      !this.$v.Address.required && error.push("ປ້ອນຂໍ້ມູນທີ່ຢູ່ຮ້ານກ່ອນ");
      return error;
    },
    StateError() {
      const error = [];
      if (!this.$v.State.$dirty) return error;
      !this.$v.State.required && error.push("ປ້ອນຂໍ້ມູນສະຖານະກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
