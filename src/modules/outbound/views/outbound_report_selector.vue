<template>
  <a-breadcrumb style="margin: 30px 0">
    <a-breadcrumb-item>
      <ShoppingCartOutlined />
      Outbound
    </a-breadcrumb-item>
    <a-breadcrumb-item>Outbound Report</a-breadcrumb-item>
  </a-breadcrumb>
  <!-- this is the controls -->
  <a-row type="flex" justify="start" style="margin-bottom: 30px">
    <a-input-search
      justify="right"
      placeholder="Search item"
      v-model:value="search_bar"
      style="width: 200px"
      size="medium"
    ></a-input-search>
  </a-row>
  <!-- this is the data display -->
  <a-list
    :grid="{ gutter: [32, 8], column: 4 }"
    :dataSource="data"
    :pagination="pagination"
    style="padding-bottom: 50px"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card
          :title="item.title"
          :headStyle="{ background: '#1b5292', color: '#f0f2f5' }"
        >
          <ul class="card-content">
            <li>
              <a-descriptions
                bordered
                :labelStyle="{ fontWeight: 'bold' }"
                layout="horizontal"
                :column="3"
                size="small"
              >
                <a-descriptions-item label="ID" :span="3"
                  >O1</a-descriptions-item
                >
                <a-descriptions-item label="Time" :span="3"
                  >12:10 PM</a-descriptions-item
                >
                <a-descriptions-item label="Value" :span="3"
                  >Rp.100,000,000</a-descriptions-item
                >
                <a-descriptions-item label="Item" :span="3"
                  >6</a-descriptions-item
                >
                <a-descriptions-item label="PIC" :span="3"
                  >admin</a-descriptions-item
                >
              </a-descriptions>
            </li>
            <li class="details">
              <a @click="showDetails()">more</a>
              <a-button v-if="false" :block="true" type="primary">Details</a-button>
              <!-- <a-popconfirm
                class="button"
                ok-text="Yes"
                cancel-text="No"
                placement="right"
                @confirm="cancelReport()"
              >
                <template #title>
                  <p>
                    Warning! Cancelling a report requires permission from
                    supervisor.<br />
                    Are you sure you want to cancel this report?
                  </p>
                </template>
                <a-button> Cancel Report </a-button>
              </a-popconfirm> -->
            </li>
          </ul>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script>
import { ShoppingCartOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    ShoppingCartOutlined,
  },
  data() {
    return {
      search_bar: "",
      cancel_warning_message: "",
      user_id:"1",
      pagination: {
        onChange(page) {
          console.log(page);
        },
        pageSize: 8,
      },
      data: [
        {
          title: "Title 1",
        },
        {
          title: "Title 2",
        },
        {
          title: "Title 3",
        },
        {
          title: "Title 4",
        },
        {
          title: "Title 5",
        },
        {
          title: "Title 6",
        },
        {
          title: "Title 7",
        },
        {
          title: "Title 8",
        },
        {
          title: "Title 9",
        },
      ],
    };
  },
  methods: {
    showDetails() {
      this.$router.push({path:`report/${this.user_id}`});
    },
  },
};
</script>

<style scoped>
.card-content {
  list-style-type: none;
  padding: 0;
}
.card-content {
  margin: 0;
}
.card-content li:not(:nth-last-child(1)) {
  margin-bottom: 16px;
}
.card-content .button {
  width: 118px;
  margin-right: 10px;
}
.details{
  text-align: right;
}
</style>
