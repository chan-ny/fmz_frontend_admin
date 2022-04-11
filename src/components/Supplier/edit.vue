<template>
  <div>
    <v-dialog
      v-model="dialogForm"
      scrollable
      persistent
      :overlay="false"
      max-width="800px"
    >
      <!-- tilte point add and edit -->
      <v-card>
        <v-card-title>
          <span class="headline">
            <div class="font">ແກ້ໄຂຜູ້ສະໜອງສິນຄ້າ</div>
          </span>
        </v-card-title>
        <v-divider></v-divider>

        <!-- from data -->
        <v-card-text>
          <v-container>
            <Form model="POST">
              <div>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="supId"
                      disabled
                      :counter="5"
                      required
                      label="ລະຫັດຂະໜາດ"
                    ></v-text-field>
                    <v-select
                      v-model="supGender"
                      :items="itemgender"
                      :error-messages="supGenderError"
                      required
                      label="ເລືອກເພດ"
                      @input="$v.supGender.$touch()"
                      @blur="$v.supGender.$touch()"
                    ></v-select>
                    <v-text-field
                      v-model="supName"
                      :error-messages="supNameError"
                      :counter="100"
                      required
                      label="່ຊື່ຜູ້ສະໜອງ"
                      @input="$v.supName.$touch()"
                      @blur="$v.supName.$touch()"
                    ></v-text-field>
                    <v-text-field
                      v-model="supTell"
                      :error-messages="supTellError"
                      :counter="15"
                      required
                      label="ເບີໂທ"
                      @input="$v.supTell.$touch()"
                      @blur="$v.supTell.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="supEmail"
                      :error-messages="supEmailError"
                      :counter="150"
                      required
                      label="ອີເມວ"
                      @input="$v.supEmail.$touch()"
                      @blur="$v.supEmail.$touch()"
                    ></v-text-field>
                    <v-textarea
                      outlined
                      v-model="supAddress"
                      :error-messages="supAddressError"
                      required
                      label="ລາຍລະອຽດທີ່ຢູ່"
                      @input="$v.supAddress.$touch()"
                      @blur="$v.supAddress.$touch()"
                    ></v-textarea>
                    <v-select
                      v-model="supState"
                      :items="item"
                      :error-messages="supStateError"
                      required
                      label="ສະຖານະເຮັດວຽກ"
                      @input="$v.supState.$touch()"
                      @blur="$v.supState.$touch()"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
            </Form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="mr-2">
            <v-btn color="warning darken-1" @click="headleColse">ຍົກເລີກ</v-btn>
          </div>
          <div>
            <v-btn color="green darken-1" dark @click="updateSupplier">
              ປ່ຽນແປ່ງ
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  email
} from "vuelidate/lib/validators";

import Supplier from "@/service/Supplier";
import Notify from "@/notify/notifycation";

export default {
  mixins: [validationMixin],
  validations: {
    supGender: { required, minLength: minLength(2), maxLength: maxLength(10) },
    supName: { required, minLength: minLength(6), maxLength: maxLength(100) },
    supTell: { required, minLength: minLength(8), maxLength: maxLength(15) },
    supAddress: { required },
    supEmail: { required, email },
    supState: { required, minLength: minLength(2), maxLength: maxLength(8) }
  },
  props: {
    dialogForm: Boolean,
    supplierItem: Object
  },
  data() {
    return {
      supId: 0,
      item: ["on", "off"],
      itemgender: ["Female", "Male"],
      supGender: "",
      supName: "",
      supTell: "",
      supAddress: "",
      supEmail: "",
      supState: ""
    };
  },
  methods: {
    headleColse() {
      this.$emit("CloseForm");
    },
    // update supplier
    async updateSupplier() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage("error", "ກະລຸນາປ້ອນຂໍ້ມູນໃຫມ່ກ່ອນ", 4000);
      } else {
        try {
          let update = await Supplier.update({
            supId: this.supId,
            supgender: this.supGender,
            supfullname: this.supName,
            suptell: this.supTell,
            supaddress: this.supAddress,
            supemail: this.supEmail,
            supstate: this.supState
          });
          Notify.showMessage("success", update.data.message, 3000);
          this.$emit("CloseForm");
          this.$emit("editSuccess");
        } catch (error) {
          Notify.showMessage("error", "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນຜູ້ສະໜອງ ກະລຸນາລອງໃໝ່", 3000);
        }
      }
    }
  },
  watch: {
    supplierItem() {
      if (this.supplierItem != null) {
        this.supId = this.supplierItem.supId;
        this.supGender = this.supplierItem.supgender;
        this.supName = this.supplierItem.supfullname;
        this.supTell = this.supplierItem.suptell;
        this.supAddress = this.supplierItem.supaddress;
        this.supEmail = this.supplierItem.supemail;
        this.supState = this.supplierItem.supstate;
      }
    }
  },
  computed: {
    supGenderError() {
      const error = [];
      if (!this.$v.supGender.$dirty) return error;
      !this.$v.supGender.minLength &&
        error.push("ຂໍ້ມູນຂອງເພດຫຼາຍກວ່າ 1 ຕົວອັກສອນ");
      !this.$v.supGender.maxLength &&
        error.push("ຂໍ້ມູນຂອງເພດຕ້ອງນ້ອຍກວ່າ 11 ຕົວອັກສອນ");
      !this.$v.supGender.required && error.push("ເພີ່ມຂໍ້ມູນກ່ອນ");
      return error;
    },
    supNameError() {
      const error = [];
      if (!this.$v.supName.$dirty) return error;
      !this.$v.supName.minLength &&
        error.push("ຂໍ້ມູນຂອງຊື່ຕ້ອງຫຼາຍກວ່າ 6 ຕົວອັກສອນ");
      !this.$v.supName.maxLength &&
        error.push("ຂໍ້ມູນຂອງຊື່ຕ້ອງນ້ອຍກວ່າ 101 ຕົວອັກສອນ");
      !this.$v.supName.required && error.push("ເພີ່ມຂໍ້ມູນກ່ອນ");
      return error;
    },

    supTellError() {
      const error = [];
      if (!this.$v.supTell.$dirty) return error;
      !this.$v.supTell.minLength &&
        error.push("ຂໍ້ມູນຂອງເບີໂທຕ້ອງຫຼາຍກວ່າ 8 ຕົວອັກສອນ");
      !this.$v.supTell.maxLength &&
        error.push("ຂໍ້ມູນຂອງເບີໂທຕ້ອງນ້ອຍກວ່າ 13 ຕົວອັກສອນ");
      !this.$v.supTell.required && error.push("ເພີ່ມຂໍ້ມູນກ່ອນ");
      return error;
    },
    supAddressError() {
      const error = [];
      if (!this.$v.supAddress.$dirty) return error;
      !this.$v.supAddress.required && error.push("ເພີ່ມຂໍ້ມູນກ່ອນ");
      return error;
    },
    supEmailError() {
      const error = [];
      if (!this.$v.supEmail.$dirty) return error;
      !this.$v.supEmail.email && error.push("ກະລຸນາປ້ອນອີເມວໃຫ້ຖືກຕ້ອງ ??");
      !this.$v.supEmail.required && error.push("ເພີ່ມຂໍ້ມູນກ່ອນ");
      return error;
    },
    supStateError() {
      const error = [];
      if (!this.$v.supState.$dirty) return error;
      !this.$v.supState.minLength &&
        error.push("ຂໍ້ມູນສະຖານະຕ້ອງຫຼາຍກວ່າ 2 ຕົວອັກສອນ");
      !this.$v.supState.maxLength &&
        error.push("ຂໍ້ມູນສະຖານະຕ້ອງນ້ອຍກວ່າ 8 ຕົວອັກສອນ");
      !this.$v.supState.required && error.push("ເພີ່ມຂໍ້ມູນກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
