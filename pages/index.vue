<template>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "main",
  mounted(){
    if(this.auth === "staff")
      this.$router.push('/:site/main');
    else if(this.auth === "admin")
      this.$router.push('/:site/admin');
    else if(this.auth === "viewer")
      this.$router.push('/:site/viewer');
    else
      this.$router.push('/login');
    console.log(this.auth)
  },
  computed:{
    ...mapGetters("modules/auth/", ["token", "auth"]),
  }
}
</script>

<style>
.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
