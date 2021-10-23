<template>
  <div class="container">
    <!-- Breadcrumbs -->
    <div class="breadcrumbs" style="margin: 30px 0px">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <AppstoreOutlined />
          Order
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link to="order/pembelian">Pembelian</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 
      Card of Data 
    -->
    <div>
      <a-row :gutter="16">
        <!-- Order Pembelian Selesai -->
        <a-col class="gutter-row" :span="8">
          <a-card
            size="small"
            :loading="!order_data.statistics.selesai"
            title="Order Pembelian Selesai"
          >
            <span style="font-size: 25px">
              {{
                formatRupiah(
                  order_data.statistics.selesai.jumlah_pembayaran_order,
                  "Rp."
                )
              }}
            </span>
          </a-card>
        </a-col>

        <!-- Order Pembelian Menunggu -->
        <a-col class="gutter-row" :span="8">
          <a-card
            size="small"
            :loading="!order_data.statistics.menunggu"
            title="Order Pembelian Menunggu"
          >
            <span style="font-size: 25px">
              {{
                formatRupiah(
                  order_data.statistics.menunggu.jumlah_pembayaran_order,
                  "Rp."
                )
              }}
            </span>
          </a-card>
        </a-col>

        <!-- Order Pembelian Jatuh Tempo -->
        <a-col class="gutter-row" :span="8">
          <a-card
            size="small"
            :loading="!order_data.statistics.jatuh_tempo"
            title="Order Pembelian Jatuh Tempo"
          >
            <span style="font-size: 25px">
              {{
                formatRupiah(
                  order_data.statistics.jatuh_tempo.jumlah_pembayaran_order,
                  "Rp."
                )
              }}
            </span>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- Input and Button -->
    <a-row justify="end" type="flex" style="margin: 30px 0px">
      <a-col flex="8">
        <a-input-search
          justify="right"
          placeholder="input search text"
          style="width: 200px"
          v-model:value="search_bar"
          size="medium"
        />
      </a-col>
      <a-col flex="1">
        <a-space :size="12">
          <a-button type="primary">
            <CloudDownloadOutlined />
            Import CSV
          </a-button>
          <a-button type="primary"> Buat Pembelian Baru </a-button>
        </a-space>
      </a-col>
    </a-row>

    <a-table
      :columns="columns"
      :dataSource="order_data.data"
      :scroll="{ x: 1300 }"
      bordered
      class="change-color"
      style="padding-bottom: 100px; margin-top: 10px; z-index: -9999"
    >
      <template #action="{ record }">
        <div>
          <span>
            <form-pelanggan
              :cIsInputing="false"
              :cApiParameters="record"
              @getData="getData()"
            ></form-pelanggan>
          </span>
        </div>
      </template>
      <template #status="{ record }">
        <a-badge status="success" :text="record.status" />
      </template>
      <template #biaya="{ record }">
        {{ formatRupiah(record.biaya, "Rp. ") }}
      </template>
    </a-table>
  </div>
</template>

<script>
import { AppstoreOutlined, CloudDownloadOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    AppstoreOutlined,
    CloudDownloadOutlined,
  },
  data() {
    return {
      order_data: {
        statistics: {
          selesai: {
            jumlah_order: 10,
            jumlah_pembayaran_order: 895000,
          },
          menunggu: {
            jumlah_order: 10,
            jumlah_pembayaran_order: 112000,
          },
          jatuh_tempo: {
            jumlah_order: 10,
            jumlah_pembayaran_order: 21000,
          },
        },
        data: [
          {
            key: "OR/PEMB/221101",
            status: "selesai",
            tanggal_jatuh_tempo: "20/2/2021",
            nama: "Toko A",
            biaya: 1010000,
          },
        ],
      },

      columns: [
        {
          title: "Actions",
          dataIndex: "action",
          key: "action",
          width: 100,
          slots: { customRender: "action" },
        },
        {
          title: "ID",
          dataIndex: "key",
          Key: "key",
          width: 150,
        },
        {
          title: "Status",
          dataIndex: "status",
          Key: "status",
          width: 200,
          slots: { customRender: "status" },
        },
        {
          title: "Tanggal Jatuh Tempo",
          dataIndex: "tanggal_jatuh_tempo",
          Key: "tanggal_jatuh_tempo",
          width: 200,
        },
        {
          title: "Nama Supplier/Pemasok/Toko",
          dataIndex: "nama",
          Key: "nama",
          width: 300,
        },
        {
          title: "Biaya",
          dataIndex: "biaya",
          Key: "biaya",
          width: 150,
          slots: { customRender: "biaya" },
        },
      ],
    };
  },
  methods: {
    formatRupiah: function (angka, prefix) {
      angka = angka.toString();
      var number_string = angka.replace(/[^,\d]/g, "").toString();
      var split = number_string.split(",");
      var sisa = split[0].length % 3;
      var rupiah = split[0].substr(0, sisa);
      var ribuan = split[0].substr(sisa).match(/\d{3}/gi);
      var separator;

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    },
  },
};
</script>
