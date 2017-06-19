<template>
  <!--连载中-->
  <div :id="mokuai.id" class="banxin ty">
    <!--<header>
            <span class="bj"></span>
            <p class="zhuti">连载中</p>
            <a href="#" class="gd">更多 > </a>
          </header>-->
    <Biaoti :biaoti='mokuai.biaoti'></Biaoti>
    <div class="mokuai">
      <div class="suoyou">
        <div class="lb" v-for="zu in listdongman">
          <div class="dongman" v-for="value in zu">
            <router-link :to="'/aname/'+value.name">
              <img :src="'@/../static/image/uploads/'+value.imgname" alt="">
              <div class="ming">{{value.name}}</div>
            </router-link>
            <a href="#">

            </a>
          </div>
        </div>
      </div>
      <div class="paihan">
        <div class="quanbu">
          <p class="biaoti">排行</p>
          <div class="nr" v-for="(v,k) in mokuai.dongman.paihan">
            <router-link :to="'/aname/'+v.name">
              <span class="active" v-if="k<=2">{{k+1}}</span>
              <span v-else>{{k+1}}</span>
              <span>{{v.name}}</span>
              <span>
                <i>{{v.pingfen}}</i>分</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Biaoti from './Biaoti'

export default {
  name: 'lianzai',
  data() {
    return {
      fzDongman: ''
    }
  },
  //把获得的数据分组
  computed: {
    listdongman() {
      var list = this.mokuai.dongman.xianshi;
      var arrTemp = [];
      var index = 0;
      var meizugeshu = 4;
      for (var i = 0; i < list.length; i++) {
        index = parseInt(i / meizugeshu);
        if (arrTemp.length <= index) {
          arrTemp.push([]);
        }
        arrTemp[index].push(list[i]);
      }
      return arrTemp;
    }
  },
  components: { Biaoti },
  props: ['mokuai']
}
</script>
