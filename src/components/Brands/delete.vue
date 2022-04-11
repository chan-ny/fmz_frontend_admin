<template>
  <div>
    <!-- dialog delete -->
    <v-dialog v-model="dialogDelete" max-width="450px" persistent>
      <v-card>
        <v-card-title class="headline"
          ><b class="font"
            >ເຈົ້າຕ້ອງການທີ່ຈະລືບຂໍ້ມູນແບຣນຫຼືບໍ? ID = {{ bId }}
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
import BrandService from "@/service/BrandService";
import Notify from "@/notify/notifycation";

export default {
  props: {
    dialogDelete: Boolean,
    brandId: Object
  },
  data() {
    return {
      bId: 0
    };
  },
  methods: {
    headleClose() {
      this.$emit("closeForm");
    },
    //remove brand
    async removebrand() {
      try {
        let del = await BrandService.remove(this.bId);
        Notify.showMessage("success", del.data.message, 3000);
        this.$emit("deleteSuccess");
        this.$emit("closeForm");
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດລືບຂໍ້ມູນແບຣນໃນຕອນນີ້", 2000);
      }
    }
  },

  watch: {
    brandId() {
      if (this.brandId != null) {
        this.bId = this.brandId.bId;
      }
    }
  }
};
</script>
<style></style>
