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
          <a-button type="primary" @click="importIsVisible = true">
            <CloudDownloadOutlined />
            Import CSV
          </a-button>
          <a-button type="primary" @click="importIsVisible = true">
            <CloudDownloadOutlined />
            Import CSV
          </a-button>
        </a-space>
      </a-col>
    </a-row>

    <a-table
      :columns="columns"
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
    </a-table>
  </div>
</template>

<script>
import { AppstoreOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    AppstoreOutlined,
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
      },

      columns: [
        {
          title: "Actions",
          dataIndex: "action",
          key: "action",
          slots: { customRender: "action" },
        },
        {
          title: "ID",
          dataIndex: "key",
          Key: "key",
          width: 127,
        },
        {
          title: "Nama Supplier/Pemasok",
          dataIndex: "nama",
          Key: "nama",
          width: 300,
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
