<template>
  <div>
    <a-layout-header
      style="
      padding: 15px 0px 0px 70px;
      border-bottom: 2px solid #1b5292; 
      background-color: white;"
    >
      <a-typography-title
      :level="3"
      style="margin:0"
      >
      Jaya Abadi
      </a-typography-title>
    </a-layout-header>
    
    <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      style="padding: 0 50px; margin-bottom:30px"
    >
      <a-menu-item key="/">Dashboard</a-menu-item>
      <a-sub-menu>
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Master Data</template>
        <a-menu-item key="/master/barang">Master Barang</a-menu-item>
        <a-menu-item key="/master/supplier">Master Supplier</a-menu-item>
        <a-menu-item key="/master/pelanggan">Master Pelanggan</a-menu-item>
      </a-sub-menu>
      <a-sub-menu>
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Order Pembelian</template>
        <a-menu-item key="/order/pembelian">Daftar Order Pembelian</a-menu-item>
        <a-menu-item key="/order/pembelian/baru">Order Pembelian Baru</a-menu-item>
      </a-sub-menu>
      <a-sub-menu>
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Order Penjualan</template>
        <a-menu-item key="order_form_pos">Point Of Sales</a-menu-item>
        <a-menu-item key="order_form_penjualan">Order Penjualan Baru</a-menu-item>
        <a-menu-item key="order_list_penjualan">Daftar Order Penjualan</a-menu-item>
      </a-sub-menu>
    </a-menu>

  </div>
</template>

<script>
import { AppstoreOutlined } from "@ant-design/icons-vue";
export default {
  watch: {
    current: function (val) {
      if (val == "/") {
        this.$router.replace("/");
      } else {
        this.$router.replace(val.toString());
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
  },
};
</script>
