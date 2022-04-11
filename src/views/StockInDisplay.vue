<template>
  <div>
    <v-card class="ma-2">
        <index-stockin></index-stockin>
    </v-card>
  </div>
</template>
<script>
import Index from "../components/Stockin/index";
export default {
  components: {
    "index-stockin": Index
  },
  data() {
    return {};
  }
};
</script>
<style></style>
