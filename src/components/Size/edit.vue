<template>
  <div>
    <v-dialog
      v-model="dialogForm"
      scrollable
      persistent
      :overlay="false"
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            <div class="font">ແກ້ໄຂຂະໜາດສິນຄ້າ</div>
          </span>
        </v-card-title>
        <v-divider></v-divider>

        <!-- from data -->
        <v-card-text>
          <v-container>
            <Form model="POST">
              <div>
                <v-text-field
                  v-model="sizeId"
                  :error-messages="sizesIdError"
                  :counter="5"
                  disabled
                  required
                  label="ລະຫັດຂະໜາດ"
                  id="id"
                  @input="$v.sizeId.$touch()"
                  @blur="$v.sizeId.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="sizeName"
                  :error-messages="sizesNameError"
                  :counter="15"
                  required
                  label="ຊື່ຂະໜາດສິນຄ້າ"
                  @input="$v.sizeName.$touch()"
                  @blur="$v.sizeName.$touch()"
                ></v-text-field>
                <v-textarea
                  v-model="sizeDetail"
                  :error-messages="sizesDetailError"
                  required
                  label="ລາຍລະອຽດ"
                  @input="$v.sizeDetail.$touch()"
                  @blur="$v.sizeDetail.$touch()"
                  outlined
                ></v-textarea>
                <v-select
                  v-model="sizeState"
                  :items="item"
                  :error-messages="sizesStatusError"
                  required
                  label="ສະຖານະເຮັດວຽກ"
                  @input="$v.sizeState.$touch()"
                  @blur="$v.sizeState.$touch()"
                ></v-select>
              </div>
            </Form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="mr-2">
            <v-btn color="warning darken-1" @click="headleClose">ຍົກເລີກ</v-btn>
          </div>
          <div>
            <v-btn color="green darken-1" dark @click="updateSize">
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
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import SizeServiec from "@/service/SizeServies";

import Notify from "@/notify/notifycation";
export default {
  //validation
  mixins: [validationMixin],
  validations: {
    sizeId: { required, minLength: minLength(1), maxLength: maxLength(5) },
    sizeName: { required, minLength: minLength(1), maxLength: maxLength(15) },
    sizeDetail: { required, minLength: minLength(6) },
    sizeState: { required, minLength: minLength(2), maxLength: maxLength(8) }
  },
  props: {
    dialogForm: Boolean,
    sizeItem: Object
  },
  data() {
    return {
      sizeId: "",
      sizeName: "",
      sizeDetail: "",
      sizeState: "",
      item: ["on", "off"]
    };
  },
  methods: {
    headleClose() {
      this.$emit("CloseForm");
    },
    async updateSize() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage("error", "ກະລຸນາປ້ອນຂໍ້ມູນໃຫມ່ກ່ອນແລ້ວລອງໄໝ່", 4000);
      } else {
        try {
          let save = await SizeServiec.update({
              "sId": this.sizeId,
              "sname": this.sizeName,
              "sdetail": this.sizeDetail,
              "state": this.sizeState
          });
          Notify.showMessage("success", save.data.message, 3000);
          this.$emit("CloseForm");
          this.$emit("editSuccess");
        } catch (error) {
          Notify.showMessage("error", "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນຂະໜາດສິນຄ້າ", 3000);
        }
      }
    }
  },
  watch: {
    sizeItem() {
      if (this.sizeItem != null) {
        this.sizeId = this.sizeItem.sId;
        this.sizeName = this.sizeItem.sname;
        this.sizeDetail = this.sizeItem.sdetail;
        this.sizeState = this.sizeItem.state;
      }
    }
  },
  computed: {
    // validation
    sizesIdError() {
      const error = [];
      if (!this.$v.sizeId.$dirty) return error;
      !this.$v.sizeId.minLength &&
        error.push("ໄອດີຂອງຂະໜາດສີນຄ້າຕ້ອງຫຼາຍກວ່າ 0 ຕົວອັກສອນ");
      !this.$v.sizeId.maxLength &&
        error.push("ໄອດີຂອງຂະໜາດສີນຄ້າຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 5 ຕົວອັກສອນ");
      !this.$v.sizeId.required && error.push("ເພີ່ມຂໍ້ມູນໄອດີກ່ອນ");
      return error;
    },
    sizesNameError() {
      const error = [];
      if (!this.$v.sizeName.$dirty) return error;
      !this.$v.sizeName.minLength &&
        error.push("ຂໍ້ມູນຂອງຂະໜາດສີນຄ້າຕ້ອງຫຼາຍກວ່າ 1 ຕົວອັກສອນ");
      !this.$v.sizeName.maxLength &&
        error.push("ຂໍ້ມູນຂອງຂະໜາດສີນຄ້າຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 15 ຕົວອັກສອນ");
      !this.$v.sizeName.required && error.push("ເພີ່ມຂໍ້ມູນຊື່ຂະໜາດກ່ອນ");
      return error;
    },
    sizesDetailError() {
      const error = [];
      if (!this.$v.sizeDetail.$dirty) return error;
      !this.$v.sizeDetail.minLength &&
        error.push("ຂໍ້ມູນຂອງລາຍລະອຽດສີນຄ້າຕ້ອງຫຼາຍກວ່າ 6 ຕົວອັກສອນ");
      !this.$v.sizeDetail.required && error.push("ເພີ່ມຂໍ້ມູນລາຍລະອຽດກ່ອນ");
      return error;
    },
    sizesStatusError() {
      const error = [];
      if (!this.$v.sizeState.$dirty) return error;
      !this.$v.sizeState.minLength &&
        error.push("ຂໍ້ມູນຂອງສະຖານະເຮັດວຽກຕ້ອງຫຼາຍກວ່າ 2 ຕົວອັກສອນ");
      !this.$v.sizeState.maxLength &&
        error.push("ຂໍ້ມູນຂອງສະຖານະເຮັດວຽກຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 8 ຕົວອັກສອນ");
      !this.$v.sizeState.required && error.push("ເພີ່ມຂໍ້ມູນສະຖານະເຮັດວຽກກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
