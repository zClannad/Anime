<template>
  <div>
    <vHeader></vHeader>
    <div class="banxin">
      <p class="oneline">
        <span class="tubiao"></span>
        <router-link to="/">首页</router-link>
        <b>></b>
        <span>{{dmData.name}}</span>
      </p>
      <div class="neirong">
        <div class="left">
          <div class="tupian">
            <img :src="'../../../static/image/uploads/'+dmData.imgname" alt="">
          </div>
        </div>
        <div class="right">
          <h2>{{dmData.name}}</h2>
          <div class="tou">
            <div class="zuo">
              <p>类别：
                <span>{{dmData.leibie}}</span>
              </p>
              <p>标签：
                <span v-for="val in dmData.biaoqian">{{val}}</span>
              </p>
            </div>
            <div class="you">
              <p>年代：
                <span>{{dmData.niandai}}</span>
              </p>
            </div>
          </div>
          <div class="jianjie">
            <p>
              <span>简介：</span>{{dmData.jianjie}}</p>
          </div>
        </div>
      </div>
      <div class="pinglun">
        <p>评论
          <span class="login" v-if="!$store.state.homeUser">请先登录</span>
        </p>
        <hr>
        <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea">
        </el-input>
        <div class="btn" @click="pinglun">
          <span></span>
        </div>
        <p class="zuixin">最新评论</p>
        <div class="comment">
          <div class="list" v-for="val in dmData.comment">
            <p>
              <span class="name">{{val.user}}</span>
              <span class="riqi">{{getTime(val.time)}}</span>
            </p>
            <p class="plnr">{{val.content}}</p>
            <div class="xian"></div>
          </div>
        </div>
      </div>
    </div>
    <vFooter></vFooter>
  </div>
</template>

<script>
import vHeader from '@/components/header/vHeader'
import vFooter from '@/components/footer/vFooter'
import axios from 'axios'
export default {
  data(){
    return {
      dmData:{},
      textarea:''
    }
  },
  methods:{
    pinglun(){
      if(!this.$store.state.homeUser){
        alert('请先登录')
        return false
      }
      // this.dmData.push()
      let _this = this
      axios.get('http://192.168.191.1:3000/comment',{
        params:{
          name:_this.$route.params.aname,
          user:_this.$store.state.homeUser,
          content:_this.textarea
        }
      })
      .then(function(res){
        if(res.data==1){
          alert('评论失败，请重试')
          return
        }
        _this.dmData.comment.push({
          user:_this.$store.state.homeUser,
          content:_this.textarea,
          time: new Date()
        })
        _this.textarea = ''
        console.log(res)
      })
      .catch(function(err){
        console.log(err)
      })
    },
    // 日期格式化
    getTime(date) {
      // date = Date.parse(date)
      // console.log(date)
      date = new Date(date);
      return date.getFullYear() + "年"
        + (parseInt(date.getMonth()) + 1) + "月"
        + date.getDate() + "日"
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds()
    },
  },
  created(){
    let that = this;
    axios.get(`http://192.168.191.1:3000/details?name=${that.$route.params.aname}`)
    .then(function(res){
      console.log(res)
      if(res.data==1 || res.data==''){
        that.$router.replace('/404')
        return
      }
      that.dmData = res.data
    })
    .catch(function(err){
      console.log(err)
    })
  },
  components: { vHeader, vFooter }
}
</script>

<style scoped>
.banxin {
  width: 1280px;
  margin: 20px auto;
}

.tubiao {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url('../../../static/image/mark.png') no-repeat;
  background-size: 1em
}

.oneline span {
  font-size: 12px;
}

b {
  font-size: 11px;
  color: #666;
}

.neirong {
  display: flex;
  height: 350px;
  padding: 20px 0;
}

.neirong .left {
  width: 280px;
}

.tupian img {
  width: 250px;
  height: 350px;
  border-radius: 5px;
}

h2 {
  color: #FE6600;
}

.neirong .right {
  width: 750px;
}

.neirong .right p {
  padding: 10px 0;
  line-height: 30px;
}

.neirong .right .tou {
  display: flex;
}

.neirong .right .tou .zuo {
  width: 350px;
}
.neirong .right .tou .zuo span {
  padding: 0 3px;
}

.neirong .right .tou p {
  color: #666;
}

.neirong .right .tou span {
  color: #333;
}

.neirong .jianjie {
  color: #555;
}

.pinglun {
  width: 1033px;
}

.pinglun>p {
  padding: 5px;
  color: #f68;
  border-left: 5px solid #cd4;
}

hr {
  margin-bottom: 25px;
}

.pinglun .login {
  float: right;
  cursor: pointer;
}

.btn {
  height: 50px;
}

.btn span {
  display: block;
  margin-top: 20px;
  float: right;
  width: 102px;
  height: 30px;
  background: url('../../../static/image/btn.png') no-repeat;
  cursor: pointer;
}

.comment {
  padding-left: 15px;
}

.comment .list p {
  padding: 10px 0;
}

.comment .list .name {
  color: #f68;
  font-size: 15px;
}

.comment .riqi {
  float: right;
}

.comment .list .plnr {
  font-weight: 300;
}

.comment .list .xian {
  padding: 10px;
  border-bottom: 1px dashed #666;
}
</style>

