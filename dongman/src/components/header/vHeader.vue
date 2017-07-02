<template>
  <div>
    <!--头部-->
    <div id="header">
      <div class="quanbu">
        <div class="daohang">
          <div class="banxin">
            <div class="neirong">
              <span>
                <router-link to='/'>首页</router-link>
              </span>
              <span>
                <router-link to="/chatRoom">聊天室</router-link>
              </span>
              <div class="user">
                <p class="huanyin" v-if="homeUser" @mouseover="showtuichu" @mouseout="nshowtuichu">
                  <span>您好，{{homeUser}}</span>
                  <span id="tuichu" @click="tuichu">退出登录</span>
                </p>
                <span v-else class="login">
                  <router-link to='/user'>登录</router-link>
                </span>
                <span>
                  <router-link to='/admin/login'>进入后台管理系统</router-link>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="sousuo">
          <div class="xd">
            <input type="text" name="" value="" class="btn">
            <button type="button"></button>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'vHeader',
  computed: {
    homeUser() {
      return this.$store.state.homeUser
    }
  },
  methods: {
    showtuichu() {
      let tuichu = document.querySelector('#tuichu')
      tuichu.style.display = 'inline-block'
    },
    nshowtuichu(){
      let tuichu = document.querySelector('#tuichu')
      tuichu.style.display = 'none'
    },
    tuichu(){
      localStorage.homeUser=''
      this.$store.state.homeUser = ''
    }
  }
}
</script>

<style scoped>
.login {
  background-color: #f25d8e;
}

.huanyin {
  display: inline-block;
  color: #f25d8e;
  /*background-color: rgba(0, 0, 0, 0);*/
}

.huanyin #tuichu {
  padding-top: 15px;
  position: absolute;
  cursor: pointer;
  display: none;
  color: #000;
  background-color: rgba(255, 255, 255, .5);
}
.huanyin span:hover {
  background-color: rgba(0, 0, 0, 0)!important;
}

.btn {
  background-color: rgba(255, 255, 255, 0.7);
  color: #000;
  font-size: 14px;
}
</style>

