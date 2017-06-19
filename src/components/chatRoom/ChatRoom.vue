<template>
  <div id="bj">
    <div class="hui">
      <router-link to="/">回到首页</router-link>
    </div>
    <div class="messages">
      <!--<ul>
            <li v-for="v in content">
              {{v.user}}-----------{{v.neirong}}
            </li>
          </ul>-->
      <div v-for="v in messages">
        <ul class="other" v-if="!(v.user==user)">
          <li class="user">{{v.user}}</li>
          <li class="content">
            <span>{{v.neirong}}</span>
          </li>
        </ul>
        <ul class="me clearfix" v-else>
          <li class="content">
            <span>{{v.neirong}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="fasong">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="400px">

        <el-form-item label=" ">
          <el-input type="textarea" style="width:300px" autosize placeholder="请输入内容" v-model="formInline.content">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="send">发送</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import io from '../../../static/js/socket.io.js'

export default {
  data() {
    return {
      user:this.$store.state.homeUser,
      socket: '',
      formInline: {
        content: '',
      },
      messages: [],
    }
  },
  computed:{
    user111(){
      return this.$store.state.homeUser
    }
  },
  methods: {
    send() {
      this.socket.emit('chat', {
        user:this.user,
        neirong: this.formInline.content
      })
      this.formInline.content = ''
      return false
    }
  },
  mounted() {
    this.socket = io.connect('http://192.168.191.1:3000')
    // let from = document.querySelector('.sub')
    // from.onsubmit = ()=> {
    //   // console.log(io)
    //   socket.emit('chat', {user:this.$store.state.homeUser,neirong:this.formInline.content})
    //   return false
    // }
    this.socket.on('chat', msg => {
      // console.log(msg)
      this.messages.push(msg)
      // if (msg.user == this.$store.state.homeUser) {
      // } else {
      //   this.other.push(msg)
      // }
    })
    let height = document.body.scrollHeight;
    document.getElementById('bj').style.height = height + 'px'
  }
}
</script>

<style scoped>
#bj {
  width: 100%;
  background: url('../../../static/image/banner.jpg') no-repeat;
}

.hui {
  text-align: right;
  margin-right: 100px;
}

.hui a {
  color: #fff;
}

.messages {
  width: 60%;
  height: 550px;
  border: 1px solid #666;
  margin: 20px auto;
  overflow: auto;
}

.messages .other {
  padding: 1px;
  margin: 10px 0;
}

.user {
  height: 20px;
  color: #a6edd4;
}

.content {
  margin: 0 20px;
}

.content span {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  word-wrap: break-word;
  word-break: break-all;
}

.me li {
  float: right;
}

.me .content span {
  margin: 10px 0;
  color: #fff;
  background-color: #06ccae;
}

.other .content span {
  background-color: #fff;
}

.fasong {
  position: absolute;
  bottom: 0;
}
</style>
