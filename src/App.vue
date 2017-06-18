<template>
  <div id="app" class="container">
    <Music></Music>
    <!-- 查看攻略按钮 -->
    <div class="tactic-btn" id="tacticBtn" @click="isMdShow=true">
      <img src="./assets/img/tactic.png" alt="">
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <div class="modal modal-tactic" v-bind:class="{'modal-show':isMdShow}" id="modalTactic" @click="isMdShow=false">
      <div class="modal-inner" @click.stop="isMdShow=true">
        <div class="top">
          <a href="javascript:void(0)" class="close" @click.stop="isMdShow=false"><img src="./assets/img/close.png" alt="close"></a>
          <div class="title"><img src="./assets/img/tactic/title.png" alt=""></div>
        </div>
        <div class="content">
          <div class="text"><img src="./assets/img/tactic/text1.png" alt=""></div>
          <div class="imgs">
            <img src="./assets/img/tactic/img1.png" alt="">
            <img src="./assets/img/tactic/img2.png" alt="">
            <img src="./assets/img/tactic/img3.png" alt="">
          </div>
          <div class="text"><img src="./assets/img/tactic/text2.png" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
<script>
  import Music from './components/music.vue'
  export default {
    name: 'app',
    data(){
      return {
          isMdShow:false
      }
    },
    components:{Music}
  }
</script>
