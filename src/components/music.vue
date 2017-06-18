<template>
	<!-- 音乐播放 -->
    <div class="music-btn hidden" v-bind:class="{on:isPlay}" id="musicBtn" @click="playerToggle">
        <span class="music-icon"></span>
        <audio src="/static/audio/Sequence.mp3" autoplay="autoplay" class="music-audio" loop="loop" id="musicAudio">
            <source>
        </audio>
    </div>
</template>
<script type="text/javascript">
	export default{
		data(){
            return {
              isPlay:true
            }
		},
        mounted(){
            var audio = document.getElementById("musicAudio");
            document.getElementById("musicAudio").addEventListener("loadedmetadata", function(){
                document.getElementById("musicBtn").style.display = "block";
                audio.play();
            });
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
        },
		methods:{
          playerToggle(){
                if(this.isPlay){
                  document.getElementById("musicAudio").pause();
                  ga('send', 'event', 'audio', '暂停', '音乐暂停');
                }else{
                  document.getElementById("musicAudio").play();
                  ga('send', 'event', 'audio', '播放', '音乐开启');
                }
                this.isPlay = !this.isPlay;
          }
		}
	}
</script>
