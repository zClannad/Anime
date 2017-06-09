<template>
  <div>
    <el-menu id="nav" theme="dark" class="el-menu-demo" mode="horizontal" :router="true">
      <el-menu-item index="/admin">欢迎页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">查看</template>
        <el-menu-item index="/admin/showAll">查看所有动漫</el-menu-item>
        <el-menu-item index="/">删除</el-menu-item>
      </el-submenu>
      <el-menu-item index="/admin/add">添加数据</el-menu-item>
      <el-menu-item index="/">
        <a href="">订单管理</a>
      </el-menu-item>
      <el-menu-item index="3" @click='loginOut'>退出登录</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    loginOut() {
      localStorage.user=''
      this.$store.state.user = ''
      this.$router.push('/admin/login')
    }
  }
}
</script>

<style>
#nav {
  display: flex;
  justify-content: center;
}
</style>

