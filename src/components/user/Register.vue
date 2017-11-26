<template>
  <div>
    <div class="title">
      <span>注册</span>
    </div>
    <div class="loginform">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="30%">

        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm.email" style="width:60%"></el-input>
        </el-form-item>
          <el-form-item label="用户名" prop="user">
            <el-input v-model="ruleForm.user" style="width:60%"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off" style="width:60%"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" size='large'>提交</el-button>
            <router-link to='/user'>
              <el-button size='large'>返回</el-button>
            </router-link>
          </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    // var checkUser = (rule, value, callback) => {
    //   if (value == '') {
    //     return callback(new Error('用户名不能为空'));
    //   }
    //   else {
    //     callback();
    //   }
    // };
    // var validatePass = (rule, value, callback) => {
    //   if (value == '') {
    //     callback(new Error('请输入密码'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm: {
        pass: '',
        user: '',
        email:''
      },
      rules: {
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { validator: checkUser, trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    user() {
      // console.log(this.$store.state.user)
      // return this.$store.state.user
    }
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(that.ruleForm)
          // 登录请求
          axios.post('http://127.0.0.1:3000/userregister', {
            user: that.ruleForm.user,
            pass: that.ruleForm.pass,
            email:that.ruleForm.email
          })
            .then(function (res) {
              // console.log(res+'11111111111');//admin
              if (res.data == 1) {
                that.ruleForm.pass = ''
                alert("注册失败")
                return
              }
              if (res.data == 2) {
                that.ruleForm.pass = ''
                alert("该用户名已存在")
                return
              }
              // 调用vuex中的isHomeLogin方法
              // that.$store.commit('isHomeLogin', res.data);
              alert('注册成功')
              console.log(res.data)
              that.$router.push('/user')
              that.ruleForm.user = ''
              that.ruleForm.pass = ''
              that.ruleForm.email = ''
            })
            .catch(function (err) {
              alert("注册失败")
              that.ruleForm.pass = ''
              console.log(err + '*************');
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  //钩子函数(实例创建完成，有属性，还没dom)
  // created() {
  //   if (this.user) {
  //     console.log(this)
  //     this.$router.replace('/admin')
  //     return
  //   }
  // }
}
</script>

<style scoped>
.title {
  margin: 30px auto;
  text-align: center;
}

.title span {
  font-size: 50px;
  color: #666;
}
</style>
