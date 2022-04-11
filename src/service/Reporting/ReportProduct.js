import api from "../api";

export default {
  viewReportProduct() {
    return api().get("reportproduct");
  },

  viewProduct(pdId) {
    return api().get("reportproduct/" + pdId);
  },

  viewStorage(pdId) {
    return api().get("reportstorage/" + pdId);
  }
};
