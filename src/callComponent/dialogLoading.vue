<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <v-card color="white" dark>
          <v-card-text tile class="red--text">
            <div class="ma-2">ກະລຸນາລໍຖ້າປະໂຫຼດຂໍ້ມູນ ກ່ອນ</div>
            <v-progress-linear
              color="deep-purple accent-4"
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: true
    };
  }
};
</script>
<style></style>
