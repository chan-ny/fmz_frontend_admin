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
            <div class="font">ແກ້ໄຂປະເພດສິນຄ້າ</div>
          </span>
        </v-card-title>
        <v-divider></v-divider>

        <!-- from data -->
        <v-card-text>
          <v-container>
            <Form model="POST">
              <div>
                <v-text-field
                  disabled
                  v-model="categoryId"
                  :error-messages="categoryIdError"
                  :counter="5"
                  required
                  label="ລະຫັດປະເພດ"
                  id="id"
                  @input="$v.categoryId.$touch()"
                  @blur="$v.categoryId.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="categoryName"
                  :error-messages="categoryNameError"
                  :counter="100"
                  required
                  label="ຊື່ປະເພດສິນຄ້າ"
                  @input="$v.categoryName.$touch()"
                  @blur="$v.categoryName.$touch()"
                ></v-text-field>
                <v-select
                  v-model="categoryState"
                  :items="item"
                  :error-messages="categoryStateError"
                  required
                  label="ສະຖານະເຮັດວຽກ"
                  @input="$v.categoryState.$touch()"
                  @blur="$v.categoryState.$touch()"
                ></v-select>
              </div>
            </Form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="mr-2">
            <v-btn color="warning darken-1" @click="hesdleClose">ຍົກເລີກ</v-btn>
          </div>
          <div>
            <v-btn color="green darken-1" dark @click="updateCategory">
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
import CategoryServiec from "@/service/CategoryService";
import Notify from "@/notify/notifycation";

export default {
  //validation
  mixins: [validationMixin],
  validations: {
    categoryId: { required, minLength: minLength(1), maxLength: maxLength(5) },
    categoryName: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(100)
    },
    categoryState: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(8)
    }
  },
  props: {
    dialogForm: Boolean,
    categoryItem: Object
  },
  data() {
    return {
      categoryId: "",
      categoryName: "",
      categoryState: "",
      item: ["on", "off"]
    };
  },
  methods: {
    hesdleClose() {
      this.$emit("closeForm");
    },
    async updateCategory() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage(
          "error",
          "ກະລຸນາປ້ອນຂໍ້ມູນໃຫມ່ກ່ອນ ແລ້ວລອງໄໝ່",
          4000
        );
      } else {
        try {
          let update = await CategoryServiec.update({
            ctId: this.categoryId,
            ctname: this.categoryName,
            ctstate: this.categoryState
          });
          Notify.showMessage("success", update.data.message, 3000);
          this.$emit("closeForm");
          this.$emit("editSuccess");
        } catch (error) {
          Notify.showMessage("error", "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນປະເພດສິນຄ້າ", 4000);
        }
      }
    }
  },
  watch: {
    categoryItem() {
      if (this.categoryItem != null) {
        this.categoryId = this.categoryItem.ctId;
        this.categoryName = this.categoryItem.ctname;
        this.categoryState = this.categoryItem.ctstate;
      }
    }
  },
  computed: {
    // validation
    categoryIdError() {
      const error = [];
      if (!this.$v.categoryId.$dirty) return error;
      !this.$v.categoryId.minLength &&
        error.push("ໄອດີຂອງປະເພດສີນຄ້າຕ້ອງຫຼາຍກວ່າ 0 ຕົວອັກສອນ");
      !this.$v.categoryId.maxLength &&
        error.push("ໄອດີຂອງປະເພດສີນຄ້າຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 5 ຕົວອັກສອນ");
      !this.$v.categoryId.required && error.push("ເພີ່ມຂໍ້ມູນໄອດີກ່ອນ");
      return error;
    },
    categoryNameError() {
      const error = [];
      if (!this.$v.categoryName.$dirty) return error;
      !this.$v.categoryName.minLength &&
        error.push("ຂໍ້ມູນຂອງປະເພດສີນຄ້າຕ້ອງຫຼາຍກວ່າ 1 ຕົວອັກສອນ");
      !this.$v.categoryName.maxLength &&
        error.push("ຂໍ້ມູນຂອງປະເພດສີນຄ້າຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 15 ຕົວອັກສອນ");
      !this.$v.categoryName.required && error.push("ເພີ່ມຂໍ້ມູນຊື່ປະເພດກ່ອນ");
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
    categoryStateError() {
      const error = [];
      if (!this.$v.categoryState.$dirty) return error;
      !this.$v.categoryState.minLength &&
        error.push("ຂໍ້ມູນຂອງສະຖານະເຮັດວຽກຕ້ອງຫຼາຍກວ່າ 2 ຕົວອັກສອນ");
      !this.$v.categoryState.maxLength &&
        error.push("ຂໍ້ມູນຂອງສະຖານະເຮັດວຽກຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 8 ຕົວອັກສອນ");
      !this.$v.categoryState.required &&
        error.push("ເພີ່ມຂໍ້ມູນສະຖານະເຮັດວຽກກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
