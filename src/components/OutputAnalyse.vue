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
  name: 'OutputAnalyse',
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
      let mydata=this.$store.state.tableoutData;
      function box(tableData) {
        let tbArr=tableData.map((item)=>{
        let temp={};
        let arr=[];
        if (item.tag==='淘宝') {
          temp.tag='淘宝';
          temp.date=item.date;
          temp.output=item.output;
          arr.push(temp)
        }
        return arr
      })
      let jdArr=tableData.map((item)=>{
        let temp={};
        let arr=[];
        if (item.tag==='京东') {
          temp.tag='京东';
          temp.date=item.date;
          temp.output=item.output;
          arr.push(temp)
        }
        return arr
      })
      let elmArr=tableData.map((item)=>{
        let temp={};
        let arr=[];
        if (item.tag==='饿了么') {
          temp.tag='饿了么';
          temp.date=item.date;
          temp.output=item.output;
          arr.push(temp)
        }
        return arr
      })
      let mtArr=tableData.map((item)=>{
        let temp={};
        let arr=[];
        if (item.tag==='美团') {
          temp.tag='美团';
          temp.date=item.date;
          temp.output=item.output;
          arr.push(temp)
        }
        return arr
      })
       let qtArr=tableData.map((item)=>{
        let temp={};
        let arr=[];
        if (item.tag==='其他') {
          temp.tag='其他';
          temp.date=item.date;
          temp.output=item.output;
          arr.push(temp)
        }
        return arr
      })
      function removeEmptyArrayEle(arr){    
        for(var i = 0; i < arr.length; i++) {
          if(arr[i].length==0) {
            arr.splice(i,1);
            i = i - 1; 
          }
         }
         return arr;
      };
      function arrReset(arry,property) {
        let newArr=[];
        var temp = {};
        for(var i in arry) {
          var key= arry[i][0].date;  
          if(temp[key]) {
            temp[key].date = temp[key].date ; 
            temp[key].tag = temp[key].tag ;     
            temp[key][property] = temp[key][property]+ Number(arry[i][0][property].slice(1));  
          } else {
            temp[key] = {};  
            temp[key].date = arry[i][0].date;   
            temp[key].tag = arry[i][0].tag;    
            temp[key][property] = Number(arry[i][0][property].slice(1)); 
          }
        }
        for(var k in temp){
          newArr.push(temp[k])
        }
        return newArr
      }
        let arr1=arrReset(removeEmptyArrayEle(tbArr),'output')
        let arr2=arrReset(removeEmptyArrayEle(jdArr),'output')
        let arr3=arrReset(removeEmptyArrayEle(elmArr),'output')
        let arr4=arrReset(removeEmptyArrayEle(mtArr),'output')
        let arr5=arrReset(removeEmptyArrayEle(qtArr),'output')
        let arr=arr1.concat(arr2).concat(arr3).concat(arr4).concat(arr5)
        return arr
      }
      let myData=box(mydata);
      function acn(arr) {
        let newArr=[];
        let temp = {};
        for(var i in arr) {
            var key= arr[i].date;  
            if(temp[key]) {  
                temp[key].date = temp[key].date ; 
                temp[key].tags.push(arr[i].tag) ;     
                temp[key].outputs.push((arr[i].output).toString()) ;     
            } else {
                temp[key] = {}; 
                temp[key].date = arr[i].date;   
                temp[key].tags = new Array(arr[i].tag);     
                temp[key].outputs = new Array((arr[i].output).toString()); 
            }
        }
        for(var k in temp){
            newArr.push(temp[k])
        }
        return newArr
      }
      // console.log(acn(myData))
      this.myData=acn(myData)
      if (this.myData.length==0) {
          this.mark='还没有支出数据哦，赶紧去记录吧'
        }
    },

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
       let myChart = echarts.init(document.getElementById('myChart'));
       window.onresize = myChart.resize; 
      // 绘制图表
       myChart.setOption({
       title: {
        text: '支出趋势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['淘宝','京东','饿了么','美团','其他']
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
              name:'淘宝',
              type:'line',
              stack: '总量1',
              data:this.myData.map((item)=>{
                let indexi=item.tags.indexOf('淘宝');
                if (indexi>=0) {          
                  return (Number(item.outputs[indexi]))
                }else{return 0}   
              }) 
            },
            {
              name:'京东',
              type:'line',
              stack: '总量2',
              data:this.myData.map((item)=>{
                let indexi=item.tags.indexOf('京东');
                if (indexi>=0) {          
                  return (Number(item.outputs[indexi]))
                }else{return 0}   
              }) 
            },
            {
              name:'饿了么',
              type:'line',
              stack: '总量3',
              data:this.myData.map((item)=>{
                let indexi=item.tags.indexOf('饿了么');
                if (indexi>=0) {          
                  return (Number(item.outputs[indexi]))
                }else{return 0}   
              }) 
            },
            {
              name:'美团',
              type:'line',
              stack: '总量4',
              data:this.myData.map((item)=>{
                let indexi=item.tags.indexOf('美团');
                if (indexi>=0) {          
                  return (Number(item.outputs[indexi]))
                }else{return 0}   
              }) 
            },
            {
              name:'其他',
              type:'line',
              stack: '总量5',
              data:this.myData.map((item)=>{
                let indexi=item.tags.indexOf('其他');
                if (indexi>=0) {          
                  return (Number(item.outputs[indexi]))
                }else{return 0}   
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
