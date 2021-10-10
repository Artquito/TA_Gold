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

    <a-table :dataSource="data" :columns="columns" />
    
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
          barang_nama: "Mike",
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
