import api from "./api";

export default {
  login(admin) {
    return api().post("admin_login", admin);
  }
};
