import api from "./api";

export default {
  viewCustomer() {
    return api().get("view_customer");
  }
};
