<template>
 <div class="income">
 	<div class="addInfo" @click='show'>
 		<span class="el-icon-circle-plus"></span>
 	</div>
 	<!-- 表格 -->
 	 <el-table
    :data="tableData.slice((currentPage4-1)*pages,currentPage4*pages)"
    class='table'>
    <el-table-column
      label="日期"
      width="200"
    >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
      <el-table-column
      property="income"
      label="金额"
      width="200">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="deleteinfo(scope.$index+(currentPage4-1)*pages)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 增加记录表单 -->
  <div class="info animated rubberBand" v-if='infoshow'>
  	  <div class="block checkinfo">
	    <el-date-picker
	      v-model="date"
	      type="month"
	      value-format='yyyyMM'
	      placeholder="选择月">         <!-- value-format:修改获取的日期格式 --> 
	    </el-date-picker>
	  </div>	 
	  <el-col :span="12" :offset="6">

  		<el-input v-model="income" placeholder="请输入金额" class='checkinfo'></el-input>
  		<span :class='loadshow'></span>
  	  </el-col>
  	  <el-col :span="12" :offset="6" class='checkinfo'>
          <el-button @click='addBtn' style="width:100%;backgroundColor:#67C23A;border: none" type="primary">添加</el-button>
          <span class="mark" v-if='mark'>{{remark}}</span>
      </el-col>
      <el-col :span="12" :offset="6" class='checkinfo'>
          <el-button @click='cancelBtn' style="width:100%;backgroundColor:#67C23A;border: none " type="primary">取消</el-button>
      </el-col>  
  </div>
  <!-- 分页 -->
  <div class="block pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>  
  </div>
 </div>

</template>

<script>
export default {
  name: 'Income',
   data() {
      return {
        tableData: [{
          date: 201801,
          income: '￥10000.00',
        }, {
          date: 201802,
          income: '￥8000.00',
        }, {
          date: 201803,
          income: '￥9000.00',
        }, {
          date: 201804,
          income: '￥10000.00',
        }],
        date:"",
        income:'',
        infoshow: false,
        currentPage4: 1,
        pages:5,     //初始默认显示条数，否则刚开始显示无数据
        loadshow:'load',
        mark:false,
        remark:'',
      }
    },
    //获取更新后数据
    created(){
      this.tableData=this.$store.state.tableData;
      this.setData();
    },
    destroyed(){
      this.setData()
    },
    methods: {
      setData:function () {          //获取日期金额传入store
        this.$store.commit('setData',this.tableData);
      },
      show:function () {
      	this.infoshow=true;
      	this.mark=false;
      },
      addBtn:function () {
      	const data={
      	  date:Number(this.date),
          income: "￥"+Number(this.income).toFixed(2),  //格式化金额
      	};
      	if (this.date) {
      		if (Number(this.income).toFixed(2)!=='NaN') {
  	  			this.loadshow='el-icon-loading load'
  	      	setTimeout(()=>{
              this.tableData.unshift(data);
              this.tableData=this.arrSort(this.tableData,'date')
  	      		this.date='';
  		      	this.income='';
  		      	this.infoshow=false;
  		      	this.loadshow='load';
  	      	},1000)
	      	}else{
	      		this.remark='金额格式不正确';
	      		this.mark=true
	      	} 
      	}else{
      		this.remark='请输入日期';
      		this.mark=true
      	}	
      },
      cancelBtn:function () {
      	this.date='';
      	this.income='';
      	this.infoshow=false;
      },
      deleteinfo:function (index) {
      	this.tableData.splice(index,1);
    	//当页数据全部删除，显示上一页数据
      	let pageLength=this.tableData.slice((this.currentPage4-1)*this.pages,this.currentPage4*this.pages);
      	if (pageLength<=0) {
      		this.currentPage4=this.currentPage4-1
      	}
      },
      totalIndex:function () {
      	let indexs= this.tableData.length;
      	currentPage4=indexs
      },
      handleSizeChange(val) {
      	this.pages=val;
      },
      handleCurrentChange(val) {
        this.currentPage4=val;
      },
      //数组字段排序
      arrSort(arr,property){
        function compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }
        return arr.sort(compare(property))
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.income{
	padding-top: 50px;
	z-index: 1;
  position: absolute;
  top:50px;
  left: 20%;
  width: 80%;
}
.table{
	margin-left: 60px;
	width: 80%;
}

.addInfo span{
	display: inline-block;
	font-size: 30px;
	float: left;
	color: #67C23A;
}
.info{
	width: 500px;
	height: 500px;
	background-color: #fff;
	border: 2px solid #67C23A;
	border-radius: 10px;
	display: inline-block;
	z-index: 2;
	position: absolute;
	top:100px;
	right:30%;
}
.checkinfo{
	margin-top: 50px;
}
.load{
	font-size: 40px;
	position: absolute;
	top: 30%;
	left:50%;
}
.mark{
	display: inline-block;
	margin-top: 10px;
	font-size: 14px;
	color: #F56C6C;
}
</style>
