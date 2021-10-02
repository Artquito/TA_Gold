<template>
  <div>
    <a-table :dataSource="data" :columns="columns" />
  </div>
</template>

<script>
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
    };
  },
};
</script>
