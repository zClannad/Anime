<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="loginform">

    <el-form-item label="用户名" prop="user">
      <el-input v-model="ruleForm.user" style="width:60%"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" auto-complete="off" style="width:60%"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import axios from '../../router/axios.js'
export default {
  data() {
    var checkUser = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('用户名不能为空'));
      }
      else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        user: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ]
      }
    };
  },
  computed:{
    user(){
      console.log(this.$store.state.user)
      return this.$store.state.user
    }
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(that.ruleForm)
          // 登录请求
          axios.post('http://127.0.0.1:3000/adminlogin', {
            user: that.ruleForm.user,
            pass: that.ruleForm.pass
          })
            .then(function (res) {
              // console.log(res+'11111111111');//admin
              if (res.data == 1) {
                that.ruleForm.pass = ''
                alert("登录失败")
                return
              }
              // 调用vuex中的isLogin方法
              that.$store.commit('isLogin',res.data);
              that.$router.push('/admin')
              that.ruleForm.user = ''
              that.ruleForm.pass = ''
            })
            .catch(function (err) {
              alert("登录失败")
              that.ruleForm.pass = ''
              console.log(err+'*************');
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  //钩子函数(实例创建完成，有属性，还没dom)
  created(){
    if(this.user){
      console.log(this)
      this.$router.replace('/admin')
      return
    }
  }
}
</script>

<style>
.loginform {
  width: 80%;
  margin-top: 140px;
}
</style>
