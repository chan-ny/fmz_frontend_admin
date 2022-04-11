import api from "./api";

export default {
  index() {
    return api().get("store");
  },
  addstore(store) {
    return api().post("store", store);
  },
  updateStore(store) {
    return api().post("update_store", store);
  },
  removestore(store) {
    return api().delete("store/" + store);
  }
};
