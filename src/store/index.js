import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isUserLogin: false,
    empName: 1,
    product_Id: 0,
    counter: 0,
    transfer: "",
    notifycation: [],
    Admin_Id: 1,
    billorder: [],
    StateReport:1,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLogin = true;
      } else {
        state.isUserLogin = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    productchange(state, product_Id) {
      state.product_Id = product_Id;
    },
    change(state, counter) {
      state.counter = counter;
    },
    changeTransfer(state, transfer) {
      state.transfer = transfer;
    },
    isnotifycation(state, notifycation) {
      state.notifycation = notifycation;
    },
    isImportorder(state, billorder) {
      state.billorder = billorder;
    },

    isStateReport(state, StateReport) {
      state.StateReport = StateReport;
    }
  },
  getters: {
    counter: state => state.counter,
    product_Id: state => state.product_Id,
    transfer: state => state.transfer,
    StateReport: state => state.StateReport,
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    EventNotifycation({ commit }, notifycation) {
      commit("isnotifycation", notifycation);
    },

    ActiveImpoerOrder({ commit }, billorder) {
      commit("isImportorder", billorder);
    }
  },
  modules: {}
});
