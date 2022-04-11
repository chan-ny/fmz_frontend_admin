import api from "../api";

export default {
  searchBill() {
    return api().get("searchbill");
  },
  searchDeatil(impId) {
    return api().get("listbill/" + impId);
  },
  saveStock(impId,stock) {
    return api().put("stockadd/"+impId, stock);
  },
  historystock(){
    return api().get('historystock');
  }
};
