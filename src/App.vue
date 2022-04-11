<template>
  <div>
    <template v-if="$route.meta.AllowAccess == false">
      <v-app class="font">
        <v-main>
          <router-view></router-view>
        </v-main>
      </v-app>
    </template>
    <template v-else>
      <v-app class="font">
        <navigationdrawer :toggle="drawer" @closeNavBar="drawer = !drawer" />
        <toobar @toggleNav="drawer = !drawer"></toobar>
        <v-main>
          <breadcrumbs></breadcrumbs>
          <router-view></router-view>
          <footers></footers>
        </v-main>
      </v-app>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      listvalue: []
    };
  },
  mounted() {
    window.Echo.channel("channel").listen("Notifycations", e => {
      // console.log(e.data_inv);
      if (e.data_inv != undefined) {
        this.listvalue.push(e.data_inv);
        this.$store.dispatch("EventNotifycation", this.listvalue);
      }
    });
  },
  computed: {
    ...mapState(["token", "notifycation"])
  },
  watch: {
    token() {
      if (this.token == undefined) {
        this.$router.push({
          name: "Login"
        });
      }
    },
    notifycation() {
      if (this.notifycation.length == 0) {
        this.listvalue = [];
      }
    }
  },
  created() {
    if (this.token == undefined) {
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");

.font {
  font-family: "Noto Sans lao" !important;
}
.swal2-title {
  font-family: "Noto Sans lao" !important;
}
.swal2-html-container {
  font-family: "Noto Sans lao" !important;
}
th {
  font-weight: bold !important;
  color: black !important;
  font-size: 14px !important;
}
td {
  font-size: 14px !important;
  color: black !important;
}
.fontsize30 {
  font-weight: bold !important;
  font-size: 30px !important;
}
.fontsize24 {
  font-weight: bold !important;
  font-size: 24px !important;
}
.fontsize20 {
  font-weight: bold !important;
  font-size: 20px !important;
}
.fontsize18 {
  font-size: 18px !important;
}
.fontsize16 {
  font-size: 16px !important;
}
.fontsize14 {
  font-size: 14px !important;
}
.fontsize13 {
  font-size: 13px !important;
}
.fontsize12 {
  font-size: 12px !important;
}
</style>
