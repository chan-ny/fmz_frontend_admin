<template>
  <div>
    <!-- dialog delete -->
    <v-dialog v-model="dialogForm" max-width="430px" persistent>
      <v-card>
        <v-card-title
          ><b class="font fontsize20"
            >ເຈົ້າຕ້ອງການທີ່ຈະລືບຂໍ້ມູນຂະໜາດຫຼືບໍ? ID = {{ sizeId }}
          </b></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1 " text @click="headleClose">ຍົກເລີກ</v-btn>
          <v-btn color="blue darken-1" text @click="deleteSize">ຕົກລົງ</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SizeServiec from "@/service/SizeServies";
import Notify from "@/notify/notifycation";
export default {
  props: {
    dialogForm: Boolean,
    sizeItem: Object
  },
  data() {
    return {
      sizeId: 0
    };
  },
  methods: {
    headleClose() {
      this.$emit("CloseForm");
    },
    // delete from
    async deleteSize() {
      try {
        let del = await SizeServiec.remove(this.sizeId);
        Notify.showMessage("success", del.data.message, 3000);
        this.$emit("CloseForm");
        this.$emit("deleteSuccess");
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດລືບຂໍ້ມູນຂະໜສດ", 4000);
      }
    }
  },
  watch: {
      sizeItem(){
          if(this.sizeItem != null){
              this.sizeId = this.sizeItem.sId;
          }
      }
  },
};
</script>
<style></style>
