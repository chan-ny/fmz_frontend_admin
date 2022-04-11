<template>
  <div>
    <v-dialog v-model="dialogForm" persistent max-width="290">
      <v-card>
        <v-card-title class="font fontsize20">
          ແຈັງເຕືອນຄັ້ງສູດທ້າຍ?
        </v-card-title>
        <v-card-text class="red--text"
          >ເຈົ້າຕ້ອງການທີ່ຈະລົບຂໍ້ມູນການສັ່ງຊື້ແທ້ບໍ?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="headleClose">
            ຍົກເລີກ
          </v-btn>
          <v-btn color="green darken-1" @click="headleDel" text>
            ຕົກຕົງ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ImportService from "@/service/Imports/ImportService";
import Notify from "@/notify/notifycation";
export default {
  props: {
    dialogForm: Boolean,
    item: Number
  },
  data() {
    return {
      imlId: 0
    };
  },
  methods: {
    headleClose() {
      this.$emit("closeForm");
    },
    async headleDel() {
      try {
        let del = await ImportService.deleteItem(this.item);
        this.$emit("closeForm");
        this.$emit("delSuccess");
        Notify.showMessage("success", del.data.message, 3000);
        // console.log(this.item)
      } catch (error) {
        Notify.showMessage("erroe", "ບໍ່ສາມາດລົບໃດ້", 3000);
      }
    }
  }
};
</script>
<style></style>
