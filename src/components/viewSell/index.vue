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
                    >ຈຳນວນລູກຄ້າ:</v-list-item-title
                  >
                  <v-list-item-subtitle class="red--text"
                    >{{ AmountCus }} ລາຍການ</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="indigo--text  fontsize20"
                    >ຈຳນວນໂອນເງິນ:</v-list-item-title
                  >
                  <v-list-item-subtitle class="red--text"
                    >{{ AmountPay }} ລາຍການ</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="cyan--text  fontsize20"
                    >ຈຳນວນຂາຍ:</v-list-item-title
                  >
                  <v-list-item-subtitle class="red--text"
                    >{{ AmountSale }} ລາຍການ , ຈຳນວນເງິນ:
                    <strong class="fontsize20 blue--text"
                      >{{
                        new Intl.NumberFormat().format(TotalSale)
                      }}
                      ກີບ</strong
                    >
                  </v-list-item-subtitle>
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
              :data="PieCart"
              legend="bottom"
            ></pie-chart>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card>
          <bar-chart
            height="215px"
            :data="BarChart"
            :colors="['#75e569']"
            xtitle="ຄວາມຖິການຂາຍ"
          ></bar-chart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="ma-1" outlined>
          <v-card-title primary-title>
            ປະຫວັດການຂາຍ
          </v-card-title>
          <v-data-table
            dense
            :items="viewlist"
            :headers="headerColumn"
            class="elevation-1 grey lighten-3"
            loading="true"
            group-by="invId"
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

            <template v-slot:item.sdPrice="{ item }">
              <span class="indigo--text">{{
                new Intl.NumberFormat().format(item.sdPrice)
              }}</span>
            </template>
            <template v-slot:item.total="{ item }">
              <span class="indigo--text">{{
                new Intl.NumberFormat().format(item.total)
              }}</span>
            </template>

            <template v-slot:item.cname="{ item }">
              <v-chip small dark :color="item.cname">{{ item.cname }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="AmountSale == 0">
      <data-loading></data-loading>
    </div>
  </div>
</template>
<script>
import ViewSaleService from "@/service/Sell/ViewSale";
import loding from "@/callComponent/dialogLoading";
export default {
  components: {
    "data-loading": loding
  },
  data() {
    return {
      viewlist: [],
      AmountCus: 0,
      AmountPay: 0,
      AmountSale: 0,
      TotalSale: 0,
      topsix: [],
      data: {
        USA: 90,
        China: 70,
        Russia: 40
      },
      headerColumn: [
        { text: "ເລກບີນ", value: "invId" },
        { text: "ລະຫັດສິນຄ້າ", value: "pdId", width: "50px" },
        { text: "ຊື່ສິນຄ້າ", value: "pdname" },
        { text: "ຊື່ເຕັມ", value: "pdfullname", width: "250px" },
        { text: "ແບຣນ", value: "bname" },
        { text: "ສິ", value: "cname" },
        { text: "ປະເພດ", value: "ctname" },
        { text: "ເບີ", value: "sname" },
        { text: "ຈຳນວນ", value: "sdQty" },
        { text: "ລາຄາ", value: "sdPrice" },
        { text: "ລວມ", value: "total" },
        { text: "ວັນທີ", value: "created_at" }
      ]
    };
  },
  methods: {
    async viewSalefinal() {
      try {
        let view = (await ViewSaleService.viewSale()).data;
        this.viewlist = view.data;
      } catch (error) {
        console.log("error viewSale");
      }
    },
    async AnalyticalFinal() {
      try {
        let value = (await ViewSaleService.AnalyticalSale()).data;
        this.AmountCus = value.Cus;
        this.AmountPay = value.pay;
        this.AmountSale = value.total[0].amount;
        this.TotalSale = value.total[0].total;
        this.topsix = value.Topsix;
        // console.log(this.BarChart);
      } catch (error) {
        console.log("error analytic");
      }
    }
  },
  computed: {
    PieCart() {
      let data = {
        Customer: this.AmountCus,
        Payment: this.AmountPay,
        Sale: this.AmountSale
      };
      return data;
    },
    BarChart() {
      let data = {};
      for (var key in this.topsix) {
        data[this.topsix[key].pdname] = parseInt(this.topsix[key].amount);
      }
      return data;
    }
  },
  created() {
    this.viewSalefinal();
    this.AnalyticalFinal();
  }
};
</script>
<style></style>
