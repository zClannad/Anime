<template>
  <div>
    <p>
      <span>{{user}}</span>，欢迎来到后台管理系统</p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
p {
  margin: 50px 0;
  text-align: center;
}

span {
  color: #13CE66;
  font-size: 16px;
}
</style>
