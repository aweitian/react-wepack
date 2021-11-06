<template>
  <div>
    <img v-if="ewm_src" :src="ewm_src" id="ewm">
  </div>
</template>

<script>
import request from '../common/request'

export default {
  name: '',
  data(){
    return {
        fullscreenLoading: false,
        ewm_src: false,
        login_fail_count:0
      }
  },
  components: {},
  methods: {
    watchLoginState(state){
      let that = this;
      request.get('http://www.yunqigai.cn/api/wx/info?state='+state,{'restrain':true})
      .then(function(data){
          localStorage.setItem('token',data.data);
          that.$router.push("/shell_list");
      }).catch(function (error) {
        that.login_fail_count++;
        if(that.login_fail_count < 10) {
          setTimeout(() => {
            that.watchLoginState(state);
          }, 50);
        } else {
          that.$message.error('获取登陆状态错误超过10次');
        }
        return this;
      });
    }
  },
  mounted(){
    let that = this;
     request.get('http://www.yunqigai.cn/api/wx/login?raw')     
     .then(function(data){
       console.log(data);
       that.fullscreenLoading = false;
       that.ewm_src = 'http://www.yunqigai.cn/api/wx/ewm?state='+data.data;
       that.watchLoginState(data.data);
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
img#ewm {
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
