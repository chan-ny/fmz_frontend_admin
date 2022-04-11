<template>
  <div>
    <!-- dialog delete -->
    <v-dialog v-model="dialogForm" max-width="480px" persistent>
      <v-card>
        <v-card-title class="headline"
          ><b class="font"
            >ເຈົ້າຕ້ອງການທີ່ຈະລືບຂໍ້ມູນປະເພດຫຼືບໍ? ID =
            {{ categoryId }}
          </b></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1 " text @click="headleClose">ຍົກເລີກ</v-btn>
          <v-btn color="blue darken-1" text @click="deleteCategory"
            >ຕົກລົງ</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Notify from "@/notify/notifycation";
import CategoryServiec from "@/service/CategoryService";

export default {
  props: {
    dialogForm: Boolean,
    categoryItem: Object
  },
  data() {
    return {
      categoryId: 0
    };
  },
  methods: {
    headleClose() {
      this.$emit("CloseForm");
    },
    async deleteCategory() {
      try {
        let remove = await CategoryServiec.remove(this.categoryId);
        Notify.showMessage("success", remove.data.message, 3000);
        this.$emit("CloseForm");
        this.$emit("delSuccess");
      } catch (error) {
        Notify.showMessage("erorr", "ບໍ່ສາມາດລືບຂໍ້ມູນປະເພດສິນຄ້າ", 3000);
      }
    }
  },
  watch: {
    categoryItem() {
      if (this.categoryItem != null) {
        this.categoryId = this.categoryItem.ctId;
      }
    }
  }
};
</script>
<style></style>
