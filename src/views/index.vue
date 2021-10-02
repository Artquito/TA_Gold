<template>
  <div>
    <Navbar/>
    <div style="padding: 0 50px">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "Index",
  components: {
    Navbar,
  },
};
</script>
