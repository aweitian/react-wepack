<template>
<div style="height:100vh;over-flow:auto">
  <el-row>
    <el-col :span="6" v-for="item in list" :key="item.id">
      <el-card class="box-card" style="position:relative">
            <div style="position: absolute;right:1rem;top:0.5rem; padding: 3px 0;font-size:1.5rem;">

              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-more" style="cursor:pointer"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="edit(item)">编辑</el-dropdown-item>
                  <el-dropdown-item>
                    
                    <el-popconfirm
                      @confirm="del(item.id)"
                      confirm-button-text='好的'
                      cancel-button-text='不用了'
                      icon="el-icon-info"
                      icon-color="red"
                      title="这是一段内容确定删除吗？"
                    >
                      <div slot="reference">删除</div>
                    </el-popconfirm>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </div>


          <div class="text item">
            <h2>{{item.label}}</h2>

            {{item.ip}} : {{item.port}}
            <p style="text-align:right;margin-right:1rem">
              <el-button type="danger">连接</el-button>
            </p>
          </div>
        </el-card>
    </el-col>
  
  </el-row>
</div>

  
</template>

<script>
import request from "../common/request";
import encrypt from "../common/encrypt";
export default {
  props:{
    list:Array
  },
  data() {
    return {
      encrypt_pwd: "",
    };
  },
  methods: {
    edit(item) {
      this.$emit('edit',item);
    },
      del(id) {
        console.log('rel')
          request.delete("http://www.yunqigai.cn/api/terminalive/delHost?id="+id)
          .then(res => {
              //console.log(res)
              this.$emit('delok');
          });
      }
  },
  mounted() {},
};
</script>


<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    /* width: 480px; */
    margin: 0.5rem;;
  }
</style>