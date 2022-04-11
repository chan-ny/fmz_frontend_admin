<template>
  <div>
    <!-- dialog delete -->
    <v-dialog v-model="dialogForm" max-width="550px" persistent>
      <v-card>
        <v-card-title
          ><b class="font fontsize20"
            >ເຈົ້າຕ້ອງການທີ່ຈະລືບຂໍ້ມູນຜູ້ສະໜອງສິນຄ້າ ຫຼືບໍ? ID = {{ supId }}
          </b></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1 " text @click="headleClose">ຍົກເລີກ</v-btn>
          <v-btn color="blue darken-1" text @click="delSupplier">ຕົກລົງ</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Supplier from "@/service/Supplier";
import Notify from "@/notify/notifycation";
export default {
  props: {
    dialogForm: Boolean,
    supplierItem: Object
  },
  data() {
    return {
      supId: 0,
    };
  },
  methods: {
    headleClose() {
      this.$emit("closeForm");
    },
    // delete supplier
    async delSupplier() {
      try {
        let del = await Supplier.remove(this.supId);
        Notify.showMessage("success", del.data.message, 3000);
        this.$emit("closeForm");
        this.$emit("deleteSuccess");
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດລືບຂໍ້ມູນຜູ້ສະໜອງ!!!", 3000);
      }
    }
  },
  watch: {
    supplierItem() {
      if (this.supplierItem != null) {
        this.supId = this.supplierItem.supId;
      }
    }
  }
};
</script>
<style></style>
