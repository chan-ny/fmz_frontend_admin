<template>
  <div>
    <v-dialog v-model="dialogForm" max-width="450px" persistent>
      <v-card>
        <v-card-title class="headline"
          ><b class="font"
            >ເຈົ້າຕ້ອງການທີ່ຈະລືບຂໍ້ມູນສິນຄ້າຫຼືບໍ? ID = {{ productId }}
          </b></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1 " text @click="headleClose">ຍົກເລີກ</v-btn>
          <v-btn color="blue darken-1" text @click="deleteProduct"
            >ຕົກລົງ</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProductServer from "@/service/Products";
import Notify from "@/notify/notifycation";

export default {
  props: {
    dialogForm: Boolean,
    productItem: Object
  },
  data() {
    return {
      productId: 0
    };
  },
  methods: {
    headleClose() {
      this.$emit("closeForm");
    },
    async deleteProduct() {
      try {
        let del = await ProductServer.remove(this.productId);
        Notify.showMessage("success", del.data.message, 3000);
        this.$emit("closeForm");
        this.$emit("deleteSuccess");
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາລຶບຂໍ້ມູນສິນຄ້າ", 4000);
      }
    }
  },
  watch: {
    productItem() {
      if (this.productItem != null) {
        this.productId = this.productItem.pdId;
      }
    }
  }
};
</script>
<style></style>
