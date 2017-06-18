<template>
  <section class="section section-2">
    <div class="section-wrap join-form-wrap">
      <div class="logo"><img src="../assets/img/logo.png" alt="周生生 Chow Sang Sang"></div>
      <div class="title"><img src="../assets/img/page2/title.png" alt="请填写个人信息"></div>
      <div class="form-title"><img src="../assets/img/page2/form-title.png" alt="请填写个人信息"></div>
      <div class="form-group">
        <div class="controls">
          <input type="text" id="name" class="form-control" placeholder="请输入您的姓名" v-model="userName">
          <label for="name" class="control-label label-name"></label>
          <div class="help-block" v-if="isUserNameError"><img src="../assets/img/page2/error2.png" alt="姓名不能为空"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="controls">
          <input type="tel" id="phone" class="form-control" placeholder="请输入您的手机号码" v-model="phoneNum">
          <label for="name" class="control-label label-phone"></label>
          <div class="help-block" v-if="isPhoneNumError"><img src="../assets/img/page2/error1.png" alt="手机号码必须为11位数"></div>
        </div>
      </div>
      <a href="javascript:void(0)" class="cta join-confirm-cta" @click="signUpConfirm" onclick="ga('send','event','按钮','点击', '确认报名');"><img src="../assets/img/page2/btn1.png" alt="确认报名"></a>
      <a href="javascript:void(0)" class="cta back-cta" @click="$router.push({path:'/'})" onclick="ga('send', 'event', '按钮 ', ' 点击 ', ' 报名 - 返回首页');"><img src="../assets/img/page2/btn2.png" alt="返回首页"></a>
    </div>
  </section>
</template>
<script>
  import axios from 'axios';
  import cons from '../util/constant';
  import Util from '../util/util';
  export default{
    data(){
      return {
        isUserNameError:false,
        isPhoneNumError:false,
        userName:'',
        phoneNum:'',
        openId:'',
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        this.openId = Util.cookie.get('openId')
        if(!this.openId){
          this.$router.push({
            path:'/'
          });
        }
      },
      signUpConfirm(){
        var phoneCheckList = [130,131,132,133,134,135,136,137,138,139,150,151,152,155,156,157,158,159,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188];
        if(!this.userName){
          this.isUserNameError = true;
          return;
        }else{
          this.isUserNameError = false;
        }
        if(phoneCheckList.indexOf(parseInt(this.phoneNum.substring(0,3)))>-1){
          this.isPhoneNumError = false;
        }else{
          this.isPhoneNumError = true;
          return;
        }

        axios.get(cons.apiHost+"/api/apply",{
          params: {
            userName: this.userName,
            phone: this.phoneNum,
            openId: this.openId
          }
        }).then((res)=>{
          var data= res.data;
        if(data.status=="0"){
          this.$router.push({
            path:'/signUpSuccess'
          })
        }
        else{
          this.$router.push({
            path:'/signUpSuccess'
          })
        }
      }).catch((error)=>{
          this.$router.push({
          path:'/signUpSuccess'
        });
      })
      }
    },
    watch:{
      '$route':'init'
    }
  }
</script>
