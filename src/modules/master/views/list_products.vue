<template>
  <div>
      <a-row type="flex" justify="end" style="margin: 10px 0px">
        <a-space>
          <a-button type="primary">
            <template #icon>
            <PlusOutlined />
            </template>  
          </a-button>

          <a-button type="primary" :size="large">
            <template #icon>
              <DownloadOutlined />
            </template>
          </a-button>
        </a-space>
      </a-row>
    <a-table :dataSource="data" :columns="columns" />
  </div>
</template>

<script>
import { PlusOutlined } from '@ant-design/icons-vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
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
};
</script>
