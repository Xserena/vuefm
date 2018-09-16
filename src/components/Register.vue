<template>
  <div class="register">
    <div class="form animated bounceInDown">
      <h2>注册</h2>
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
          <el-input id="chekpass" v-model="chekpass" type="password" placeholder="请确认密码">
            <template slot="prepend">密码确认</template>
          </el-input>
        </el-col>
       </el-row>
       <el-row>
        <el-col :span="18" :offset="3" class='col'>
          <el-button id="register" v-on:click="register" style="width:100%" type="primary">注册</el-button>
        </el-col>
       </el-row>
       <span class="login">已有帐号，直接<router-link :to="{name:'Login'}" class='login_go'>登录</router-link></span>
       <span class="mark">{{mark}}</span>
    </div>   
  </div>
</template>

<script>
export default {
      data() {
        return {
          name : '',
          password : '',
          chekpass :'',
          mark:'',
        }
    },
    methods:{
      register:function () {
        //$axios存储请求
        //   this.$axios.get('/fmuser.json')
        //   .then(res=>{
        //     const data=res.data;
        //     const users=[];
        //     for(let key in data){
        //       const user=data[key];
        //       users.push(user)
        //     }
        //     let result=users.filter((user)=>{       //匹配正确返回正确的数组信息，错误，返回空数组
        //       return user.name===this.name
        //     });
        //     if (result!=null &&result.length>0) {
        //       this.mark='该账户已存在'
        //     }else{
        //       if (this.password===this.chekpass) {
        //         const formData={
        //           name:this.name,
        //           password:this.password,
        //           chekpass:this.chekpass
        //         }
        //         this.$axios.post('/fmuser.json',formData)
        //           .then(res=>{
        //             this.$router.push({name:'Login'})
        //           })
        //       }else{
        //         this.mark='密码不一致'
        //       }
        //     }
        // })

        //sessionStorage存储
        if (this.name!='' && this.password!='' && this.chekpass==this.password) {         
          if(!window.localStorage){
            alert('您的浏览器不支持sessionStorage')
          }else{
              sessionStorage.setItem('userInfo',this.name);
              sessionStorage.setItem('passInfo',this.password);
              this.$router.push({name:"Login"})
          }
        }else{
          this.mark="请填写完整或确认密码是否正确"
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register{
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
  .login{
    display: block;
    margin-top: 10px;
    color: #409EFF;
  }
  .mark{
    display: block;
    margin-top: 10px;
    color: #FF3300;
    font-size: 14px;
  }
  .login_go{
    color: #409EFF;
  }
</style>
