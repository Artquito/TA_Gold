<template>
  <div>
    <a-layout-header
      style="
        border-bottom: 2px solid #1b5292;
        background-color: white;
      "
    >
        <a-typography-title :level="3" style="margin:0; line-height: 64px">
          Boyer Moore Gold App
        </a-typography-title>
      
    </a-layout-header>

    <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      style="padding: 0px 30px; margin-bottom: 0px"
    >
      <a-menu-item key="/dashboard">Dashboard</a-menu-item>
      <a-sub-menu key="/master">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Master Data</template>
        <a-menu-item key="/master/tray">Master Tray</a-menu-item>
        <a-menu-item key="/master/supplier">Master Supplier</a-menu-item>
        <a-menu-item key="/master/item">Master Item</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="/order">
        <template #icon>
          <CarryOutOutlined />
        </template>
        <template #title>Item Check</template>
        <a-menu-item key="/attendance/check">Item Attendance Check</a-menu-item>
        <!-- <a-menu-item key="/order/pembelian/baru"
          >Order Pembelian Baru</a-menu-item
        > -->
      </a-sub-menu>
      <a-sub-menu key="order_form_pos">
        <template #icon>
          <ShoppingCartOutlined />
        </template>
        <template #title>Outbound</template>
        <a-menu-item key="order_form_pos">Outbound Items</a-menu-item>
        <!-- <a-menu-item key="order_form_penjualan"
          >Order Penjualan Baru</a-menu-item
        >
        <a-menu-item key="order_list_penjualan"
          >Daftar Order Penjualan</a-menu-item
        > -->
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import {
  AppstoreOutlined,
  CarryOutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";
export default {
  watch: {
    current: function (val) {
      if (val == "/") {
        this.$router.replace("/");
        console.log("back to dashboard");
        console.log(this.current);
        sessionStorage.setItem("currentSession", this.current);
      } else {
        this.$router.replace(val.toString());
        console.log("changed location");
        console.log(this.current);
        sessionStorage.setItem("currentSession", this.current);
      }
    },
  },
  data() {
    return {
      current: ["/"],
    };
  },
  components: {
    AppstoreOutlined,
    CarryOutOutlined,
    ShoppingCartOutlined,
  },
  created() {
    var state = sessionStorage.getItem("currentSession");
    var isLoggedIn = sessionStorage.getItem("authorization");
    if (isLoggedIn) {
      this.current = [state];
    }
  },
};
</script>
