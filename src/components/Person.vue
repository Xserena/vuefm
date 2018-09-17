<template>
 <div class="person">   
    <h1 class="welcome">您好{{currentUser}},快来记录你的生活收支吧&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link :to="{name:'Login'}">退出登录</router-link></h1>
    <el-upload
	  class="avatar-uploader"
	  action="https://jsonplaceholder.typicode.com/posts/"
	  :show-file-list="false"
	  :on-success="handleAvatarSuccess"
	  :before-upload="beforeAvatarUpload">
	  <img v-if="imageUrl" :src="imageUrl" class="avatar">
	  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
	<div class="box">
		<el-row :gutter="20">
		  <el-col :span="6"><div class="grid-content bg-purple" style='background-color: #409EFF'><span @click='router1'>本月收入</span></div></el-col>
		  <el-col :span="6"><div class="grid-content bg-purple" style='background-color: #67C23A'><span @click='router2'>本月支出</span></div></el-col>
		  <el-col :span="6"><div class="grid-content bg-purple" style='background-color: #E6A23C'><span @click='router3'>收支曲线</span></div></el-col>
		  <el-col :span="6"><div class="grid-content bg-purple" style='background-color: #F56C6C'><span @click='router4'>支出曲线</span></div></el-col>
		</el-row>
	</div>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data(){
  	return {
  		currentUser:'',
  		imageUrl: '',
  	}
  },
  mounted() {
    this.getUser()
  },  
  methods:{
  	getUser () {
  		this.currentUser=sessionStorage.getItem("currentUser");
  	},
  	handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
	beforeAvatarUpload(file) {
	    const isJPG = file.type === 'image/jpeg';
	    const isLt2M = file.size / 1024 / 1024 < 2;

	    if (!isJPG) {
	      this.$message.error('上传头像图片只能是 JPG 格式!');
	    }
	    if (!isLt2M) {
	      this.$message.error('上传头像图片大小不能超过 2MB!');
	    }
	    return isJPG && isLt2M;
	},
	router1(){
		this.$router.push({name:"Income"})
	},
	router2(){
		this.$router.push({name:"Output"})
	},
	router3(){
		this.$router.push({name:"IncomeAnalyse"})
	},
	router4(){
		this.$router.push({name:"OutputAnalyse"})
	},
  }
}
</script>
	
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.person{
		width: 50%;
		height:50%;
		position: absolute;
		top:10%;
		right: 15%;
	}
	.welcome{
		margin-bottom: 25px;
		color: #409EFF
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 130px;
  		height:130px;
	    line-height: 130px;
	    text-align: center;
	  }
	  .avatar {
	    width: 130px;
	    height: 130px;
	    display: block;
	    border-radius: 50%;
	  }
	  .box{
	  	position: absolute;
	  	top:200px;
	  	right: 0;
	  	width: 100%;
	  	height:300px;
	  }
	  .box span{
	  	display: inline-block;
	  	line-height:100px; 
	  	font-size: 16px;
	  	font-family: 'YouYuan';
	  	font-weight: bolder;
	  	color: #fff;
	  	cursor: pointer;
	  }
	  .el-row {
	    margin-bottom: 20px;
	    &:last-child {
	      margin-bottom: 0;
	    }
	  }
	  .el-col {
	    border-radius: 4px;
	  }
	  .bg-purple-dark {
	    background: #99a9bf;
	  }
	  .bg-purple {
	    background: #d3dce6;
	  }
	  .bg-purple-light {
	    background: #e5e9f2;
	  }
	  .grid-content {
	    border-radius: 4px;
	    margin-top: 50px;
	    min-height: 100px;
	  }
	  .row-bg {
	    padding: 10px 0;
	    background-color: #f9fafc;
	  }
	  
</style>
