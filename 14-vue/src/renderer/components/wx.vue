<template>
  <div v-loading.fullscreen.lock='fullscreenLoading'>
    <img v-if="ewm_src" :src="ewm_src">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: '',
  data(){
    return {
        fullscreenLoading: true,
        ewm_src: false,
        login_fail_count:0
      }
  },
  components: {},
  methods: {
    watchLoginState(state){
      let that = this;
      axios.get('http://www.yunqigai.cn/api/wx/info?state='+state)
      .then(function(res){
          console.log(res.data);
          if(res.data.code == 200) {
            localStorage.setItem('token',res.data.data);
            that.$router.push("/shell_list");
          } else {
            setTimeout(() => {
              that.watchLoginState(state);
            }, 50);
          }
          
      }).catch(function (error) {
        console.log(error);
        that.login_fail_count++;
        if(that.login_fail_count < 10) {
          setTimeout(() => {
            that.watchLoginState(state);
          }, 50);
        } else {
          this.$message.error('获取登陆状态错误超过10次');
        }
      });
    }
  },
  mounted(){
    let that = this;
     axios.get('http://www.yunqigai.cn/api/wx/login?raw')     
     .then(function(res){
       that.fullscreenLoading = false;
       that.ewm_src = 'http://www.yunqigai.cn/api/wx/ewm?state='+res.data.data;
       that.watchLoginState(res.data.data);
       //console.log(res.data);
     }).catch(function (error) {
      console.log(error);
    });
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
