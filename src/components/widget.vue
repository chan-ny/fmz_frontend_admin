<template>
  <v-card class="widget-card">
    <v-card-text class="pa-0">
      <v-container class="pa-0">
        <div class="layout row ma-0" :style="{ backgroundColor: color }">
          <div class="sm4 xs4 flex">
            <div class="layout column ma-0 justify-center align-center">
              <v-icon
                class="ml-6"
                size="100px"
                color="white"
                style="opacity: 0.8;"
                >{{ icon }}</v-icon
              >
            </div>
          </div>
          <div
            class="layout column ml-4 mt-n1 justify-center "
            style="color: white;"
          >
            <span class="font">{{ subTitle }}</span>
            <div class="fontsize30 ma-1">{{ title }}</div>
            <span class="">{{ supTitle }}</span>
          </div>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    supTitle: {
      type: String,
      required: false
    },
    subTitle: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    }
  },

  data() {
    return {};
  }
};
</script>

<style>
.widget-card {
  font-family: "Noto Sans lao" !important;
  border-radius: 5%;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.21);
  background-color: transparent;
}
</style>
