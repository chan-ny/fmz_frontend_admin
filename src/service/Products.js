import api from "@/service/api";

export default {
  showBrand() {
    return api().get("brand");
  },
  showCategory() {
    return api().get("category");
  },
  showColour() {
    return api().get("colour");
  },
  showSize() {
    return api().get("size");
  },
  showSupplier() {
    return api().get("supplier");
  },

  ///point product
  index() {
    return api().get("product");
  },
  create(product) {
    return api().post("product", product);
  },
  createStorage(storage) {
    return api().post("storage", storage);
  },
  updateProgrression(product) {
    return api().get("product/" + product);
  },
  storageIndex(product_Id) {
    return api().get("storage/" + product_Id);
  },
  addStorage(item) {
    return api().post("addstorage", item);
  },

  /// update product
  showproduct(productId) {
    return api().get("showproduct/" + productId);
  },
  showbrand(brandId) {
    return api().get("showbrand/" + brandId);
  },
  showcategory(categoryId) {
    return api().get("showcategory/" + categoryId);
  },
  showcolour(colourId) {
    return api().get("showcolour/" + colourId);
  },
  showsupplier(supId) {
    return api().get("showsupplier/" + supId);
  },
  updateProduct(product) {
    return api().post("updateproduct", product);
  },
  updateStorage(storage) {
    return api().put("storage/" + storage.srId, storage);
  },

  //remove product
  remove(productId) {
    return api().delete("product/" + productId);
  },
  removeStorage(storageId){
      return api().delete("storage/"+storageId);
  }
};
