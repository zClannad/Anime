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
                <a href="#">聊天室</a>
              </span>
              <div class="user">
                <p class="huanyin" v-if="homeUser">
                  <span>您好，{{homeUser}}</span>
                </p>
                <span v-else class="login">
                  <router-link to='/user'>登录</router-link>
                </span>
                <span>
                  <a class="ycmusic">显示/隐藏音乐播放器</a>
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

.huanyin span:hover {
  background-color: rgba(0, 0, 0, 0)!important;
}
</style>

