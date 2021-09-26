<template>
  <div id="nav">
    <a-dropdown>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <a href="edit123"><EditOutlined /> Edit</a>
          </a-menu-item>
          <a-menu-item key="2">
            <a href="#"><TrashOutlined /> Edit</a>
          </a-menu-item>
        </a-menu>
      </template>
      <a-button> Aksi <DownOutlined /></a-button>
    </a-dropdown>
    <router-view />
  </div>
</template>

<script>
import { DownOutlined, EditOutlined } from "@ant-design/icons-vue";
export default {
  setup() {
    const handleButtonClick = (e) => {
      console.log("click left button", e);
    };
    const handleMenuClick = (e) => {
      console.log("click", e);
    };
    return {
      handleButtonClick,
      handleMenuClick,
    };
  },
  components: {
    DownOutlined,
    EditOutlined,
  },
};
</script>

<style></style>
