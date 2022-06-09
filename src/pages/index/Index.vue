<template>
  <div class="page">
    <div class="prism-player" id="player-con"></div>
    <div class="current-date">{{ nowDate }}</div>
    <div class="page-center">
      <!-- <div class="player-container">
        <CommonEasyPlayer></CommonEasyPlayer>
      </div> -->
      <div class="player-container">
        <CommonWebRtcPlayer  v-if="playUrl && !isRemoting" :playUrl="playUrl"></CommonWebRtcPlayer>
        <div class="remoting" v-if="playUrl && isRemoting">
          <img src="@/assets/images/remoting.png" alt="">
        </div>
      </div>
      <div class="remote-control">
        <RemoteControlBoHui></RemoteControlBoHui>
      </div>
    </div>
    <div class="page-bottom">
      <Area @handleClick="handleClick" />
    </div>
  </div>
</template>

<script>
import CommonWebRtcPlayer from "@/components/common/CommonWebRtcPlayer.vue";
// import CommonEasyPlayer from "@/components/common/CommonEasyPlayer.vue";
import RemoteControlBoHui from "@/components/RemoteControlBoHui";
import Area from "@/components/Area";

const dayjs = require("dayjs");
const formate = "YYYY年MM月DD日 HH:mm";

let hostname;
if (process.env.NODE_ENV == "development") {
  hostname =  process.env.VUE_APP_SERVENAME;
} else {
  hostname = window.location.hostname;
}
console.log(hostname)
export default {
  components: {
    // CommonEasyPlayer,
    CommonWebRtcPlayer,
    RemoteControlBoHui,
    Area,
  },

  data() {
    return {
      nowDate: dayjs().format(formate),
      playUrl: "",
      // playUrl: `webrtc://${hostname}/live/SN000001`,
      // playUrl: "webrtc://116.205.128.18/live/wjfc",
      isRemoting: false,
    };
  },

  mounted() {
    this.showDate();
    // new window.Aliplayer(
    //   {
    //     id: "player-con",
    //     source: "http://192.168.1.158:8090/live/1.flv",
    //     width: "100%",
    //     height: "500px",
    //     autoplay: true,
    //     isLive: false,
    //     rePlay: false,
    //     playsinline: true,
    //     preload: true,
    //     controlBarVisibility: "hover",
    //     useH5Prism: true,
    //   },
    //   function() {
    //     console.log("The player is created");
    //   }
    // );
  },

  methods: {
    showDate() {
      setInterval(() => {
        this.nowDate = dayjs().format(formate);
      }, 60000);
    },

    handleClick(val) {
      console.log(val)
      this.playUrl = val;
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  position: relative;
  height: 100%;
  overflow: hidden;

  .current-date {
    margin-top: 49px;
    padding-right: 93px;
    height: 42px;
    line-height: 42px;
    text-align: right;
    font-size: 30px;
    font-weight: bold;
    color: #ffffff;
  }

  .page-center {
    display: flex;
    justify-content: space-between;
    padding-left: 237px;
    padding-right: 102px;
    margin-top: 125px;

    .player-container {
      width: 1328px;
      height: 752px;

      .remoting {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .remote-control {
      position: absolute;
      right: 72px;
      top: 243px;
      width: 341px;
      height: 1215px;
    }
  }

  .page-bottom {
    width: 1648px;
    margin-top: 189px;
    padding-left: 84px;
  }
}
</style>
