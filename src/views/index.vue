<template>
  <div>
    <Navbar />
    <div style="padding: 0 50px">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import { notification } from "ant-design-vue";
import Navbar from "./Navbar.vue";
import Footer from "./footer.vue";
export default {
  name: "Index",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      userIsLoggedIn: "",
    };
  },
  methods: {
    handleException: function () {
      this.userIsLoggedIn = sessionStorage.getItem("authorization");
      if (this.userIsLoggedIn != "success") {
        this.$router.replace("/login");
        notification["error"]({
          message: "Waktu Login Habis",
          description:
            "Silahkan login kembali",
        });
      } else {
        console.log("didn't work");
      }
    },
  },
  created() {
    this.userIsLoggedIn = sessionStorage.getItem("authorization");
    this.handleException();
  },
};
</script>
