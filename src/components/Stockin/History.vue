<template>
  <div>
    <v-card outlined class="ma-2">
      <div class="fontsize20 ma-2">ລາຍການສິນຄ້າທີ່ສະຕ້ອກອີນແລ້ວ</div>
      <div class="fontsize14 ma-2">
        ຈຳນວນ <strong style="color:red">{{ conut }}</strong> ລາຍການ
      </div>
      <v-data-table
        dense
        :headers="headerColumn"
        :items="history.data"
        class="elevation-1  grey lighten-2"
        loading="true"
        :group-desc="true"
        group-by="impId"
      >
        <template v-slot:group.header="{ group, headers, toggle, isOpen }">
          <td :colspan="headers.length">
            <v-btn @click="toggle" small icon :ref="group" :data-open="isOpen">
              <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
            <b style="color:blue">
              ເລກບິນ: <b style="color:red">{{ group }}</b>
            </b>
          </td>
        </template>
        <template v-slot:item.stQty="{ item }">
          <span class="indigo--text">{{ item.stQty }}</span>
        </template>
        <template v-slot:item.impstate>
          <v-chip ><v-icon color="primary">mdi-check-circle</v-icon> </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import StockService from "@/service/Stocks/StockInService";
import Notify from "@/notify/notifycation";
export default {
  props: {
    state: String
  },
  data() {
    return {
      conut: 0,
      history: [],
      headerColumn: [
        // { text: "codeID", value: "stId" },
        { text: "ເລກບິນ", value: "impId" },
        { text: "ລະຫັດສິນຄ້າ", value: "pdId" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ຂະໜາດ", value: "sname" },
        { text: "ຈຳນວນ", value: "stQty" },
        { text: "ສະຖານະ", value: "impstate" },
        { text: "ວັນທີ່ສ້າງ", value: "created_at" }
      ]
    };
  },
  methods: {
    async loadHistoryStock() {
      try {
        this.history = (await StockService.historystock()).data;
        this.conut = this.history.count;
        // console.log(this.history);
      } catch (error) {
        Notify.showMessage("error", "ບໍ່ສາມາດໂຫລດຂໍ້ມູນປະຫັວດການສະຕ໊ອກ", 3000);
      }
    }
  },
  watch: {
    state() {
      if (this.state != null) {
        this.loadHistoryStock();
        // console.log(this.state)
      }
    }
  },
  created() {
    this.loadHistoryStock();
  }
};
</script>
<style></style>
