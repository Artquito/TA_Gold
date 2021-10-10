<template>
  <div>

    <a-row justify="end" type="flex" style="margin:10px 0px">
      <AppstoreOutlined />
      <a-col flex="5">
        <a-input-search
        justify="right"
        placeholder="input search text"
        style="width: 200px"
        />
      </a-col>
      
      <a-col>
        <a-button type="primary" flex="2">
          <PlusOutlined :style="{fontSize: '1.1em'}"/>
          Tambah Barang
        </a-button>
      </a-col>
    </a-row>

    <a-table :dataSource="data" :columns="columns" :scroll="{ x: 1800}" bordered />
    
  </div>
</template>

<script>
import { PlusOutlined,DownloadOutlined } from "@ant-design/icons-vue";
export default {
  data() {
    return {
      
      data: [
        {
          id: "1",
          barang_nama: "Karburator",
          merek:"Honda",
          varian:"G108",
          grosir_satuan:"bal",
          eceran_satuan:"pcs",
          grosir_harga_beli:"1,000,000",
          grosir_harga_jual:"1,500,000",
          eceran_harga_beli: "100,000",
          eceran_harga_jual: "200,000",
          awal_stok:"10",
          toko_stok:"100",
        },
      ],

      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Nama Barang",
          dataIndex: "barang_nama",
          key: "barang_nama",
          width:300,
        },
        {
          title: "Merek",
          dataIndex: "merek",
          key: "merek",
        },
        {
          title: "Varian",
          dataIndex: "varian",
          key: "varian",
        },
        {
          title: "Satuan Grosir",
          dataIndex: "grosir_satuan",
          key: "grosir_satuan",
        },
        {
          title: "Satuan Eceran",
          dataIndex: "eceran_satuan",
          key: "eceran_satuan",
        },
        {
          title: "Harga Beli Grosir",
          dataIndex: "grosir_harga_beli",
          key: "grosir_harga_beli",
        },
        {
          title: "Harga Jual Grosir",
          dataIndex: "grosir_harga_jual",
          key: "grosir_harga_jual",
        },
        {
          title: "Harga Beli Eceran",
          dataIndex: "eceran_harga_beli",
          key: "eceran_harga_jual",
        },
        {
          title: "Harga Jual Eceran",
          dataIndex: "eceran_harga_jual",
          key: "eceran_harga_jual",
        },
        {
          title: "Stok Awal",
          dataIndex: "awal_stok",
          key: "awal_stok",
        },
        {
          title: "Stok Toko",
          dataIndex: "toko_stok",
          key: "toko_stok",
        },
      ],
      components:{
        PlusOutlined,
        DownloadOutlined,
      },
    };
  },
  components: {
    PlusOutlined,
  },
};
</script>
