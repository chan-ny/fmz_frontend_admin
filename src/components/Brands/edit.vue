<template>
  <div>
    <v-dialog
      v-model="dialogfromEdit"
      scrollable
      persistent
      :overlay="false"
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="headline"><div class="font">ແກ້ໄຂແບຣນສິນຄ້າ</div></span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <Form model="POST">
              <div>
                <v-text-field
                  v-model="brandId"
                  :error-messages="brandIdError"
                  :counter="5"
                  disabled
                  label="ລະຫັດແບຣນ"
                  required
                  @input="$v.brandId.$touch()"
                  @blur="$v.brandId.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="brandName"
                  :error-messages="brandNameError"
                  :counter="50"
                  label="ຊື່ແບຣນ"
                  required
                  @input="$v.brandName.$touch()"
                  @blur="$v.brandName.$touch()"
                ></v-text-field>
                <v-select
                  v-model="brandState"
                  :items="items"
                  :error-messages="brandStateError"
                  label="ສະຖານະການເຮັດວຽກ"
                  required
                  @input="$v.brandState.$touch()"
                  @blur="$v.brandState.$touch()"
                ></v-select>
              </div>
            </Form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="mr-2">
            <v-btn color="warning darken-1" @click="headleClose">
              ຍົກເລີກ
            </v-btn>
          </div>
          <div>
            <v-btn color="green darken-1" dark @click="updateBrand">
              ປ່ຽນແປ່ງ
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Notify from "@/notify/notifycation";
import BrandService from "@/service/BrandService";
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  // validate
  mixins: [validationMixin],
  validations: {
    brandId: { required, minLength: minLength(1), maxLength: maxLength(5) },
    brandName: { required, minLength: minLength(6), maxLength: maxLength(50) },
    brandState: { required }
  },

  props: {
    dialogfromEdit: Boolean,
    brandItem: Object
  },

  data() {
    return {
      brandId: 0,
      brandName: "",
      brandState: "",
      items: ["on", "off"]
    };
  },
  methods: {
    headleClose() {
      this.$emit("closeForm");
    },
    hesdleClearform() {
      (this.brandName = ""), (this.brandState = "");
    },

    // update brands
    async updateBrand() {
      this.dialogform = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.showAlert(
          "ເກີດຂໍ້ມູນຜີດພາດ",
          "ກະລຸນາປ້ອນຂໍ້ມູນໃຫມ່ກ່ອນແລ້ວລອງໄໝ່",
          "error"
        );
      } else {
        try {
          let upd = await BrandService.update({
            bId: this.brandId,
            bname: this.brandName,
            bstate: this.brandState
          });
          Notify.showMessage("success", upd.data.message, 3000);
          this.hesdleClearform();
          this.$emit("closeForm");
          this.$emit("editSuccess");
        } catch (error) {
          Notify.showMessage(
            "error",
            "ກະລຸນາປ້ອນຂໍ້ມູນໃຫມ່ກ່ອນແລ້ວລອງໄໝ່",
            2000
          );
        }
      }
    }
  },
  watch: {
    brandItem() {
      if (this.brandItem != null) {
        this.brandId = this.brandItem.bId;
        this.brandName = this.brandItem.bname;
        this.brandState = this.brandItem.bstate;
      }
    }
  },
  computed: {
    brandIdError() {
      const errors = [];
      if (!this.$v.brandId.$dirty) return errors;
      !this.$v.brandId.minLength &&
        errors.push("ໄອດີຂອງແບຣນສີນຄ້າຕ້ອງຫຼາຍກວ່າ 0 ເທົ່ານັ້ນ ");
      !this.$v.brandId.maxLength &&
        errors.push("ໄອດີຂອງແບຣນສີນຄ້າຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 5 ຕົວອັກສອນ ");
      !this.$v.brandId.required && errors.push("ເພີ່ມຂໍ້ມູນໄອດີກ່ອນ!!!");
      return errors;
    },
    brandNameError() {
      const errors = [];
      if (!this.$v.brandName.$dirty) return errors;
      !this.$v.brandName.minLength &&
        errors.push("ຂໍ້ມູນແບຣນສິນຄ້າຕ້ອງຫຼາຍກວ່າ 6 ຕົວອັກສອນ");
      !this.$v.brandName.maxLength &&
        errors.push("ຂໍ້ມູນແບຣນສິນຄ້າຕົວອັກສອນຫຼາຍສຸດບໍ່ກເກີນ 50 ຕົວອັກສອນ");
      !this.$v.brandName.required &&
        errors.push("ເພີ່ມຂໍ້ມູນແບຣນສິນຄ້າກ່ອນ !!!");
      return errors;
    },
    brandStateError() {
      const errors = [];
      if (!this.$v.brandState.$dirty) return errors;
      !this.$v.brandState.required &&
        errors.push("ເພີ່ມຂໍ້ມູນສະຖານະການເຮັດວຽກກ່ອນ !!!");
      return errors;
    }
  }
};
</script>
<style></style>
