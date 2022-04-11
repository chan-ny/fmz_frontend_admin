import api from "../api";

export default {
  viewSale() {
    return api().get("viewsale");
  },
  AnalyticalSale() {
    return api().get("analyticalsale");
  }
};
