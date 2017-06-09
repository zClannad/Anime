<template>
  <div>
    <el-table :data="dmData" border style="width: 100%">
      <el-table-column label="上传时间" width="140">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ gettime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="动漫名" width="130">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
            <!--<span>{{ scope.row.name }}</span>-->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类别" width="80">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.leibie }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标签" width="130">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ str(scope.row.biaoqian) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="年代" width="80">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.niandai }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="评分" width="80">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.pingfen }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="首页显示" width="100">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <span v-if="scope.row.show">显示</span>
            <span v-else>不显示</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="简介" width="200">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.jianjie }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="140">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <img :src="'../../../static/image/uploads/'+scope.row.imgname" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <router-link :to="{name:'update',params:{update:scope.row}}">
            <el-button size="small">编辑</el-button>
          </router-link>
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="8" layout="total, prev, pager, next" :total="dmcount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      //储存数据
      dmData: [],
      // 数据总条数
      dmcount: 0,
      // 初始页
      currentPage1: 1,
    }
  },
  methods: {
    // 删除按钮
    handleDelete(id) {
      let that = this;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get(`http://127.0.0.1:3000/delete?id=${id}`)
          .then(function (res) {
            // console.log(res)
            if (res.data !== 2) {
              that.$message({ type: 'error', message: '删除失败!' });
              return
            }
            that.$message({ type: 'success', message: '删除成功!' });
          })
          .catch(function (err) {
            if (err) {
              that.$message({ type: 'error', message: '删除失败!' });
            }
          });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //根据页码获取数据
    getData(page) {
      // console.log(page)
      var that = this;
      axios.get(`http://127.0.0.1:3000/querypage?page=${page}`)
        .then(function (res) {
          if (res.data == 1) {
            alert("操作失败，请联系系统管理员")
          }
          that.dmData = res.data.result
          that.dmcount = res.data.count
          // console.log(res)
        })
        .catch(function (err) {
          if (err) {
            alert("操作失败，请联系系统管理员")
          }
        });
    },
    // 日期格式化
    gettime(date) {
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
    //把数组转为字符串
    str(arr) {
      return arr.join()
    },
    // 每页条数改变时
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // 换页
    handleCurrentChange(val) {
      this.getData(val);
      // console.log(`当前页: ${val}`);
    }
  },
  // 模板编译完成时的钩子函数，取第一页数据
  mounted() {
    // console.log("这是钩子函数")
    this.getData(1)
  }
}
</script>

<style scoped>
img {
  width: 100px;
}

.block {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
</style>
