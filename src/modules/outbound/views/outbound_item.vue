<template>
  <a-breadcrumb style="margin:30px 0">
    <a-breadcrumb-item>
      <ShoppingCartOutlined/>
      Outbound
    </a-breadcrumb-item>
    <a-breadcrumb-item>Items</a-breadcrumb-item>
  </a-breadcrumb>

  <a-row type='flex' style="margin-bottom:30px" >
    <a-colum :flex="8">
      <a-input-search></a-input-search>
    </a-colum>
    <a-column :flex="2">
      <a-button>Add Item</a-button>
    </a-column>
    <a-column :flex="2">
      <a-button>Post Report</a-button>
    </a-column>
  </a-row>
  
</template>

<script>
import {ShoppingCartOutlined} from '@ant-design/icons-vue'
export default {
  components:{
    ShoppingCartOutlined,
  },
  data() {
    return {
      
    }
  },
}
</script>

<style>

</style>