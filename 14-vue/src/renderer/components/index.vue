<template>
  <div></div>
</template>

<script>
import axios from 'axios'

export default {
  name: '',
  data(){
    return {

      }
  },
  components: {},
  methods: {

  },
  mounted(){
    let token = localStorage.getItem('token');
    if(!token) {
      this.$router.push("/wx");
    } else {
      this.$router.push("/shell_list");
    }
  }
}
</script>

<style>
html{
  height: 100%;
}
body{
    background-color:  #0e0e0e;
    margin: 0px;
    height: 100%
}
#app{
  height: 100%;
}
img {
    -webkit-user-select: none;
    margin-top: -92px;
    margin-left: -92px;
    background-color: hsl(0, 0%, 90%);
    transition: background-color 300ms;
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
}
</style>
