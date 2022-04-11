<template>
  <div>
    <v-navigation-drawer v-model="toggle" color="grey lighten-2" fixed app>
      <v-list-item>
        <v-list-item-avatar tile>
          <router-link :to="{ name: 'Dashboard' }">
            <v-img width="40px" src="@/assets/mono.png"></v-img>
          </router-link>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <router-link :to="{ name: 'Dashboard' }" class="text"
              >MONO MEN</router-link
            >
            <v-btn  icon color="red" class="float-right d-sm-none">
              <v-icon @click="closeNa">mdi-close-circle</v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          class="text hignlig"
          v-for="(db, i) in Dashboard"
          :key="i.nameTitle"
          router
          :to="db.route"
        >
          <v-list-item-icon>
            <v-icon v-text="db.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-title
            ><h3>{{ db.nameTitle }}</h3></v-list-item-title
          >
        </v-list-item>

        <v-list-group
          v-for="item in Groupdata"
          :key="item.nameTitle"
          :prepend-icon="item.nameIcon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="pt-2 pb-2"
                ><h3>{{ item.nameTitle }}</h3></v-list-item-title
              >
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="sub in item.subItems"
            :key="sub.nameItems"
            router
            :to="sub.route"
          >
            <v-list-item-content>
              <v-list-item-title class="pa-1"
                ><strong>{{ sub.nameItems }}</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          class="text hignlig"
          v-for="(list, i) in listSell"
          :key="i.nameTitle"
          router
          :to="list.route"
        >
          <v-list-item-icon>
            <v-icon v-text="list.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-title class="pt-2 pb-2"
            ><h3>{{ list.nameTitle }}</h3></v-list-item-title
          >
        </v-list-item>
        <v-list-group
          v-for="item in reporting"
          :key="item.nameTitle"
          :prepend-icon="item.nameIcon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="pt-2 pb-2"
                ><h3>{{ item.nameTitle }}</h3></v-list-item-title
              >
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="sub in item.subItems"
            :key="sub.nameItems"
            router
            :to="sub.route"
          >
            <v-list-item-content>
              <v-list-item-title class="pa-1"
                ><strong>{{ sub.nameItems }}</strong>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  props: {
    toggle: Boolean
  },
  data() {
    return {
      Dashboard: [{ nameTitle: "ໜ້າແລກ", icon: "dashboard", route: "/" }],
      listSell: [
        {
          nameTitle: "ສິນຄ້ານຳເຂົ້າ",
          icon: "mdi-format-list-bulleted-type",
          route: "/viewimports"
        },
        {
          nameTitle: "ລາຍການຂາຍ",
          icon: "mdi-cart-outline",
          route: "/viewsell"
        }
      ],

      Groupdata: [
        {
          nameIcon: "mdi-package",
          subItems: [
            { nameItems: "ຂໍ້ມູນສິນຄ້າ", route: "/product" },
            { nameItems: "ປະເພດສິນຄ້າ", route: "/category" },
            { nameItems: "ສີສິນຄ້າ", route: "/colour" },
            { nameItems: "ຂະໜາດສິນຄ້າ", route: "/size" },
            { nameItems: "ແບຣນສິນຄ້າ", route: "/brand" },
            { nameItems: "ຜູ້ສະໜອງສິນຄ້າ", route: "/supplier" },
            { nameItems: "QR Code", route: "/bank" },
            { nameItems: "ຮ້ານ", route: "/store" }
          ],
          nameTitle: "ຈັດການຂໍ້ມູນ"
        },
        {
          nameIcon: "mdi-import",
          subItems: [
            { nameItems: "ຈັດຊື້ສິນຄ້າ", route: "/import" },
            { nameItems: "ກວດສອບສິນຄ້າ", route: "/checkimport" },
            { nameItems: "ສະຕ໊ອກສິນຄ້າ", route: "/stock" }
          ],
          nameTitle: "ຈັດຊື້ສິນຄ້າ"
        },
        {
          nameIcon: "mdi-cart",
          subItems: [
            { nameItems: "ລູກຄ້າ", route: "/customer" },
            { nameItems: "ແຈ້ງຊຳລະເງິນ", route: "/checktransfer" }
          ],
          nameTitle: "ຂາຍສິນຄ້າ"
        }
      ],
      reporting: [
        {
          nameTitle: "ລາຍງານ",
          nameIcon: "mdi-file-pdf",
          route: "/reporting",
          subItems: [
            { nameItems: "ລາຍງານການຂາຍສິນຄ້າ", route: "/reportsale" },
            { nameItems: "ລາຍງານຂໍ້ມູນສິນຄ້າ", route: "/reportproduct" },
            { nameItems: "ລາຍງານຈັດຊື້ສິນຄ້ານຳເຂົ້າ", route: "/reportimport" },
            { nameItems: "ລາຍງານຂໍ້ມູນລູກຄ້າ", route: "/reportcustomer" }
          ]
        }
      ]
    };
  },
  methods: {
    closeNa() {
      this.$emit("closeNavBar");

    }
  }
};
</script>
<style lang="css" scope>
.v-list {
  font-weight: bold !important;
}
.text {
  text-decoration: none;
  color: black !important;
  font-size: 20px !important;
}
.text .v-list {
  font-size: 100px !important;
}
.hignlig {
  color: teal !important;
}
</style>
