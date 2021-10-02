<template>
  <a-menu
    v-model:selectedKeys="current"
    mode="horizontal"
    style="padding: 0 50px"
  >
    <a-menu-item key="dashboard">Dashboard</a-menu-item>
    <a-sub-menu>
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>Master Data</template>
      <a-menu-item key="master_barang">Master Barang</a-menu-item>
      <a-menu-item key="master_supplier">Master Supplier</a-menu-item>
    </a-sub-menu>
    <a-sub-menu>
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>Order Pembelian</template>
      <a-menu-item key="order_list_pembelian"
        >Daftar Order Pembelian</a-menu-item
      >
      <a-menu-item key="order_form_pembelian"
        >Order Pembelian Barur</a-menu-item
      >
    </a-sub-menu>
    <a-sub-menu>
      <template #icon>
        <AppstoreOutlined />
      </template>
      <template #title>Order Penjualan</template>
      <a-menu-item key="order_form_pos">Point Of Sales</a-menu-item>
      <a-menu-item key="order_form_penjualan">Order Penjualan Baru</a-menu-item>
      <a-menu-item key="order_list_penjualan"
        >Daftar Order Penjualan</a-menu-item
      >
    </a-sub-menu>
  </a-menu>
  {{ current }}
</template>

<script>
import { AppstoreOutlined } from "@ant-design/icons-vue";
export default {
  watch : {
    current : () => {
      alert("tes")
    }
  },
  data() {
    return {
      current: ["dashboard"],
    };
  },
  components: {
    AppstoreOutlined,
  },
};
</script>
