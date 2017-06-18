import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import SignUp from '@/views/SignUp'
import SignUpSuccess from '@/views/SignUpSuccess'
import AcceptPrize from '@/views/AcceptPrize'
import PrizeSuccess from '@/views/PrizeSuccess'
import ShareSuccess from '@/views/ShareSuccess'
Vue.use(Router);

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signUp',
      name: 'signUp',
      component:SignUp
    },
    {
      path: '/signUpSuccess',
      name:'signUpSuccess',
      component:SignUpSuccess
    },
    {
      path: '/prize',
      name:'prize',
      component:AcceptPrize
    },
    {
      path: '/prizeSuc',
      name:'prizeSuc',
      component:PrizeSuccess
    },
    {
      path: '/shareSuc',
      name:'shareSuc',
      component:ShareSuccess
    }
  ]
})
