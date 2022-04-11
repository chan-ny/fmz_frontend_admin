import NavigationDrawer from "../components/Layout/NavigationDrawer.vue";
import Breadcrumbs from "../components/Layout/Breadcrumbs.vue";
import Toobar from "../components/Layout/Toobar.vue";
import Footer from "../components/Layout/Footer.vue";
import Widget from "../components/widget";

function callcomponent(Vue) {
  Vue.component("navigationdrawer", NavigationDrawer);
  Vue.component("breadcrumbs", Breadcrumbs);
  Vue.component("toobar", Toobar);
  Vue.component("footers", Footer);
  Vue.component("widgets", Widget);
}

export { callcomponent };
