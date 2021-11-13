<template>
  <span>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="主机标签" prop="label">
          <el-input v-model="form.label" name="label"></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input-number
            v-model="form.port"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="密码提示" prop="pass_hint">
          <el-input v-model="form.pass_hint"></el-input>
        </el-form-item>
        <el-form-item label="密码类型">
          <el-switch
            v-model="form.pass_type"
            active-value="password"
            inactive-value="private_key"
            active-text="密码"
            inactive-text="秘钥"
          ></el-switch>
        </el-form-item>
        <el-form-item :label="form.pass_type == 'password' ? '密码' : '秘钥'">
          <el-input
            type="password"
            show-password
            v-model="form.password"
            placeholder="请输入密码"
            v-if="form.pass_type == 'password'"
          ></el-input>
          <el-input
            v-if="form.pass_type == 'private_key'"
            readonly
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="form.private_key"
          >
          </el-input>
          <el-upload
            v-if="form.pass_type == 'private_key'"
            action="/"
            :before-upload="beforeRrivateKeyUpload"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">选择秘钥文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加主机</el-button>
          <el-button @click="close_host_form()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>

<script>
import request from "../common/request";
import encrypt from "../common/encrypt";
export default {
  data() {
    return {
      rules: {
        label: [
          { required: true, message: "主机标签不能为空", trigger: "blur" },
        ],
      },
      form: this.initFormData(),
      dialogTableVisible: false,
      encrypt_pwd: "",
      edit_mode:'add'
    };
  },
  methods: {
    close_host_form() {
      this.dialogTableVisible = false;
    },
    initFormData() {
      return {
        id:0,
        grp_id: 6,
        order: 1,
        label: "",
        ip: "127.0.0.1",
        port: "22",
        pass_hint: "",
        name: "root",
        pass_type: "password",
        password: "",
        private_key: "",
        remark: "这台服务器的mysql密码是:balala",
        extra: "{}",
      };
    },
    edit(data) {
      this.edit_mode = 'edit';
      for(let x in data) {
        if(x in this.form) {
          this.form[x] = data[x];
        }
      }
      this.dialogTableVisible = true;
    },
    add() {
      this.edit_mode = 'add';
      this.form = this.initFormData();
      this.dialogTableVisible = true;
    },
    getStrFromFile(oFile) {
      // if (!oFile.type.startsWith('text/')) return ''; // 非法文件排除
      let resolveFn;
      const oPromise = new Promise((resolve) => (resolveFn = resolve));
      // ▼ new 一个 FileReader
      // ▼ 然后监听 onload 事件，从中取得文本内容
      const oReader = Object.assign(new FileReader(), {
        onload() {
          resolveFn(this.result);
        },
      });
      oReader.readAsText(oFile);
      return oPromise;
    },
    encrypt_in() {
      let r = Object.assign({}, this.form);
      //r.name = encrypt.encrypt(r.name, this.encrypt_pwd);
      if (this.form.pass_type == "private_key") {
        r.password = encrypt.encrypt(this.form.private_key, this.encrypt_pwd);
      } else {
        r.password = encrypt.encrypt(this.form.password, this.encrypt_pwd);
      }
      return r;
    },
    decrypt_out() {},
    beforeRrivateKeyUpload(file) {
      let that = this;
      this.getStrFromFile(file).then((txt) => {
        //console.log(txt)
        that.form.private_key = txt;
      });
      return false;
    },
    onSubmit() {
      let that = this;
      this.encrypt_pwd = localStorage.getItem("encrypt_pwd");
      if (!this.encrypt_pwd) {
        that.$message.error("加密密码不能为空");
        return;
      }

      if (!this.form.label) {
        this.$message("LABEL不能为空");
        return;
      }

      request
        .post("http://www.yunqigai.cn/api/terminalive/" + (this.edit_mode == 'add' ? 'addHost' : 'editHost'), this.encrypt_in(), {
          header: {
            "Content-Type": "application/json", //如果写成contentType会报错
          },
        })
        .then(function (res) {
          console.log(res);
          if (res.code == 200) {
            that.$message.success("添加成功");
            // this.$message({
            //   message: '添加成功',
            //   type: 'success'
            // });
          } else {
            that.$message.error("添加失败");
          }
          that.close_host_form();
        });
    },
  },
  mounted() {},
};
</script>