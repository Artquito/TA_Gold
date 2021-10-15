<template>
  <div>
    <Navbar/>
    <div style="padding: 0 50px">
      <router-view />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Footer from "./footer.vue";
export default {
  name: "Index",
  components: {
    Navbar,
    Footer,
  },
};
</script>
