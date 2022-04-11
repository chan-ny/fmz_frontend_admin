<template>
  <div class="mx-3">
    <v-row>
      <v-col cols="12" sm="3" md="3">
        <v-card>
          <div class="ma-2">
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="blue--text fontsize20"
                    >ຈຳນວນພ້ອມຂາຍ:</v-list-item-title
                  >
                  <v-list-item-subtitle class="red--text"
                    >{{ sale }} ລາຍການ
                    <strong class="fontsize16 blue--text"
                      >ເງິນ:
                      {{ new Intl.NumberFormat().format(totalImport) }} ກີບ</strong
                    >
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="indigo--text  fontsize20"
                    >ຈຳນວນທີ່ກຳລົງສັ້ງຊື້:</v-list-item-title
                  >
                  <v-list-item-subtitle class="red--text"
                    >{{ ordered }} ລາຍການ</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="cyan--text  fontsize20"
                    >ລວມທົງໝົດ:</v-list-item-title
                  >
                  <v-list-item-subtitle class="red--text"
                    >{{ total }} ລາຍການ</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" md="3">
        <v-card>
          <div class="ma-1">
            <pie-chart
              height="215px"
              :data="PieChart"
              legend="bottom"
            ></pie-chart>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card>
          <bar-chart
            xtitle="ຄວາມຖີການນຳເຂົ້າ"
            height="215px"
            :data="Barchart"
          ></bar-chart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="ma-1" outlined>
          <v-card-title primary-title>
            ປະຫວັດສັ້່ງຊື້ສິນຄ້າ
          </v-card-title>
          <v-data-table
            dense
            :items="viewimports"
            :headers="headerColumn"
            class="elevation-1 grey lighten-3"
            loading="true"
            group-by="impId"
          >
            <template v-slot:group.header="{ group, headers, toggle, isOpen }">
              <td :colspan="headers.length">
                <v-btn
                  @click="toggle"
                  small
                  icon
                  :ref="group"
                  :data-open="isOpen"
                >
                  <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
                  <v-icon v-else>mdi-chevron-down</v-icon>
                </v-btn>
                <b style="color:blue">
                  ເລກບິນ: <b style="color:red">{{ group }}</b>
                </b>
              </td>
            </template>
            <template v-slot:item.pdId="{ item }">
              <span class="indigo--text">{{ item.pdId }}</span>
            </template>
            <template v-slot:item.imlprice="{ item }">
              <span class="indigo--text">{{
                new Intl.NumberFormat().format(item.imlprice)
              }}</span>
            </template>
            <template v-slot:item.total="{ item }">
              <span class="indigo--text">{{
                new Intl.NumberFormat().format(item.total)
              }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="sale == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import ViewImportService from "@/service/Imports/Viewimport";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      sale: 0,
      ordered: 0,
      total: 0,
      totalImport: 0,
      barchart: [],
      viewimports: [],
      headerColumn: [
        { text: "ເລກບີນ", value: "impId", width: "50px" },
        { text: "ລະຫັດສິນຄ້າ", value: "pdId", width: "50px" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ຊື່ເຕັມ", value: "pdfullname" },
        { text: "ຜູ້ສະໜອງ", value: "supfullname" },
        { text: "ແບຣນ", value: "bname" },
        { text: "ສິ", value: "cname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ເບີ", value: "sname" },
        { text: "ຈຳນວນ", value: "reciev_qty" },
        { text: "ລາຄາ", value: "imlprice" },
        { text: "ລວມ", value: "total" },
        { text: "ວັນທີ", value: "created_at" }
      ],
      demo: [
        { name: "Workout", data: { amount: 3 } },
        { name: "Call parents", data: { amount: 5 } },
        { name: "Call parents", data: { amount: 5 } },
        { name: "Call parents", data: { amount: 5 } },
        { name: "Call parents", data: { amount: 5 } },
        { name: "Call parents", data: { amount: 5 } },
        { name: "Call parents", data: { amount: 5 } }
      ]
    };
  },
  methods: {
    async viewportFinals() {
      try {
        let value = (await ViewImportService.viewImportFinal()).data;
        this.viewimports = value.data;

        // console.log(value);
      } catch (error) {
        console.log("Error viewimportFinal");
      }
    },
    async analytical() {
      try {
        let data = (await ViewImportService.Analytical()).data;
        this.barchart = data;
        data.Total.forEach(element => {
          this.sale = element.amount;
          this.totalImport = element.total;
        });

        let order = 0;
        let check = 0;
        data.Ordering.forEach(element => {
          order = element.amount;
        });

        data.CheckO.forEach(element => {
          check = element.amount;
        });

        let or = parseInt(order) + parseInt(check);
        this.ordered = or;
        let sum = parseInt(this.sale);
        this.total = or + sum;
      } catch (error) {
        console.log("error Analytical");
      }
    }
  },
  computed: {
    PieChart() {
      let data = {
        Sale: this.sale,
        Ordering: this.ordered,
        Total: this.total
      };
      return data;
    },
    Barchart() {
      let data = {};
      for (var key in this.barchart.Frequency) {
        data[this.barchart.Frequency[key].pdname] = parseInt(
          this.barchart.Frequency[key].amount
        );
      }
      return data;
    }
  },
  created() {
    this.viewportFinals();
    this.analytical();
  }
};
</script>
<style scoped>
.chartjs-render-monitor {
  font-family: "Noto Sans lao" !important;
}
</style>
