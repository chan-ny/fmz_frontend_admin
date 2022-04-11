import api from "../api";

export default {
  viewImportFinal() {
    return api().get("viewimport");
  },
  Analytical() {
    return api().get("analytic");
  }
};
