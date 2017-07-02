<template>
  <div>
    <vHeader></vHeader>
    <div class="tu">
      <img src="../../../static/image/center.jpg" alt="">
    </div>
    <vFooter></vFooter>
  </div>
</template>

<script>
import vHeader from '@/components/header/vHeader'
import vFooter from '@/components/footer/vFooter'
export default {
  components: { vHeader, vFooter }
}
</script>
<style>
.tu {
  text-align: center;
}
</style>

