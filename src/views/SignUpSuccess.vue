<template>
  <section class="section section-3">
    <div class="section-wrap join-success-wrap">
      <div class="logo"><img src="../assets/img/logo.png" alt="周生生 Chow Sang Sang"></div>
      <div class="slogan"><img src="../assets/img/slogan.png" alt=""></div>
      <div class="success-content">
        亲爱的<span class="name">{{userName}}</span> <br>
        您已成功报名活动<br>
        期待您的莅临
      </div>
      <div class="date" v-show="current.area=='BJ'" v-cloak><img src="../assets/img/page3/date.png" alt="2017.06 09-18 北京宜家荟聚商城"></div>
      <div class="date" v-show="current.area=='CQ'" v-cloak><img src="../assets/img/page3/date-cq.png" alt="2017.06 09-18 重庆"></div>
      <div class="date" v-show="current.area=='SH'" v-cloak><img src="../assets/img/page3/date-sh.png" alt="2017.06 09-18 上海"></div>
      <div class="cta-wrap clearfix">
        <a href="javascript:void(0)" class="cta invite-cta" @click="isMdShow=true" onclick="ga('send', 'event', '按钮','点击', '邀请同行');"><img src="../assets/img/page3/btn1.png" alt="邀请同行"></a>
        <a href="javascript:void(0)" class="cta getprize-cta" @click="$router.push({path:'/prize'})" onclick="ga('send', 'event', '按钮 ', '点击', '到场领奖');"><img src="../assets/img/page3/btn2.png" alt="到场领奖"></a>
      </div>
      <div class="down-text1"><img src="../assets/img/page3/down-text.png" alt="先到先得"></div>
    </div>

    <div class="modal modal-share" v-bind:class="{'modal-show':isMdShow}">
      <a href="javascript:void(0)" class="close-white" @click="isMdShow=false"><img src="../assets/img/close-white.png" alt="close"></a>
      <div class="sharetips-wrap"><img src="../assets/img/pop/share-tips.png" alt="点击右上角分享按钮，邀请好友一起参加活动吧"></div>
    </div>
  </section>
</template>
<style>
  [v-cloak]{
    display: none;
  }
  .down-text1{
    height: 0.7em;
    margin: 0.4rem -1rem;
  }
</style>
<script>
  import axios from 'axios';
  import cons from '../util/constant';
  import Util from '../util/util';
  var wx = require('weixin-js-sdk');
  export default{
    data(){
      return {
        current:{
          area:'',
        },
        userName:'',
        openId:'',
        isMdShow:false,
        timestamp:'1495598210',
        appId:'wxcc583f8544e50625',
        noncestr:'css123',
        signature:'',
        url:'',
        debugFlag:false
      }
    },
    mounted(){
      this.getCurrentActivityInfo();
      this.debugFlag = Util.getParam("debug")=='true'?true:false;
//      window.location.reload();
      var wxshare = Util.cookie.get('wxshare')||'';
      if(!wxshare){
        //保存6秒,第二次再进来会过期,页面从新刷新
        Util.cookie.setMin('wxshare','true',0.1);
        window.location.reload();
      }else{
        this.init();
      }
    },
    methods:{
      getCurrentActivityInfo(){
        var obj =  Util.getCurrentActivityInfo();
        if(obj&&obj.area){
          this.current.area=obj.area;
        }
      },
      bindShareEvent(){
        var _this=this;
        wx.config({
          debug: this.debugFlag, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: this.appId, // 必填，公众号的唯一标识
          timestamp:this.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.noncestr, // 必填，生成签名的随机串
          signature: this.signature,// 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
          if(this.debugFlag){
            alert("分享后url:"+window.location.href);
          }
          wx.onMenuShareTimeline({
            title: '#我的时尚态度# 周生生珠宝巡展',
            link: window.location.href,
            imgUrl: 'http://invitation.campaignchowsangsang.com/static/icon.jpeg',
            desc:'现场精彩互动体验，探寻你的自我风格，和周生生一起State your style！',
            success: function () {
              ga('send', 'event', '分享', '点击', '分享到朋友圈');
              _this.$router.push({path:'/shareSuc'});
            }
          });
          wx.onMenuShareAppMessage({
            title: '#我的时尚态度# 周生生珠宝巡展',
            desc: '现场精彩互动体验，探寻你的自我风格，和周生生一起State your style！',
            link: window.location.href,
            imgUrl: 'http://invitation.campaignchowsangsang.com/static/icon.jpeg',
            success: function (res) {
              ga('send', 'event', '分享', '点击', '分享给朋友');
              _this.$router.push({path:'/shareSuc'});
            }
          });
        });
      },
      init(){
        var _this = this;
        this.url=location.href;
        this.openId = Util.cookie.get('openId')
        if(!this.openId){
          this.$router.push({
            path:'/'
          });
        }
        this.getUserName();
      },
      getSignature(){
        if(this.debugFlag){
          alert("分享前url:"+window.location.href);
        }
        axios.get(cons.apiHost+"/api/signature",{
          params: {
            appId:this.appId,
            noncestr:this.noncestr,
            timestamp: this.timestamp,
            url:window.location.href
          }
        }).then((res)=>{
          var data=res.data;
          if(data.status==0){
            this.signature=data.signature;
            this.bindShareEvent();
          }
          else{
//            window.location.reload();
          }
        });
      },
      getUserName(){
        axios.get(cons.apiHost+"/api/userName",{
          params: {
            openId: this.openId
          }
        }).then((res)=>{
          var data=res.data;
          if(data.status==0){
            this.userName=data.userName;
            this.getSignature();
          }
          else{
            this.$router.push({
              path:'/signUp'
            });
          }
        });
      }
    },
    watch:{
      '$route':'getCurrentActivityInfo'
    }
  }
</script>
