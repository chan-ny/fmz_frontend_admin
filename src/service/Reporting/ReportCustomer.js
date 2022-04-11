import api from "../api";

export default {
  ViewReportCus() {
    return api().get("reportcus");
  },
  ViewSearchCus(cusId) {
    return api().get("reportcustomer/" + cusId);
  }
};
