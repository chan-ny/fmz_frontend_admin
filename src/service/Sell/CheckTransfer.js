import api from "../api";

export default {
  checkViewTranfer() {
    return api().get("checktranfer");
  },
  checkfinalTranfer() {
    return api().get("finaltranfer");
  },
  viewOrdered(invId) {
    return api().get("viewpdf/" + invId);
  },
  viewTransfer(invId) {
    return api().get("viewtranfer/" + invId);
  },
  CommitTransfer(pmId) {
    return api().put("committ/" + pmId);
  },
  CencelInvoince(invId, value) {
    return api().put("cencellbill/" + invId, value);
  },
  SaveTransfer(value) {
    return api().post("tranfercommit", value);
  }
};
