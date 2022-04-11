<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <h4>ຮູບແລກ</h4>
        <v-card elevation="14">
          <div v-if="!preview" @click="selectImage">
            <v-img height="100%" src="@/assets/plus image.jpeg"></v-img>
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
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <h4>ຮູບລາຍການ ທີ່ 1</h4>
        <v-card elevation="14">
          <div v-if="!previewone" @click="selectImageOne">
            <v-img height="100%" src="@/assets/plus image.jpeg"></v-img>
          </div>
          <div v-else @click="selectImageOne">
            <v-img contain height="100%" :src="previewone"></v-img>
          </div>
          <input
            style="display: none"
            type="file"
            ref="fileinputOne"
            accept="image/*"
            @change="priviewImageOne"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <h4>ຮູບລາຍການ ທີ່ 2</h4>
        <v-card elevation="14">
          <div v-if="!previewtwo" @click="selectImageTwo">
            <v-img height="100%" src="@/assets/plus image.jpeg"></v-img>
          </div>
          <div v-else @click="selectImageTwo">
            <v-img contain height="100%" :src="previewtwo"></v-img>
          </div>
          <input
            style="display: none"
            type="file"
            ref="fileinputTwo"
            accept="image/*"
            @change="priviewImagetwo"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    clearForm: Boolean
  },
  data() {
    return {
      preview: null,
      image:null,
      previewone: null,
      previewtwo: null,
      imageone: null,
      imagetwo: null,
      lilstImage: []
    };
  },
  methods: {
    /// point image
    selectImage() {
      this.$refs.fileinput.click();
    },
    selectImageOne() {
      this.$refs.fileinputOne.click();
    },
    selectImageTwo() {
      this.$refs.fileinputTwo.click();
    },
    //give iamge and send image main
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

    //give iamge and send image one
    priviewImageOne(event) {
      var input = event.target;
      if (input.files) {
        var resder = new FileReader();
        resder.onload = e => {
          this.previewone = e.target.result;
        };
        this.imageone = input.files[0];
        resder.readAsDataURL(input.files[0]);
      }
    },

    //give iamge and send image two
    priviewImagetwo() {
      var input = event.target;
      if (input.files) {
        var resder = new FileReader();
        resder.onload = e => {
          this.previewtwo = e.target.result;
        };
        this.imagetwo = input.files[0];
        resder.readAsDataURL(input.files[0]);
        this.lilstImage.push(this.imageone, this.imagetwo);

        this.$emit("photos_sub", this.lilstImage);
      }
    }
  },
  watch: {
    /// clearForm
    clearForm() {
      if (this.clearForm == true) {
        this.preview = null;
        this.image = null;
        this.previewone = "";
        this.previewtwo = "";
        this.imageone = "";
        this.imagetwo = "";
        this.lilstImage = [];
      }
    }
  }
};
</script>
<style></style>
