<template>
  <div>
    <h1 class="mark">{{this.mark}}</h1>
    <div id="myChart" :style="{width: '50%', height: '600px'}"></div>
  </div>
 
</template>

<script>
//引入收入数据
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'IncomeAnalyse',
  data(){
    return {
        myData:[],
        mark:"",
    }
  },
  created(){
    this.getData();
  },
  mounted() {
    this.drawLine();
  },  
  methods: {
    getData(){        //获取store传递的数据
        this.tableData=this.arrReset(this.$store.state.tableData,'income');
        this.tableoutData=this.arrReset(this.$store.state.tableoutData,'output');
        let myData=this.removeDup(this.tableData,this.tableoutData);
        this.myData=this.arrSort(myData,'date');
        if (this.myData.length==0) {
          this.mark='还没有收支数据哦，赶紧去记录吧'
        }
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
    //数组对象字段相同合并
    arrReset(arry,property) {
        let newArr=[];
        var temp = {};
        for(var i in arry) {
            var key= arry[i].date;  
            if(temp[key]) {
                temp[key].date = temp[key].date ;
                temp[key][property] = temp[key][property]+ Number(arry[i][property].slice(1));  
            } else {
                temp[key] = {};
                temp[key].date = arry[i].date; 
                temp[key][property] = Number(arry[i][property].slice(1));  
            }
        }
        for(var k in temp){
            newArr.push(temp[k])
        }
        return newArr
    },
    //json对象合并去重
    removeDup(obj1,obj2){
      //先将重复部分合并，以obj1为基准，生产新的obj1
      for(let i=0 ; i < obj2.length; i++){
        let nameO1 = obj2[i].date;  
        for(let j=0 ; j < obj1.length; j++){
          let nameO2 = obj1[j].date; 
          if(nameO1 === nameO2){
            obj1[j].output=obj2[i].output;
          } 
        }
      }
      //合并obj1和obj2,生产新的obj3
      var obj3 = obj1.concat(obj2);
      let temp = {};
      let result = [];
      //将obj3去重
      obj3.map((item,index)=>{
        if(!temp[item.date]){
            result.push(item);
            temp[item.date] = true
        }
      })
      return result
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
       let myChart = echarts.init(document.getElementById('myChart'));
       window.onresize = myChart.resize; 
      // window.onresize = myChart.resize; 
      // 绘制图表
       myChart.setOption({
       title: {
        text: '收支趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['收入','支出','净收入']
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '20%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:this.myData.map((item)=>{
                return item.date
            }) 
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
              name:'收入',
              type:'line',
              stack: '总量1',
              data:this.myData.map((item)=>{
                if (item.income!=undefined) {
                  return item.income
                } else{return 0}             
              }) 
            },
            {
              name:'支出',
              type:'line',
              stack: '总量2',
              data:this.myData.map((item)=>{
                 if (item.output!=undefined) {
                  return item.output
                } else{return 0}
              }) 
            },
        ]
          });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#myChart{
	position: absolute;
	top: 5%;
	right: 20%;
	padding-top: 50px;
	z-index: 1
}
.mark{
  padding-top: 30px;
  font-family: "YouYuan";
  color: #67C23A;
}
</style>
