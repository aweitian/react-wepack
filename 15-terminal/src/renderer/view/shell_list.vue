<template>
  <div id="container">
    <host-form ref="form"/>
    <el-row id="app-container">
      <el-col :span="4" class="app-left">
        <div class="avatar">
          <img :src="avatar" />
          <br />
          <br />
          <div style="text-align: center">{{ user_name }}</div>
        </div>

        <div style="padding: 1rem">

          <el-button type="primary" @click="add">添加主机</el-button>
          <el-button type="success" @click="showHosts()">主机列表</el-button>
          <el-button type="primary" @click="test">test</el-button>

        </div>
      </el-col>
      <el-col :span="20" class="app-right"> 
          <div style="height:500px;width:500px;border:1px solid red;">
           <session :connection="so_data" />
          </div>
          <host-item :list="hosts" @delok="showHosts" @edit="edit"/>

          
      </el-col>
    </el-row>
  </div>
</template>

<script>
import encrypt from '../common/encrypt';
import request from "../common/request";
import hostForm from "../components/host-form.vue";
import hostItem from "../components/host-item.vue";
import Session from '../components/session.vue';


export default {
  name: "",
  data() {
    return {
      so:false,
      so_data:null,
      avatar: null,
      user_name: null,
      hosts:[]
    };
  },
  components: { hostForm,hostItem, Session },
  methods: {
    test() {
      this.so_data = {
                host:'106.14.168.133',
                port:22,
                username:'root',
                pass_type:'password',
                password:'*****'
      };
      this.so = true;
    },
    edit(item) {
      this.$refs.form.edit(item);
    },
    add(){
      this.$refs.form.add();
    },
    getUserInfo() {
      let that = this;
      request.get("http://www.yunqigai.cn/api/wx/my").then(function (data) {
        if (data.code == 200) {
          that.$store.state.user = data.data.user;
          that.avatar = that.$store.state.user.headimgurl;
          that.user_name = that.$store.state.user.nickname;
          // console.log(that.$store.state);
        } else {
          that.$message.error(data.message);
        }
      });
    },
    showHosts() {
      let that = this;
      request.get("http://www.yunqigai.cn/api/terminalive/getHost").then(function (data) {
        if (data.code == 200) {
          for(var x in data.data.data) {
            // console.log(data.data.data[x].password);
            try {
                data.data.data[x].password = encrypt.decrypt(data.data.data[x].password,localStorage.getItem('encrypt_pwd'))
            }catch(e){
              data.data.data[x].password = '';
            }
            if(data.data.data[x].pass_type == 'private_key') {
              data.data.data[x].private_key = data.data.data[x].password;
              data.data.data[x].password = '';
            }
          }
          
          that.hosts = data.data.data;
        } else {
          that.$message.error(data.message);
        }
      });
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  background-color: #0e0e0e;
  margin: 0px;
  color: #02ba6c;
  height: 100%;
}
#app {
  height: 100%;
}
.avatar {
  width: 6rem;
  height: 6rem;
  margin: 5rem auto;
}
.avatar img {
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
  background: #282b3d;
  height: 100%;
}
.app-right {
  background: #141729;
  height: 100%;
}
#app-container,
#container {
  height: 100%;
}
</style>
