<template>
  <div>
    <vHeader></vHeader>
    <Jinri :mokuai='jinri'></Jinri>
    <Mokuai :mokuai='lianzai'></Mokuai>
    <Mokuai :mokuai='wanjie'></Mokuai>
    <Mokuai :mokuai='juchang'></Mokuai>
    <vFooter></vFooter>
  </div>
</template>

<script>
import axios from 'axios'

import vHeader from '@/components/header/vHeader'
import vFooter from '@/components/footer/vFooter'

import Jinri from './Jinri'
import Mokuai from './Mokuai'

export default {
  name: 'Index',
  data() {
    return {
      // 今日推荐
      jinri: {
        'id': 'tuijian',
        'biaoti': '今日推荐',
        'dongman': [
          {
            'name': '声之形',
            'leibie': 'dianying',
            'img': '声之形.jpg',
            'biaoqian': ['青春', '恋爱'],
            'niandai': 2017,
            'jianjie': '《声之形》是由日本漫画家大今良时创作的漫画作品， 故事主题是没法用声音交流来传达自己的想法， 故事以男主角石田将也的视角出发， 讲述一位患有听力障碍的女生西宫硝子在学校备受霸凌， 得不到友情和关爱，后来男主良心发现，帮助她找到幸福。',
            'pingfen': '8.0',
            'show': false
          }, {
            'name': '寒蝉鸣泣之时',
            'liebie': 'wangjie',
            'img': '寒蝉鸣泣之时.jpg',
            'biaoqian': ['致郁'],
            'niandai': 2006,
            'jianjie': '故事发生在昭和58年初夏，在远离都市的山中小村·雏见泽。从大都市搬家到这个人口连2千都不到的村落中的前原圭一，以自己开朗擅于言谈的性格很快与学校的同学打成了一片。他最好的朋友是喜欢照顾人的礼奈、首领一样的班长魅音、陷阱高手的沙都子、古手神社的女儿、有着不可思议的气质的梨花……',
            'pingfen': '8.0',
            'show': false
          }
        ],

      },
      // 连载中
      lianzai: {
        'id': 'lianzai',
        'biaoti': '连载中',
        'dongman': {
          'xianshi': [],
          'paihan': []
        }
      },
      // 已完结
      wanjie: {
        'id': 'wanjie',
        'biaoti': '已完结',
        'dongman': {
          'xianshi': [],
          'paihan': []
        }
      },
      // 动漫剧场版
      juchang: {
        'id': 'juchang',
        'biaoti': '电影剧场版',
        'dongman': {
          'xianshi': [],
          'paihan': []
        }
      },
    }
  },
  methods: {
    requestData(dongman, biaoti) {
      axios.get(`http://192.168.191.1:3000/shouye?biaoti=${biaoti}`)
        .then(function (res) {
          console.log(res)
          dongman.xianshi = res.data.xianshi
          dongman.paihan = res.data.paihan
        })
        .catch(function (err) {
          console.log(err)
        });
    }
  },
  created() {
    // 连载
    this.requestData(this.lianzai.dongman, '连载中')
    // 完结
    this.requestData(this.wanjie.dongman, '已完结')
    this.requestData(this.juchang.dongman, '动漫电影')
  },
  components: { vHeader, vFooter, Jinri, Mokuai }

}
</script>
