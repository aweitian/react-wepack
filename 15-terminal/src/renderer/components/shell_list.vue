<template>
  <div id="container">
    

    <el-row id="app-container">
      <el-col :span="4" class="app-left">
        <div class="avatar">
          <img :src="avatar">
          <br>
          <br>
          <div style="text-align:center">{{user_name}}</div>
        </div>

      </el-col>
      <el-col :span="20" class="app-right">
        

      </el-col>
    </el-row>

  </div>
</template>

<script>
import request from '../common/request'

export default {
  name: '',
  data(){
    return {
        avatar: null,
        user_name: null,

      }
  },
  components: {},
  methods: {
    getUserInfo(){
      let that = this;
      request.get('http://www.yunqigai.cn/api/wx/my')
      .then(function(data){
        if(data.code == 200) {
          that.$store.state.user = data.data.user;
          that.avatar = that.$store.state.user.headimgurl;
          that.user_name = that.$store.state.user.nickname;
          console.log(that.$store.state);
        } else {
          that.$message.error(data.message);
        }
      })
    }
  },
  mounted(){
    this.getUserInfo();
  }
}
</script>

<style lang="scss">

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
.avatar {
  width: 6rem;
  height: 6rem;
  margin: 5rem auto;
}
.avatar img{
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-col {
  border-radius: 0px;
}
.app-left {
  // background: #0a0002;
  height: 100%;
}
.app-right {
  background: #131518;
  height: 100%;
}
#app-container,#container{
  height: 100%;
}

</style>
