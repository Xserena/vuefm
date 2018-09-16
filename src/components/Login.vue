<template>
 <div class="login">
    <div class="form animated bounceInDown">
      <h2>登录</h2>
      <el-row>
        <el-col :span="18" :offset="3" class='col'>
          <el-input id="name"  v-model="name" placeholder="请输入帐号">
            <template slot="prepend">&nbsp;&nbsp;&nbsp;账号&nbsp;&nbsp;&nbsp;</template>
          </el-input> 
        </el-col>
       </el-row>   
       <el-row>
        <el-col :span="18" :offset="3" class='col'>
          <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
            <template slot="prepend">&nbsp;&nbsp;&nbsp;密码&nbsp;&nbsp;&nbsp;</template>
          </el-input>
        </el-col>
       </el-row>
       <el-row>
        <el-col :span="18" :offset="3" class='col'>
          <el-button id="login" v-on:click="login" style="width:100%" type="primary">登录</el-button>
        </el-col>
       </el-row>
       <span class="register">还未注册，先去<router-link :to="{name:'Register'}" class='register_go'>注册</router-link></span>
       <span class="mark">{{mark}}</span>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name:'',
      password:'',
      mark:''
    }
  },
  methods:{
  	login:function () {
      //$axios请求
  		// this.$axios.get('/fmuser.json')
  		// 	.then(res=>{
  		// 		const data=res.data;
  		// 		const users=[];
  		// 		for(let key in data){
  		// 			const user=data[key];
  		// 			users.push(user)
  		// 		}
  		// 		let result=users.filter((user)=>{       //匹配正确返回正确的数组信息，错误，返回空数组
  		// 			return user.name===this.name && user.password==this.password
  		// 		});
  		// 		if (result!=null &&result.length>0) {
  		// 			this.$router.push({name:'Home'})
  		// 		}else{
  		// 			this.mark='账户或密码不正确'
  		// 		}
  		// 	})

      //sessionStorage请求
        let userInfo=sessionStorage.getItem("userInfo");
        let passInfo=sessionStorage.getItem("passInfo");
        if (this.name!='' && this.password!='') {
          if (this.name==userInfo && this.password==passInfo) {
            sessionStorage.setItem('currentUser',this.name);
            sessionStorage.setItem('currentPass',this.password);
            this.$router.push({name:"Home"})
          }else{
            this.mark="用户名或密码不正确";
          }
        }else{
          this.mark="请填写完整";
        }
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    background-image: url('../../static/img/background.png');
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 50px;
    height: 600px;
  }
  .form{
    width: 350px;
    height: 450px;
    margin: auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
  }
  .form .col{
    margin-top: 40px;
  }
  .form h2{
    color: #409EFF
  }
  .register{
    display: block;
    margin-top: 10px;
    color: #409EFF;
  }
  .mark{
    display: inline-block;
    margin-top: 10px;
    color: #FF3300;
    font-size: 14px;
  }
  .register_go{
  	color: #409EFF;
  }
</style>
