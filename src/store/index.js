import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store=new Vuex.Store({
	state:{
		//设置属性，存储数据
		tableData:[],
		tableoutData:[]
	},
	getters:{
		//获取属性状态，方法，用于获取state中的数据
		getData:state=>state.tableData,
		getData:state=>state.tableoutData,
	},
	mutations:{
		//改变属性的状态
		setData(state,data){
			if (data) {
				state.tableData=data;
			}else{
				state.tableData=[]
			}
		},
		setoutData(state,data){
			if (data) {
				state.tableoutData=data;
			}else{
				state.tableoutData=[]
			}
		},
	},
})