import api from "./api";

export default {
  customer() {
    return api().get("acus");
  },

  saleDay() {
    return api().get("sale_day");
  },

  saleAll() {
    return api().get("sale_all");
  },

  importAll() {
    return api().get("import_all");
  },

  SaleBest() {
    return api().get("analytical_salebest");
  },

  ViewAdmin() {
    return api().get("viewadmin");
  },

  viewCustomerSaleBest() {
    return api().get("viewcustomer_salebest");
  }
};
