import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Person from '@/components/Person'
import Home from '@/components/Home'
import Income from '@/components/Income'
import Output from '@/components/Output'
import IncomeAnalyse from '@/components/IncomeAnalyse'
import OutputAnalyse from '@/components/OutputAnalyse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
     {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
          {
            path: '/income',
            name: 'Income',
            component: Income
          },
          {
            path: '/output',
            name: 'Output',
            component: Output
          },
          {
            path: '/person',
            name: 'Person',
            component: Person
          },
          {
            path: '/incomeanalyse',
            name: 'IncomeAnalyse',
            component: IncomeAnalyse
          },
          {
            path: '/outputanalyse',
            name: 'OutputAnalyse',
            component: OutputAnalyse
          }
      ],
      redirect:{ name: 'Person' }
    },
   {
      path: '*',
      redirect:"/"
    }
  ]
})
