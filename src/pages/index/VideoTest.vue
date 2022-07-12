<template>
  <div class="player-test">
    <div class="player" v-for="url in urls" :key="url">
      <CommonWebRtcPlayer :playUrl="url"></CommonWebRtcPlayer>
    </div>
  </div>
</template>

<script>
import CommonWebRtcPlayer from "@/components/common/CommonWebRtcPlayer.vue";

export default {
  components: {
    CommonWebRtcPlayer
  },

  data() {
    return {
      urls: ["webrtc://jszhgdxc.baron.com.cn/live/320102", "webrtc://jszhgdxc.baron.com.cn/live/320105","webrtc://jszhgdxc.baron.com.cn/live/320102", "webrtc://jszhgdxc.baron.com.cn/live/320105"]
    }
  }
}
</script>

<style scoped lang="less">
  .player-test {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    
    .player {
      margin: 36px;
      width: 40%;
      height: 40%;
    }
  }
</style>