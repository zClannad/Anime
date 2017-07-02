<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" id="addfrom">

    <el-form-item label="动漫名称" prop="name">
      <el-input v-model="ruleForm.name" style="width:60%"></el-input>
    </el-form-item>

    <el-form-item label="类别" prop="leibie">
      <el-radio-group v-model="ruleForm.leibie">
        <el-radio label="连载中"></el-radio>
        <el-radio label="已完结"></el-radio>
        <el-radio label="动漫电影"></el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="标签" prop="biaoqian">
      <el-checkbox-group v-model="ruleForm.biaoqian">
        <el-checkbox :label="v" name="type" v-for="v in biaoqian" :key="v.id"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="年代" prop="niandai">
      <el-select v-model="ruleForm.niandai" placeholder="请选择动漫年代" style="width:60%">
        <el-option :label="v" :value="v" v-for="v in niandai" :key="v.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="简介" prop="jianjie">
      <el-input type="textarea" v-model="ruleForm.jianjie" style="width:60%"></el-input>
    </el-form-item>

    <el-form-item label="评分" prop="pingfen">
      <el-input v-model="ruleForm.pingfen" style="width:60%" placeholder="请填写数字,最大为10"></el-input>
    </el-form-item>

    <el-form-item label="是否在首页显示">
      <el-switch on-text="" off-text="" v-model="ruleForm.show"></el-switch>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // ruleForm: {
      //   name: '',
      //   biaoqian: [],
      //   niandai: 2017,
      //   leibie: '',
      //   jianjie: '',
      //   pingfen: '',
      //   show: true
      // },
      ruleForm:this.$route.params.update,
      rules: {
        name: [
          { required: true, message: '请输入动漫名称', trigger: 'blur' }
        ],
        niandai: [
          { type: 'number', required: true, message: '请选择动漫年代', trigger: 'change' }
        ],
        biaoqian: [
          { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
        ],
        leibie: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        jianjie: [
          { required: false, message: '请填写动漫简介', trigger: 'blur' }
        ],
        // pingfen: [
        //   { message: '请填写数字', trigger: 'change' }
        // ]
      },
      niandai: [1990, 1991, 1992, 1993, 1994, 1995, 1996,
        1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
        2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
        2015, 2016, 2017],
      biaoqian: ["青春", "搞笑", "推理", "热血", "后宫", "科幻",
        "泡面番", "恐怖", "轻改", "催泪", "魔法", "日常"],

    };
  },
  methods: {
    submitForm(formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {console.log(that)
          // alert('submit!');
          // console.log(this.ruleForm);
          var shuju = this.ruleForm;
          axios.get('http://127.0.0.1:3000/update', {
            params: shuju
          })
            .then(function (response) {
              if(response.data==1){
                alert('保存失败')
              }else{
                that.$router.push('./upload/' + response.data.name)
                console.log(response);
              }
            })
            .catch(function (err) {
              alert('保存失败！')
              console.log(err);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // mounted(){
  //   this.fuleFrom = this.$route.params.update;
  //   console.log(this.fuleFrom)
  // }
}
</script>

<style>
#addfrom {
  margin-top: 50px;
}
</style>

