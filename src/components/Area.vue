<template>
  <div class="area">
    <div class="citys">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide
          v-for="(item, i) in areaList"
          :key="item.value"
          @click.native="handleCityClick(i)"
        >
          <div class="city-item" :class="{ active: i === parentActive }">
            {{ item.label }}
          </div>
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
    </div>

    <div class="lives" v-if="areaList.length > 0">
      <div
        class="live-item"
        v-for="(item2, i) in areaList[parentActive].children"
        :class="{
          active: i === liveActive,
          live: item2.live,
          error: !item2.live,
        }"
        :key="item2.value"
        @click="handleLiveClick(i, item2)"
      >
        {{ item2.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { getClients, getAreas } from "@/service/apis";

let hostname;
if (process.env.NODE_ENV == "development") {
  hostname = process.env.VUE_APP_SERVENAME;
} else {
  hostname = window.location.hostname;
}

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  directives: {
    swiper: directive,
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },

  data() {
    return {
      parentActive: 0,
      liveActive: 0,
      swiperOptions: {
        slidesPerView: "auto",
        spaceBetween: 48,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
          draggable: true,
          dragSize: 780,
        },
      },
      liveClients: [],
      areaList: [],
    };
  },

  mounted() {
    const searchParams = new URLSearchParams(window.location.search);
    let areaCode = searchParams.get("code");
    this.areaCode = areaCode;
    this.getClients();
    setInterval(() => {
      this.updateClients();
    }, 6000 * 300);
  },

  methods: {
    async getClients() {
      const res = await getClients();
      const {
        data: { clients },
      } = res;
      this.liveClients = clients;
      await this.getAreasJson();
    },

    async getAreasJson() {
      const { data } = await getAreas();
      let areaJson = data;
      areaJson.forEach((p) => {
        p.label = p.name;
        p.value = p.code;
        p.children.forEach((child) => {
          child.label = child.name;
          child.value = child.code;
          child.SN = child.sn || "";
          if (child.SN) {
            child.liveUrl = `webrtc://${hostname}/live/${child.SN}`;
            let live =
              this.liveClients.findIndex((v) => v.url.indexOf(child.SN) > -1) >
              -1
                ? true
                : false;
            child.live = live;
          } else {
            child.liveUrl = "";
            child.live = false;
          }
        });
      });
      this.areaList = areaJson;
      let indexArray = this.findIndex(this.areaList, this.areaCode);
      this.parentActive = indexArray[0];
      this.swiper.slideTo(this.parentActive, 1000, false);
      this.handleLiveClick(indexArray[1], this.areaList[this.parentActive].children[indexArray[1]]);
    },

    findIndex(areaList, areaCode) {
      let parentIndex = 0;
      let index = 0;
      if (areaCode != null) {
        let startCode = areaCode.substr(0, 4);
        parentIndex = areaList.findIndex((v) => v.code.indexOf(startCode) > -1);
        index = areaList[parentIndex].children.findIndex((v) => v.code === areaCode);
      }
      return [parentIndex, index];
    },

    updatAreaListLiveStatus() {
      this.areaList.forEach((p) => {
        p.children.forEach((child) => {
          if (child.SN) {
            child.liveUrl = `webrtc://${hostname}/live/${child.SN}`;
            let live =
              this.liveClients.findIndex((v) => v.url.indexOf(child.SN) > -1) >
              -1
                ? true
                : false;
            child.live = live;
          } else {
            child.liveUrl = "";
            child.live = false;
          }
        });
      });
      this.$forceUpdate();
    },

    async updateClients() {
      const res = await getClients();
      const {
        data: { clients },
      } = res;
      this.liveClients = clients;
      this.updatAreaListLiveStatus();
    },

    handleCityClick(i) {
      this.parentActive = i;
      this.swiper.slideTo(i);
      this.liveActive = -1;
    },

    handleLiveClick(i, item) {
      this.liveActive = i;
      if (
        (this.areaCode != null && item.code == this.areaCode) ||
        this.areaCode == null
      ) {
        this.$toast("已切换至" + item.name);
        this.$emit("handleClick", item.liveUrl, item.SN);
      } else if (item.code != this.areaCode) {
        this.$toast("您无遥控" + item.name + "机顶盒的权限，仅可观看");
        this.$emit("handleClick", item.liveUrl);
      }
    },
  },
};
</script>

<style scoped lang="less">
.area {
  width: 100%;
  padding-bottom: 40px;
  overflow: hidden;

  /deep/ .citys {
    position: relative;

    .swiper-container {
      padding-bottom: 40px;
    }

    .swiper-slide {
      width: 267px !important;
      height: 74px !important;
    }

    .city-item {
      width: 267px;
      height: 74px;
      text-align: center;
      line-height: 64px;
      font-size: 36px;
      background-image: url("~@/assets/images/city.png");
      background-size: 100% 100%;
      color: rgba(255, 255, 255, 0.5);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &.live {
      }

      &.active {
        background-image: url("~@/assets/images/city-focus.png");
        color: rgba(255, 255, 255, 1);
      }
    }

    .swiper-scrollbar {
      height: 8px;
      bottom: 0px;
      background-color: rgba(3, 146, 212, 0.2);

      .swiper-scrollbar-drag {
        background-color: rgba(3, 146, 212, 1);
      }
    }
  }

  .lives {
    display: flex;
    flex-wrap: wrap;
    margin-top: 38px;

    .live-item {
      margin-right: 38px;
      margin-bottom: 32px;
      font-size: 28px;
      text-align: center;
      line-height: 64px;
      width: 221px;
      height: 70px;
      color: rgba(255, 255, 255, 0.5);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-image: url("~@/assets/images/live-error.png");
      background-size: 100% 100%;

      &.live {
        background-image: url("~@/assets/images/live.png");
      }

      &.error {
        background-image: url("~@/assets/images/live-error.png");
      }

      &.active {
        color: rgba(255, 255, 255, 1);
      }

      &.active.live {
        background-image: url("~@/assets/images/live-focus.png");
      }

      &.active.error {
        background-image: url("~@/assets/images/live-error-focus.png");
      }
    }
  }
}
</style>
