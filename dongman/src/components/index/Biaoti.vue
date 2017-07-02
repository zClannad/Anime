<template>
  <div>
    <header>
      <span class="bj"></span>
      <p class="zhuti">{{biaoti}}</p>
      <a href="#" class="gd">更多></a>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Biaoti',
  props: ['biaoti'],
}
</script>
