<template>
  <div>
    <!-- dialog delete -->
    <v-dialog v-model="dialogForm" max-width="450px" persistent>
      <v-card>
        <v-card-title class="headline"
          ><b class="font"
            >ເຈົ້າຕ້ອງການທີ່ຈະລືບຂໍ້ມູນສິຫຼືບໍ? ID = {{ colourId }}
          </b></v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1 " text @click="headleClose">ຍົກເລີກ</v-btn>
          <v-btn color="blue darken-1" text @click="deleteColour">ຕົກລົງ</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ColourService from "@/service/ColourService";
import Notify from "@/notify/notifycation";
export default {
  props: {
    dialogForm: Boolean,
    colurItem: Object
  },
  data() {
    return {
      colourId: 0
    };
  },
  methods: {
    headleClose() {
      this.$emit("CloseFormDel");
    },
    ///remove colour
    async deleteColour() {
      try {
        let remove = await ColourService.remove(this.colourId);
        Notify.showMessage("success", remove.data.message, 3000);
        this.$emit("CloseFormDel");
        this.$emit("deletSuccess");
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດລືບຂໍ້ມູນສີ", 3000);
      }
    }
  },
  watch: {
    colurItem() {
      if (this.colurItem != null) {
        this.colourId = this.colurItem.cId;
      }
    }
  }
};
</script>
<style></style>
