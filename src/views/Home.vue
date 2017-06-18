<template>
  <section class="section section-1 ">
    <div class="section-wrap join-wrap">
      <div class="logo"><img src="../assets/img/logo.png" alt="周生生 Chow Sang Sang"></div>
      <div class="slogan"><img src="../assets/img/slogan.png" alt=""></div>
      <div class="text-1" v-show="current.area=='BJ'" v-cloak><img src="../assets/img/page1/text1-1.png" alt=""></div>
      <div class="text-1" v-show="current.area=='CQ'" v-cloak><img src="../assets/img/page1/text-cq.png" alt=""></div>
      <div class="text-1" v-show="current.area=='SH'" v-cloak><img src="../assets/img/page1/text-sh.png" alt=""></div>
      <div class="text-2" v-show="!rewardStatus&&current.isSigning"><img src="../assets/img/page1/text2.png" alt=""></div>
      <div class="join-wrap" v-show="!rewardStatus&&current.isSigning" v-cloak>
        <a href="javascript:void(0)" class="cta join-cta" @click="signUp" onclick="ga('send','event','按钮','点击','我要报名')"><img src="../assets/img/page1/btn.png" alt="我要报名"></a>
      </div>
      <div class="join-end" v-show="rewardStatus||current.isActive" v-cloak><img src="../assets/img/page1/end.png" alt=""></div>
    </div>

    <div class="modal modal-join" v-bind:class="{'modal-show':isMdShow}" @click="isMdShow=false">
      <div class="modal-inner" @click.stop="isMdShow=true">
        <img src="../assets/img/pop/pop-main.png" alt="注册或激活成为周生生之友，才可参与活动报名哦！">
        <a href="javascript:void(0)" class="close" @click.stop="isMdShow=false"><img src="../assets/img/close.png" alt="close"></a>
        <div class="signup-wrap">
          <a href="javascript:;" @click="toCRM" class="cta signup-cta" onclick="ga('send','event','按钮','点击','前往注册')"><img src="../assets/img/pop/btn.png" alt="前往注册或激活"></a>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
  [v-cloak]{
    display: none;
  }
</style>
<script>
  import Util from './../util/util';
  import axios from 'axios';
  import cons from '../util/constant'
  export default{
    data(){
      return {
        current:{
          isSigning:true,
          isActive:false,
          area:'',
        },
        isMdShow:false,
        bindStatus:'false',
        applyStatus:false,
        rewardStatus:false,
        CRMUrl:'http://wechat.chowsangsang.com/zhs?jumpTitle=%23%E6%88%91%E7%9A%84%E6%97%B6%E5%B0%9A%E6%80%81%E5%BA%A6%23%E5%B7%A1%E5%B1%95&jumpLoc=http%3A%2F%2Finvitation.campaignchowsangsang.com?bind=True',
        needCRM:true,
        authCode:{},
        openId:{},
        token:'25e949ca53774a40a181adf06ece4a24'
      };
    },
    mounted(){

      this.init();

    },
    methods:{
      getCurrentActivityInfo(){
         var obj=Util.getCurrentActivityInfo();
          if(obj.status==cons.STATUS.SIGN){
            this.current.isSigning=true;
            this.current.isActive=false;
          }
          else if(obj.status==cons.STATUS.ACTIVE){
            this.current.isSigning=false;
            this.current.isActive=true;
          }
          else{
            //all over.
            this.current.isSigning=false;
            this.current.isActive=true;
          }
          this.current.area=obj.area;
      },
      init(){
        this.getCurrentActivityInfo();
        //confirm if bound
        this.bindStatus=Util.cookie.get('bind')||'false';
        console.log("init bindStatus:"+this.bindStatus);
        this.openId=Util.cookie.get('openId');
        if(Util.getParam('bind')=='True'){
          this.bindStatus = 'true';
        }else if(Util.getParam('bind')=='False'){
          this.bindStatus = 'false';
        }
        Util.cookie.set('bind',this.bindStatus,60);
        if(this.needCRM&&(!this.bindStatus || this.bindStatus=='false')){
          var paramBind  = Util.getParam('bind');
          if(paramBind=="True"){
            this.bindStatus='true';
          }
          else{
            this.bindStatus='false';
          }
          Util.cookie.set('bind',this.bindStatus,60);
        }
        if(this.bindStatus=='true'){
          var openIdFromCookie = Util.cookie.get("openId");
          if(openIdFromCookie&&openIdFromCookie!='undefined'){
            this.openId=openIdFromCookie;
            this.getUserStatus(this.openId);
          }
          var code = Util.getParam('code');
          console.log("code:"+code);
          if(code&&(!this.openId||this.openId==undefined||this.openId=='undefined')){
            this.getOpenId(code);
          }
          //没有openId,也没有code，需要先获取code  会有跳转
          if(!code&&(!this.openId||this.openId==undefined||this.openId=='undefined')){
            console.log("getAuthCode");
            this.getAuthCode();
          }
        }
      },
      toCRM(){
        window.location.href=this.CRMUrl;
      },
      //报名
      signUp(){
        if(this.needCRM){
          if(this.bindStatus=='false'){
            this.isMdShow = true;
          }else if(this.bindStatus=='true'){
            if(this.openId){
              this.$router.push({path:'/signUp'});
            }else{
              this.getAuthCode();
            }
          }
        }else if(this.openId){
          this.$router.push({path:'/signUp'});
        }
      },
      //获取用户状态，跳转
      getUserStatus(openId){
        axios.get(cons.apiHost+"/api/userStatus",{
            params: {
              openId: openId
            }
          }).then((res)=>{
            var data=res.data;
            if(data.status==0){
              this.applyStatus=data.applyStatus;
              this.rewardStatus = data.rewardStatus;
              if(!this.rewardStatus){
                if(this.applyStatus){
                  this.$router.push({path:'/signUpSuccess'});
                }
              }
            }
        });
      },
      //获取authcode
      getAuthCode(){
        window.location.href="https://wxproxy.oookini.com/oauth2/authorize?token="+this.token+"&redirect_url="+window.location.protocol+ "//"+window.location.host + window.location.pathname+"&scope=snsapi_base";
      },
      //获取openId
      getOpenId(code){
        axios.get(cons.apiHost+"/api/accesstoken",{
            params:{
              code:code,
              token:this.token,
            }
          }).then((res)=>{
            var data=res.data;
            this.openId=data.openid;
            if(!data.openid){
              this.getAuthCode();
              return;
            }
            Util.cookie.set('openId',this.openId,60);
            this.getUserStatus(this.openId);
        });
      }
    },
    watch:{
      '$route':'init'
    }
  }
</script>
