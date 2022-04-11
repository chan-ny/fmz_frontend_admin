<template>
  <div>
    <v-btn icon color="success" @click="dialog = true">
      <v-icon>mdi-plus-circle</v-icon>
    </v-btn>
    <div>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class=" grey lighten-2">
            ເພີ່ມຜູ້ໃຊ້
          </v-card-title>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-btn color="primary" text>
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>
<style></style>
