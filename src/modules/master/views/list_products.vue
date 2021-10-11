<template>
  <div>
    <div class="breadcrums" style="margin:30px 0px">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <AppstoreOutlined />
          Master Data
        </a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Master Barang</a></a-breadcrumb-item>
      </a-breadcrumb>
  </div>
   
    <a-row justify="end" type="flex" style="margin:10px 0px">
      <a-col flex="5">
        <a-input-search
        justify="right"
        placeholder="input search text"
        style="width: 200px"
        />
      </a-col>
      
      <a-col>
        <a-button type="primary" flex="2" @click="visible=true">
          <PlusOutlined :style="{fontSize: '1.1em'}"/>
          Tambah Barang
        </a-button>
        <a-modal v-model:visible="visible" title="Forum Input Barang">
          <template #footer>
              <a-button key="back">Batal</a-button>
              <a-button key="submit" type="primary" >Tambah</a-button>
          </template>
          <a-form layout="vertical">
            <a-form-item label="Nama Barang">
              <a-input placeholder="Input nama barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Merek">
              <a-input placeholder="Input merek barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Varian">
              <a-input placeholder="Input varian barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Satuan Grosir">
              <a-input placeholder="Input satuan grosir barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Satuan Eceran">
              <a-input placeholder="Input satuan eceran barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Harga Beli Grosir">
              <a-input placeholder="Input harga beli grosir barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Harga Jual Grosir">
              <a-input placeholder="Input harga jual grosir barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Harga Beli Eceran">
              <a-input placeholder="Input beli eceran barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Harga Jual Eceran">
              <a-input placeholder="Input jual eceran barang">
              </a-input>
            </a-form-item>
            <a-form-item label="Stok Gudang">
              <a-input placeholder="Input stok gudang">
              </a-input>
            </a-form-item>
            <a-form-item label="Stok Toko">
              <a-input placeholder="Input stok toko">
              </a-input>
            </a-form-item>
          </a-form>
        </a-modal>
      </a-col>
    </a-row>

    <a-table :dataSource="data" :columns="columns" :scroll="{ x: 1800}" bordered />
    
  </div>
</template>

<script>
import { PlusOutlined, AppstoreOutlined } from "@ant-design/icons-vue";
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
          gudang_stok:"10",
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
          dataIndex: "nama",
          key: "nama",
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
          dataIndex: "satuan_grosir",
          key: "satuan_grosir",
        },
        {
          title: "Satuan Eceran",
          dataIndex: "satuan_eceran",
          key: "satuan_eceran",
        },
        {
          title: "Harga Beli Grosir",
          dataIndex: "harga_beli_grosir",
          key: "harga_beli_grosir",
        },
        {
          title: "Harga Jual Grosir",
          dataIndex: "harga_jual_grosir",
          key: "harga_jual_grosir",
        },
        {
          title: "Harga Beli Eceran",
          dataIndex: "harga_beli_eceran",
          key: "harga_beli_eceran",
        },
        {
          title: "Harga Jual Eceran",
          dataIndex: "harga_jual_eceran",
          key: "harga_jual_eceran",
        },
        {
          title: "Stok Gudang",
          dataIndex: "stok_gudang",
          key: "stok_gudang",
        },
        {
          title: "Stok Toko",
          dataIndex: "stok_toko",
          key: "stok_toko",
        },
      ],
      visible : false,
    };
  },
  components: {
    PlusOutlined,
    AppstoreOutlined
  },
};
</script>
