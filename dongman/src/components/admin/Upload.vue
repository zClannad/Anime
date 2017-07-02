<template>
  <div id="upload">
    <el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:3000/upload" :data="{'name':$route.params.name}" :auto-upload="false" :on-success="success" :on-error="onError">
      <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M，如果该动漫已有图片，则会覆盖以前的</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [{ name: '', url: '' }]
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    success(res,file,fileList){
      console.log(res);
      if(res==2){
        alert("上传成功");
        this.$router.push('../showAll');
        return
      }
      alert("上传失败");
    },
    onError(err, file, fileList){
      alert("上传失败")
    }
  }
}
</script>

<style>
#upload {
  margin-top: 50px;
  text-align: center;
}
.el-upload-list--text {
  width: 30%;
  margin: auto;
}
</style>
