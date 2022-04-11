import api from "../api";

export default {
  saveImport(imports) {
    return api().post("import", imports);
  },
  saveImportList(importlist) {
    return api().post("importlist", importlist);
  },
  showlistimport() {
    return api().get("showimportlist");
  },
  checkImport() {
    return api().get("checkbillimport");
  },
  showlistProduct(impId) {
    return api().get("listproduct/" + impId);
  },
  checkNumber(importlist) {
    return api().put("ch_number/" + importlist.imlId, importlist);
  },
  deleteItem(imlId) {
    return api().get("deleteitem/" + imlId);
  },
  checkFinal(impId) {
    return api().get("ch_final/" + impId);
  },
  StoryCheckimport() {
    return api().get("storycheck");
  },

  SearchSize(pdId) {
    return api().get("searchsize/" + pdId);
  },

  deleteImport(impId) {
    return api().get("deletebill/" + impId);
  }
};
