import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Brand from "../components/Brands/index.vue";
import Size from "../components/Size/index.vue";
import Colour from "../components/Colour/index";
import Category from "../components/Category/index";
import Supplier from "../components/Supplier/index";
import Product from "../components/Products/index";
import StorageProduct from "../components/Products/add";
import EditProduct from "../components/Products/Update/edit";
import ImportProduct from "../components/Import/index";
import CheckImportOrder from "../components/Import/CheckImport";
import Customer from "../views/Customer";
import CheckTransfer from "../views/Checktransfer";
import Stock from "../components/Stockin";
import Bank from "../components/Bank/index";
import Viewimports from "../components/Viewimport/index";
import Viewsell from "../components/viewSell/index";

import Reportsale from "../components/Report/ReportSale";
import RepourtProduct from "../components/Report/ReportProduct";
import ReportImport from "../components/Report/ReportImport";
import ReportCustomer from "../components/Report/ReportCutomer";
import Store from "../components/Store/index";

///viewer repoirt
import ViewReportSale from "..//views/viewerReport/ViewReportSale";
import ViewReportSaleM from "..//views/viewerReport/ViewReportSalem";
import ViewReportProduct from "..//views/viewerReport/ViewReportProduct";
import ViewCustomer from "..//views/viewerReport/ReportCustomer";
import ViewImport from "..//views/viewerReport/ViewReportImport";
import BillOrder from "../components/Import/BillOrder";

// login system

import Login from "../components/Admin/Login";
import Register from "../components/Admin/Register";
import Admin from "../components/Admin/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: Home
  },
  {
    path: "/billorder",
    name: "BillOrder",
    component: BillOrder,
    meta: {
      AllowAccess: false
    }
  },
  {
    path: "/viewreportsale/:day",
    name: "ViewReportSale",
    component: ViewReportSale,
    meta: {
      AllowAccess: false
    }
  },
  {
    path: "/viewreportsalem/:month",
    name: "ViewReportSaleM",
    component: ViewReportSaleM,
    meta: {
      AllowAccess: false
    }
  },
  {
    path: "/viewreportproduct/:pdId",
    name: "ViewReportProduct",
    component: ViewReportProduct,
    meta: {
      AllowAccess: false
    }
  },
  {
    path: "/viewcustomer",
    name: "ViewCustomer",
    component: ViewCustomer,
    meta: {
      AllowAccess: false
    }
  },
  {
    path: "/viewimport",
    name: "ViewImport",
    component: ViewImport,
    meta: {
      AllowAccess: false
    }
  },
  {
    path: "/store",
    name: "Store",
    component: Store,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Store" }]
    }
  },
  {
    path: "/",
    name: "Dashboard",
    component: Home,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }]
    }
  },
  {
    path: "/brand",
    name: "brand",
    component: Brand,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "brand" }]
    }
  },
  {
    path: "/size",
    name: "size",
    component: Size,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "size" }]
    }
  },
  {
    path: "/colour",
    name: "colour",
    component: Colour,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "colour" }]
    }
  },
  {
    path: "/category",
    name: "category",
    component: Category,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "category" }]
    }
  },
  {
    path: "/supplier",
    name: "supplier",
    component: Supplier,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "supplier" }]
    }
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "Products" }]
    }
  },
  {
    path: "/storage",
    name: "Storage",
    component: StorageProduct,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "Storage" }]
    }
  },
  {
    path: "/editproduct",
    name: "Editproduct",
    component: EditProduct,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "Editproduct" }]
    }
  },
  {
    path: "/bank",
    name: "Bank",
    component: Bank,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ຄີວອາໂຄດທະນາຄານ" }]
    }
  },

  ///import product
  {
    path: "/import",
    name: "import",
    component: ImportProduct,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "import" }]
    }
  },
  {
    path: "/checkimport",
    name: "checkimport",
    component: CheckImportOrder,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Dashboard" }, { name: "checkimport" }]
    }
  },
  {
    path: "/viewimports",
    name: "Viewimports",
    component: Viewimports,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ສີນຄ້ານຳເຂົ້າ" }]
    }
  },

  /// stockin product
  {
    path: "/stock",
    name: "Stock",
    component: Stock,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Stock" }, { name: "ສະຕ໊ອກສິນຄ້າ" }]
    }
  },

  //customer sell
  {
    path: "/customer",
    name: "Customer",
    component: Customer,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "Customer" }]
    }
  },
  {
    path: "/checktransfer",
    name: "CheckTransfer",
    component: CheckTransfer,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ຂໍ້ມູນລູກຄ້າ" }, { name: "ກວດສອບທຸລະກຳ" }]
    }
  },
  {
    path: "/viewsell",
    name: "Viewsell",
    component: Viewsell,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ການຂາຍ" }]
    }
  },
  //// reporting
  {
    path: "/reportsale",
    name: "Reportsale",
    component: Reportsale,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ລາຍງານການຂາຍ" }]
    }
  },
  {
    path: "/reportproduct",
    name: "RepourtProduct",
    component: RepourtProduct,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ລາຍງານສິນຄ້າ" }]
    }
  },
  {
    path: "/reportimport",
    name: "ReportImport",
    component: ReportImport,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ລາຍງານສິນຄ້ານຳເຂົ້າ" }]
    }
  },
  {
    path: "/reportcustomer",
    name: "ReportCustomer",
    component: ReportCustomer,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ລາຍງານຂໍ້ມູນລູກຄ້າ" }]
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      AllowAccess: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      AllowAccess: false
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      AllowAccess: true,
      breadcrumbs: [{ name: "ແອັດມີນ" }]
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
