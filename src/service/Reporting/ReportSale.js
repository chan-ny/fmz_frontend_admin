import api from "../api";

export default {
  viewSale() {
    return api().get("reportsale");
  },
  SearchDatetime(date) {
    return api().post("rsday", date);
  },


};
