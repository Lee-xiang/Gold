<template>
  <section class="section section-4">
    <div class="section-wrap prize-form-wrap">
      <div class="logo"><img src="../assets/img/logo.png" alt="周生生 Chow Sang Sang"></div>
      <div class="title"><img src="../assets/img/page4/title.png" alt=""></div>
      <div class="img" v-show="current.area=='BJ'" v-cloak><img src="../assets/img/page4/img-new.png" alt=""></div>
      <div class="img" v-show="current.area=='CQ'" v-cloak><img src="../assets/img/page4/img-cq.png" alt=""></div>
      <div class="img" v-show="current.area=='SH'" v-cloak><img src="../assets/img/page4/img-sh.png" alt=""></div>
      <div class="down-text"> <img src="../assets/img/page4/down-text.png"></div>
      <div class="form-group">
        <div class="controls">
          <input type="text" id="name" class="form-control" placeholder="请工作人员在此处输入核销码" v-model="code">
          <label for="name" class="control-label label-name"></label>
          <div class="help-block" v-if="isCodeError"><img src="../assets/img/page4/error1.png" alt="请输入正确的核销码"></div>
          <div class="help-block" v-if="rewarded">您已经领取过奖品</div>
        </div>
      </div>
      <div class="cta-wrap clearfix">
        <a href="javascript:void(0)" class="cta submit-cta" @click="submit" onclick="ga('send', 'event', '按钮', '点击', '领取核销码');"><img src="../assets/img/page4/btn1.png" alt="提交"></a>
        <a href="javascript:void(0)" class="cta back-cta" @click="$router.push({path:'/signUpSuccess'})" onclick="ga('send', 'event', '按钮', '点击', '核销-返回');"><img src="../assets/img/page4/btn2.png" alt="返回"></a>
      </div>
      <div class="text"><img src="../assets/img/page4/text.png" alt=""></div>
    </div>
  </section>
</template>
<style>
  [v-cloak]{
    display: none;
  }
  .down-text{
    position: absolute;
    top: 3.6rem;
    left: 0.20rem;
    height: 0.43rem;
  }
</style>
<script>
    import axios from 'axios';
    import cons from '../util/constant';
    import Util from '../util/util';
    export default{
      data(){
        return{
          current:{
            area:'',
          },
          isCodeError:false,
          rewarded:false,
          code:'',
          openId:'',
        }
      },
      mounted(){
        this.init();
      },
      methods:{
        init(){
          var obj =  Util.getCurrentActivityInfo();
          if(obj&&obj.area){
            this.current.area=obj.area;
          }
          this.openId = Util.cookie.get('openId');
          if(!this.openId){
            this.$router.push({
              path:'/'
            });
          }
        },
        submit(){
          if(!this.code || this.code.toUpperCase()!=cons.CODE[this.current.area]){
            this.isCodeError = true;
            return;
          }else{
            this.isCodeError = false;
          }
          if(!this.openId){
            this.$router.push({
              path:'/'
            });
          }
          axios.get(cons.apiHost+'/api/reward',{
            params: {
              openId: this.openId
            }
          }).then((res)=>{
            var data=res.data;
            if(data.status==0){
              this.$router.push({
                path:'/prizeSuc'
              });
            }
            else if(data.status=='100004'){
              this.rewarded=true;
              this.$router.push({
                path:'/prizeSuc'
              });
            }
          }).catch((error)=>{
            this.$router.push({
              path:'/prizeSuc'
            });
          })
        }
      },
      watch:{
        '$route':'init'
      }
    }
</script>
