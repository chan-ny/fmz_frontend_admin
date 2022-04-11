<template>
  <div>
    <v-dialog v-model="dialogForm" persistent max-width="290">
      <v-card v-if="checkForm == false">
        <v-card-title class="font fontsize20">
          ແຈັງເຕືອນຄັ້ງສູດທ້າຍ?
        </v-card-title>
        <v-card-text class="red--text"
          >ເຈົ້າແນ່ໃຈແລ້ວບໍທີ່ຈະບັນທືກຂໍ້ມູນ ຈຳພວກນີ້?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="headleClose">
            ຍົກເລີກ
          </v-btn>
          <v-btn color="green darken-1" @click="headleSave" text>
            ຕົກຕົງ
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="font fontsize20 red--text">
          ຂໍ້ມູນຍັງວ່າງຢູ່....<v-btn
            color="green darken-1"
            text
            @click="headleClose"
          >
            close
          </v-btn>
        </v-card-title>
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
    item: String
  },
  data() {
    return {
      checkForm: false
    };
  },
  methods: {
    headleClose() {
      this.$emit("closeForm");
    },
    async headleSave() {
      try {
        let del = await ImportService.checkFinal(this.item);
        await this.$emit("closeForm");
        await this.$emit("finalSuccess");
        await this.$emit("checklist");
        await Notify.showMessage("success", del.data.message, 3000);
      } catch (error) {
        Notify.showMessage("erroe", "ບໍ່ສາມາດກວດສອບ", 3000);
      }
    }
  },
  watch: {
    item() {
      if (this.item != undefined) {
        this.checkForm = false;
      } else {
        this.checkForm = true;
      }
    }
  }
};
</script>
<style></style>
