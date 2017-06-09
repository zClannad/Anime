<template>
  <!--今日推荐-->
  <div :id="mokuai.id" class="banxin ty">
    <Biaoti :biaoti='mokuai.biaoti'></Biaoti>
    <div class="neirong">
      <div class="left" v-for="(value,key,index) in mokuai.dongman">
        <!--<h5>{{value}}----{{key}}-----{{index}}</h5>-->
        <!--<h5>{{value.biaoqian}}</h5>-->
        <a href="#" class="img">
          <img :src="value.img" alt="">
          <div class="hbj"></div>
        </a>
        <div class="wenzi">
          <p class="mz">{{value.name}}</p>
          <p class="bq">
            <span>标签:</span>
            <i v-for="bq in value.biaoqian">
              {{bq}}
            </i>
            <span>年代:</span>
            <i>{{value.niandai}}</i>
          </p>
          <p class="jj">
            <span>简介:</span>
            <i>
              {{value.jianjie}}
            </i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Biaoti from './Biaoti'

export default {
  name: 'Jinri',
  data() {
    return {
    }
  },
  components: { Biaoti },
  props: ['mokuai']
}
</script>
