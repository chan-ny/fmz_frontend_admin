<template>
  <div>
    <!-- dialog delete -->
    <v-dialog v-model="dialogDelete" max-width="500px" persistent>
      <v-card>
        <v-card-title class="headline"
          ><b class="font"
            >ເຈົ້າຕ້ອງການທີ່ຈະລືບຂໍ້ມູນຄີວອາໂຄດຫຼືບໍ? ID = {{ storeId }}
          </b></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1 " text @click="headleClose">ຍົກເລີກ</v-btn>
          <v-btn color="blue darken-1" text @click="removebrand">ຕົກລົງ</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import StoreService from "@/service/StoreService";

import Notify from "@/notify/notifycation";

export default {
  props: {
    dialogDelete: Boolean,
    storeID: Object
  },
  data() {
    return {
      storeId: 0
    };
  },
  methods: {
    headleClose() {
      this.$emit("closeForm");
    },
    //remove brand
    async removebrand() {
      try {
        let del = await StoreService.removestore(this.storeId);
        Notify.showMessage("success", del.data.message, 3000);
        this.$emit("deleteSuccess");
        this.$emit("closeForm");
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດລືບຂໍ້ມູນຮ້ານຕອນນີ້", 2000);
      }
    }
  },

  watch: {
    storeID() {
      if (this.storeID != null) {
        this.storeId = this.storeID.storeId;
      }
    }
  }
};
</script>
<style></style>
