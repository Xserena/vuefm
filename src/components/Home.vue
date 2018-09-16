<template>
 <div class="home">
    <div class="nav">
		<el-row class="tac">
		<el-col :span="12">
		    <el-menu
		      default-active="2"
		      class="el-menu-vertical-demo">
		      <el-submenu index="1" class='submenu'>
		        <template slot="title">
		          <i class="el-icon-edit"></i>
		          <span class='menu'>本月收支</span>
		        </template>
		        <el-menu-item-group>
		         <router-link :to="{name:'Income'}" class='tag'><el-menu-item index="1-1">本月收入</el-menu-item></router-link>
		          <router-link :to="{name:'Output'}" class='tag'><el-menu-item index="1-2">本月支出</el-menu-item></router-link>
		        </el-menu-item-group>
		      </el-submenu>
		      <el-submenu index="2" class='submenu'>
		        <template slot="title">
		          <i class="el-icon-menu"></i>
		          <span class='menu'>本月收支</span>
		        </template>
		        <el-menu-item-group>
		        <router-link :to="{name:'IncomeAnalyse'}" class='tag'><el-menu-item index="1-1">收支曲线</el-menu-item></router-link>
		           <router-link :to="{name:'OutputAnalyse'}" class='tag'><el-menu-item index="1-2">支出曲线</el-menu-item></router-link>
		        </el-menu-item-group>
		      </el-submenu>
		      <router-link :to="{name:'Person'}" class='tag'><el-menu-item index="4" class='menu submenu'>
		        <i class="el-icon-setting"></i>
		        <span slot="title">个人中心</span>
		      </el-menu-item></router-link>
		    </el-menu>
		  </el-col>
		  </el-row>
    </div>
    <div class="showpage">
    	<router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav{
	float: left;
	width: 30%;
	height:100%;
	margin-right: 60px;
}
.submenu{	
	margin:50px 0;
}
.menu{
	font-size: 18px;
}
.tag{
	text-decoration: none;
}
.showpage{
	width: 60%;
	height:100%;
}
</style>
