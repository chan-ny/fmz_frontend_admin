<template>
  <div>
    <v-row justify="center">
      <v-col>
        <v-card
          class="mx-auto mt-15 font"
          color="#E0E0E0"
          max-width="500px"
          outlined
        >
          <div align="center" class="fontsize20 ma-2">
            ເພີ່ມ Admin

            <v-divider class="mt-2"></v-divider>
            <div class="mt-5">
              <v-avatar color="indigo" size="100">
                <div v-if="!preview" @click="selectImage">
                  <v-img
                    class="mt-3"
                    width="110px"
                    src="@/assets/plus image.jpeg"
                  ></v-img>
                </div>
                <div v-else @click="selectImage">
                  <v-img
                    contain
                    class="mt-3"
                    width="110px"
                    :src="preview"
                  ></v-img>
                </div>
                <input
                  style="display: none"
                  type="file"
                  ref="fileinput"
                  accept="image/*"
                  @change="priviewImage"
                />
              </v-avatar>
            </div>
          </div>
          <div class="mx-8">
            <v-form>
              <v-text-field
                v-model="Fullname"
                dense
                label="ຊື່ເຕັມ:"
                outlined
                prepend-icon="mdi-account"
                :error-messages="FullnameError"
                @input="$v.Fullname.$touch()"
                @blur="$v.Fullname.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="Email"
                dense
                label="ອີເມວ:"
                prepend-icon="mdi-email"
                outlined
                :error-messages="EmailError"
                @input="$v.Email.$touch()"
                @blur="$v.Email.$touch()"
              ></v-text-field>
              <v-text-field
                dense
                v-model="Password"
                :type="showpassword ? 'text' : 'password'"
                name="password"
                label="ລະຫັດຜ່ານ"
                prepend-icon="mdi-lock"
                :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showpassword = !showpassword"
                :error-messages="PasswordError"
                @input="$v.Password.$touch()"
                @blur="$v.Password.$touch()"
                outlined
              ></v-text-field>
            </v-form>
          </div>
          <v-card-actions>
            <div class="mx-auto">
              <v-btn
                elevation="5"
                class="mr-2"
                color="#F57F17"
                tile
                dense
                dark
                @click="closeRegister"
                >ຍົກເລີກ</v-btn
              >
              <v-btn
                elevation="5"
                color="#1588E4"
                tile
                dense
                dark
                @click="headerRegister"
                >ຕົກລົງ</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],

  validations: {
    Fullname: { required },
    Email: { required, email },
    Password: { required, minLength: minLength(6), maxLength: maxLength(8) }
  },
  data() {
    return {
      preview: null,
      image: null,
      Fullname: "",
      Email: "",
      showpassword: false,
      Password: ""
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

        this.$emit("photos_main", this.image);
      }
    },
    closeRegister() {
      this.$router.push({
        name: "Login"
      });
    },
    headerRegister() {}
  },

  computed: {
    FullnameError() {
      const error = [];
      if (!this.$v.Fullname.$dirty) return error;
      !this.$v.Fullname.required && error.push("ປ້ອນຂໍ້ມູນກ່ອນ");
      return error;
    },
    EmailError() {
      const error = [];
      if (!this.$v.Email.$dirty) return error;
      !this.$v.Email.email &&
        error.push("ອີເມວບໍຖືກຕ້ອງ ຄວນເປັນແບບນີ້ email@gmail.com");
      !this.$v.Email.required && error.push("ປ້ອນອີເມວກ່ອນ");
      return error;
    },
    PasswordError() {
      const error = [];
      if (!this.$v.Password.$dirty) return error;
      !this.$v.Password.minLength &&
        error.push("ກະລຸນາປ້ອນລະຫັດ ຫຼສບກວ່າ 6 ຕົວອັກສອນ");
      !this.$v.Password.maxLength &&
        error.push("ກະລຸນາປ້ອນລະຫັດ ບໍ່ໃຫ້ກາຍ 9 ຕົວອັກສອນ");
      !this.$v.Password.required && error.push("ປ້ອນລະຫັດຜ່ານກ່ອນ");
      return error;
    }
  }
};
</script>
<style></style>
