<template>
  <div>
    <v-dialog v-model="dialogForm" max-width="460px" persistent>
      <v-card>
        <v-card-title
          ><b class="font fontsize20"
            >ເຈົ້າຕ້ອງການທີ່ຈະລືບຂໍ້ມູນຂະໜາດສິນຄ້າຫຼືບໍ? ID = {{ sizeId }}
          </b></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1 " text @click="headleClose">ຍົກເລີກ</v-btn>
          <v-btn color="blue darken-1" text @click="deleteStorage"
            >ຕົກລົງ</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProductService from "@/service/Products";
import Notify from "@/notify/notifycation";
export default {
  props: {
    dialogForm: Boolean,
    ItemStorage: Object
  },
  data() {
    return {
      sizeId: 0,
      srId: 0
    };
  },
  methods: {
    headleClose() {
      this.$emit("closeForm");
    },
    async deleteStorage() {
      try {
        let del = await ProductService.removeStorage(this.srId);
        Notify.showMessage("success", del.data.message, 3000);
        this.$emit("closeForm");
        this.$emit("delSuccess");
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດລືບຂໍ້ມູນຂະໜາດ", 4000);
      }
    }
  },
  watch: {
    ItemStorage() {
      if (this.ItemStorage != null) {
        this.sizeId = this.ItemStorage.sId;
        this.srId = this.ItemStorage.srId;
        // console.log( this.srId);
      }
    }
  }
};
</script>
<style></style>
