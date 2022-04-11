<template>
  <div>
    <v-card class="ma-2">
      <v-list-item>
        <v-list-item-content>
          <div>ປະຫວັດການເຊັກສິນຄ້ານຳເຂົ້າ</div>
          <br />
          <v-list-item-subtitle
            >ຈຳນວນ
            <strong style="color:blue">{{ count }}</strong>
            ລາຍການ
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-data-table
        dense
        :headers="hesderColumn"
        :items="storychecks.data"
        class="elevation-1 grey lighten-3"
        item-key="id"
        :group-desc="true"
        group-by="impId"
        loading="true"
      >
        <template v-slot:group.header="{ group, headers, toggle, isOpen }">
          <td :colspan="headers.length">
            <v-btn @click="toggle" small icon :ref="group" :data-open="isOpen">
              <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
              <v-icon v-else>mdi-chevron-down</v-icon>
            </v-btn>
            <b style="color:blue">
              ເລກບິນສັ້ງຊື່: <b style="color:red">{{ group }}</b>
            </b>
          </td>
        </template>

        <template v-slot:item.imlprice="{ item }">
          <span class="indigo--text">{{
            new Intl.NumberFormat().format(item.imlprice)
          }}</span>
        </template>
        <template v-slot:item.priceBefore="{ item }">
          <span class="indigo--text">{{
            new Intl.NumberFormat().format(item.priceBefore)
          }}</span>
        </template>
        <template v-slot:item.AmountTotal="{ item }">
          <span class="indigo--text">{{
            new Intl.NumberFormat().format(item.AmountTotal)
          }}</span>
        </template>
        <template v-slot:item.priceAfter="{ item }">
          <span class="indigo--text">{{
            new Intl.NumberFormat().format(item.priceAfter)
          }}</span>
        </template>
      </v-data-table>
    </v-card>
    <div v-if="count == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import StoryCheck from "@/service/Imports/ImportService";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  props: {
    clock: Number
  },
  data() {
    return {
      storychecks: [],
      count: 0,
      hesderColumn: [
        { text: "ເລກທີບີນ", value: "impId" },
        { text: "ລະຫັດສິນຄ້າ", value: "pdId" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname", width: 100 },
        { text: "ຊື່ເຕັມ", value: "pdfullname", width: 200 },
        { text: "ຜູ້ສະໜອງ", value: "supfullname" },
        { text: "ແບຣນ", value: "bname" },
        { text: "ໄຊຣ", value: "sname" },
        { text: "ຈຳນວນ", value: "order_qty" },
        { text: "ຈຳນວນຈີງ", value: "reciev_qty" },
        { text: "ລາຄາ", value: "imlprice" },
        { text: "ລວມລາຄາສັ່ງຊື່", value: "priceBefore" },
        { text: "ລວມລາຄາແທ້", value: "priceAfter" },
        { text: "ຂາດ,ເກີນ", value: "AmountTotal" },
        { text: "ວັນທີ່ສັງຊື່", value: "created_at" }
      ]
    };
  },
  methods: {
    async seriresStory() {
      try {
        this.storychecks = (await StoryCheck.StoryCheckimport()).data;
        this.count = this.storychecks.cont;
        // console.log(this.storychecks);
      } catch (error) {
        console.log(error);
      }
    }
  },
  watch: {
    clock() {
      if (this.clock == 0) {
        this.seriresStory();
        console.log(this.clock);
      }
    }
  },
  created() {
    this.seriresStory();
  }
};
</script>
<style></style>
