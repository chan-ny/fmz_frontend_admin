import api from "./api";

export default {
  index() {
    return api().get("bank");
  },
  createBank(bank) {
    return api().post("bank", bank);
  },
  updateBank(bank) {
    return api().post("updatebank", bank);
  },
  remove(bankID) {
    return api().delete("bank/" + bankID);
  }
};
