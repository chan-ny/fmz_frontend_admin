import api from "../api";

export default {
  viewReportImport(date) {
    return api().post("reportimport", date);
  },
  viewDeatilImport(impId) {
    return api().get("reportdetail_import/" + impId);
  }
};
