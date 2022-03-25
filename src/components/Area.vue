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

    <div class="lives">
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
        slidesPerView: 6,
        spaceBetween: 48,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: false,
          draggable: true,
          dragSize: 780,
        },
      },
      areaList: [
        {
          label: "南京",
          value: "nanjing",
          children: [
            {
              label: "鼓楼",
              live: true,
              liveUrl: "webrtc://58.213.74.150/live/SN000001",
              value: "jiangning",
            },
            // {
            //   label: "鼓楼",
            //   live: false,
            //   liveUrl: "https//",
            //   value: "gulou",
            // },
            // {
            //   label: "栖霞",
            //   live: false,
            //   liveUrl: "https//",
            //   value: "qixia",
            // },
            // {
            //   label: "玄武",
            //   live: false,
            //   liveUrl: "https//",
            //   value: "xuanwu",
            // },
            // {
            //   label: "浦口",
            //   live: false,
            //   liveUrl: "https//",
            //   value: "pukou",
            // },
            // {
            //   label: "六合",
            //   live: true,
            //   liveUrl: "https//",
            //   value: "liuhe",
            // },
          ],
        },
        // {
        //   label: "苏州",
        //   value: "suzhou",
        //   children: [
        //     {
        //       label: "相成",
        //       live: true,
        //       liveUrl: "https//",
        //       value: "xiangcheng",
        //     },
        //     {
        //       label: "吴江",
        //       live: false,
        //       liveUrl: "https//",
        //       value: "wujiang",
        //     },
        //   ],
        // },
      ],
    };
  },

  mounted() {
    this.handleLiveClick(0, this.areaList[0].children[0])
  },

  methods: {
    handleCityClick(i) {
      this.parentActive = i;
      this.swiper.slideTo(i);
      this.liveActive = 0;
    },

    handleLiveClick(i, item) {
      this.liveActive = i;
      this.$emit("handleClick", item.liveUrl)
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
      background: url("~@/assets/images/city.png");
      color: rgba(255, 255, 255, 0.5);

      &.live {
      }

      &.active {
        background: url("~@/assets/images/city-focus.png");
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
      background: url("~@/assets/images/live-error.png");

      &.live {
        background: url("~@/assets/images/live.png");
      }

      &.error {
        background: url("~@/assets/images/live-error.png");
      }

      &.active {
        color: rgba(255, 255, 255, 1);
      }

      &.active.live {
        background: url("~@/assets/images/live-focus.png");
      }

      &.active.error {
        background: url("~@/assets/images/live-error-focus.png");
      }
    }
  }
}
</style>
