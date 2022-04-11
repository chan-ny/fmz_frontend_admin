<template>
  <div>
    <v-dialog
      v-model="dislogForm"
      scrollable
      persistent
      :overlay="false"
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            <div class="font">ແກ້ໄຂສີຂອງສິນຄ້າ</div>
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
                  v-model="colourId"
                  :error-messages="colourIdError"
                  :counter="5"
                  required
                  label="ລະຫັດສິ"
                  id="id"
                  @input="$v.colourId.$touch()"
                  @blur="$v.colourId.$touch()"
                ></v-text-field>
                <v-text-field
                  v-model="colourName"
                  :error-messages="colourNameError"
                  :counter="50"
                  required
                  label="ຊື່ຂອງສີ"
                  @input="$v.colourName.$touch()"
                  @blur="$v.colourName.$touch()"
                ></v-text-field>
                <v-select
                  v-model="colourState"
                  :items="item"
                  :error-messages="colourStateError"
                  required
                  label="ສະຖານະເຮັດວຽກ"
                  @input="$v.colourState.$touch()"
                  @blur="$v.colourState.$touch()"
                ></v-select>
              </div>
            </Form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div class="mr-2">
            <v-btn color="warning darken-1" @click="headleClode">ຍົກເລີກ</v-btn>
          </div>
          <div>
            <v-btn color="green darken-1" dark @click="updateColour">
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
import ColourService from "@/service/ColourService";
import Notify from "@/notify/notifycation";
export default {
  mixins: [validationMixin],
  validations: {
    colourId: { required, minLength: minLength(1), maxLength: maxLength(5) },
    colourName: { required, minLength: minLength(3), maxLength: maxLength(50) },
    colourState: { required, minLength: minLength(2), maxLength: maxLength(8) }
  },

  props: {
    dislogForm: Boolean,
    colurItem: Object
  },
  data() {
    return {
      colourId: "",
      colourName: "",
      colourState: "",
      item: ["on", "off"]
    };
  },
  methods: {
    headleClode() {
      this.$emit("CloseForm");
    },
    async updateColour() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        Notify.showMessage("error", "ກະລຸນາປ້ອນຂໍ້ມູນໃຫມ່ກ່ອນແລ້ວລອງໄໝ່", 4000);
      } else {
        try {
          let save = await ColourService.update({
            cId: this.colourId,
            cname: this.colourName,
            cstate: this.colourState
          });
          Notify.showMessage("success", save.data.message, 4000);
          this.$emit("CloseForm");
          this.$emit("editSuccess");
        } catch (error) {
          Notify.showMessage("error", "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນສີ", 4000);
        }
      }
    }
  },
  watch: {
    colurItem() {
      if (this.colurItem != null) {
        this.colourId = this.colurItem.cId;
        this.colourName = this.colurItem.cname;
        this.colourState = this.colurItem.cstate;
      }
    }
  },
  computed: {
    // validation
    colourIdError() {
      const error = [];
      if (!this.$v.colourId.$dirty) return error;
      !this.$v.colourId.minLength &&
        error.push("ໄອດີສີຂອງສິນຄ້າຕ້ອງຫຼາຍກວ່າ 0 ຕົວອັກສອນ");
      !this.$v.colourId.maxLength &&
        error.push("ໄອດີສີຂອງສິນຄ້າຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 5 ຕົວອັກສອນ");
      !this.$v.colourId.required && error.push("ເພີ່ມຂໍ້ມູນໄອດີກ່ອນ");
      return error;
    },
    colourNameError() {
      const error = [];
      if (!this.$v.colourName.$dirty) return error;
      !this.$v.colourName.minLength &&
        error.push("ຂໍ້ມູນສີຂອງສິນຄ້າຕ້ອງຫຼາຍກວ່າ 3 ຕົວອັກສອນ");
      !this.$v.colourName.maxLength &&
        error.push("ຂໍ້ມູນສີຂອງສິນຄ້າຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 50 ຕົວອັກສອນ");
      !this.$v.colourName.required && error.push("ເພີ່ມຂໍ້ມູນສີກ່ອນ");
      return error;
    },
    colourStateError() {
      const error = [];
      if (!this.$v.colourState.$dirty) return error;
      !this.$v.colourState.minLength &&
        error.push("ຂໍ້ມູນຂອງສະຖານະເຮັດວຽກຕ້ອງຫຼາຍກວ່າ 2 ຕົວອັກສອນ");
      !this.$v.colourState.maxLength &&
        error.push("ຂໍ້ມູນຂອງສະຖານະເຮັດວຽກຕ້ອງໃຫ່ຍສູດບໍ່ເກີນ 8 ຕົວອັກສອນ");
      !this.$v.colourState.required &&
        error.push("ເພີ່ມຂໍ້ມູນສະຖານະເຮັດວຽກກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
