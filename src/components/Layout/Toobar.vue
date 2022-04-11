<template>
  <v-app-bar color="grey lighten-2" dense app>
    <v-app-bar-nav-icon @click="toggleNavigationDrawer"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>

    <!-- notification -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon v-if="notify == null" medium>mdi-bell-ring-outline</v-icon>
          <v-badge v-else color="blue" overlap :content="notify">
            <v-icon>mdi-cash-multiple</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card>
        <v-list dense max-width="500px" tile>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> <b>ແຈັງເຕື່ອນຂໍ້ມູນ</b> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list >
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in Bill"
                :key="i"
                @click="isOpenTransfer"
              >
                <v-list-item-content>
                  <v-list-item-subtitle>
                    <div>
                      <span>
                        ບີນເລກທີ່:
                        <strong class="blue--text">{{ item.invId }}</strong>
                      </span>
                      <span>
                        ເງິນໂອນ:
                        <strong class="blue--text">{{
                          new Intl.NumberFormat().format(item.invPrice)
                        }}</strong>
                      </span>
                    </div>
                  </v-list-item-subtitle>

                  <v-divider></v-divider>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-list>
      </v-card>
    </v-menu>
    <!-- end notification -->
    <v-divider vertical></v-divider>

    <!-- data admin -->
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon medium>mdi-account-box</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list flat>
          <v-list-item>
            <v-list-item-avatar>
              <router-link :to="{ name: 'Admin' }">
                <v-img width="30px" src="@/assets/mono.png"></v-img>
              </router-link>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>MONO STAFF</v-list-item-title>
              <v-list-item-subtitle>MR CHAN</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list flat>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(item, i) in admin"
                :key="i"
                router
                :to="item.route"
              >
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-list>
      </v-card>
    </v-menu>
    <!--end data admin -->
  </v-app-bar>
</template>
<script>
import { mapState } from "vuex";
import ProductServer from "@/service/Products";
export default {
  methods: {
    toggleNavigationDrawer() {
      this.$emit("toggleNav");
    },
    isOpenTransfer() {
      this.$store.dispatch("EventNotifycation", []);
      this.$router.push({ name: "CheckTransfer" });
    },
    async seriesProduct() {
      try {
        await ProductServer.index();
      } catch (error) {
        this.$router.push({
          name: "Login"
        });
      }
    }
  },
  data() {
    return {
      admin: [
        {
          text: "ແປ່ງລະຫັດຜ່ານໄໝ່",
          icon: "mdi-key-change",
          route: "/change-adminpwd"
        },
        { text: "ອອກຈາກລະບົບ", icon: "mdi-login", route: "/login" }
      ],
      Bill: [],
      listvalue: [],
      notify: ""
    };
  },
  computed: {
    ...mapState(["notifycation", "notifyEvent", "token"])
  },
  mounted() {
    if (this.notifycation.length != 0) {
      this.notify = "ໂອນເງິນ";
      this.Bill = this.notifycation;
      // console.log("mount", this.Bill);
    } else {
      this.notify = null;
    }

    if (this.token == null) {
      this.$router.push({
        name: "Login"
      });
    }

    this.seriesProduct();
  },
  watch: {
    notifycation() {
      if (this.notifycation.length != 0) {
        this.notify = "ໂອນເງິນ";
        this.Bill = this.notifycation;
      } else {
        this.notify = null;
        this.Bill = [];
      }
    },
    token() {
      if (this.token == null) {
        this.$router.push({
          name: "Login"
        });
      }
    }
  }
};
</script>
<style></style>
