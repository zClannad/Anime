<template>
  <div>
    <vHeader></vHeader>
    <Jinri :mokuai='jinri'></Jinri>
    <Mokuai :mokuai='lianzai'></Mokuai>
    <vFooter></vFooter>
  </div>
</template>

<script>
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
            'dmId': 10001,
            'name': '声之形',
            'leibie': 'dianying',
            'img': '../../../static/image/dm/u=4055345103,1304936034&fm=11&gp=0.jpg',
            'biaoqian': ['青春', '恋爱'],
            'niandai': 2017,
            'jianjie': '《声之形》是由日本漫画家大今良时创作的漫画作品， 故事主题是没法用声音交流来传达自己的想法， 故事以男主角石田将也的视角出发， 讲述一位患有听力障碍的女生西宫硝子在学校备受霸凌， 得不到友情和关爱，后来男主良心发现，帮助她找到幸福。',
            'pingfen': '8.0',
            'show': false
          }, {
            'dmId': 10002,
            'name': '寒蝉鸣泣之时',
            'liebie': 'wangjie',
            'img': '../../../static/image/dm/u=3675579502,3667344603&fm=23&gp=0.jpg',
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
          'xianshi': [
            { 'dmId': 20003, 'name': '路人女主', 'img': '../../../static/image/dm/1_1513546561.jpg' },
            { 'dmId': 20004, 'name': '末日时', 'img': '../../../static/image/dm/1_1545555011.jpg' },
            { 'dmId': 20005, 'name': '重启', 'img': '../../../static/image/dm/1_1609124641.jpg' },
            { 'dmId': 20006, 'name': '月色', 'img': '../../../static/image/dm/5ce66f68d54052e3a305524b9b06a76977e974fc.jpg_225x300.jpg' },
            { 'dmId': 20007, 'name': '不正经', 'img': '../../../static/image/dm/1_1650306201.jpg' },
            { 'dmId': 20008, 'name': '艾罗曼', 'img': '../../../static/image/dm/a223b1376633625be1cd214c34d8bf34a1e03770.jpg_225x300.jpg' },
            { 'dmId': 20009, 'name': '全职高手', 'img': '../../../static/image/dm/dy_937de0260851d7462ebe3bd898461bbe.jpg' },
            { 'dmId': 20000, 'name': 'RE:CRATORS', 'img': '../../../static/image/dm/1_1527434431.jpg' }
          ],
          'paihan': [
            { 'dmId': 20003, 'name': '艾罗曼啊', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': 'RE:creators', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': '恋爱暴君', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': '博人传', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': '时钟机关', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': '月色真美', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': '夏目', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': '从零魔法', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': '小林', 'pingfen': '8.0' },
            { 'dmId': 20003, 'name': '雏子的笔记', 'pingfen': '8.0' },
          ]
        }
      }
    }
  },
  components: { vHeader, vFooter, Jinri, Mokuai }

}
</script>
