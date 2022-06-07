<template>
  <div class="remote-control-container" id="remote-control-container">
    <div class="control-top">
      <div class="remote-icon outer-shadow" @click="handleKeyClick('redopen')">
        <img src="@/assets/images/icons/icon-close.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('screen')">
        <img src="@/assets/images/icons/icon-screen.png" alt="" />
      </div>
    </div>
    <div class="control-center outer-shadow">
      <div class="remote-icon remote-icon-ok" @click="handleKeyClick('queren')">
        <img src="@/assets/images/icons/icon-ok.png" alt="" />
      </div>
      <div class="remote-icon-wrapper top" @click="handleKeyClick('up')">
        <div class="remote-icon-arrow remote-icon-top">
          <img src="@/assets/images/icons/icon-arrow-top.png" alt="" />
        </div>
      </div>
      <div class="remote-icon-wrapper right" @click="handleKeyClick('right')">
        <div class="remote-icon-arrow remote-icon-right">
          <img src="@/assets/images/icons/icon-arrow-right.png" alt="" />
        </div>
      </div>
      <div class="remote-icon-wrapper bottom" @click="handleKeyClick('down')">
        <div class="remote-icon-arrow remote-icon-bottom">
          <img src="@/assets/images/icons/icon-arrow-bottom.png" alt="" />
        </div>
      </div>
      <div class="remote-icon-wrapper left" @click="handleKeyClick('left')">
        <div class="remote-icon-arrow remote-icon-left">
          <img src="@/assets/images/icons/icon-arrow-left.png" alt="" />
        </div>
      </div>
    </div>
    <div class="control-bottom">
      <div class="control-bottom-left">
        <div class="remote-icon outer-shadow" @click="handleKeyClick('houtui')">
          <img src="@/assets/images/icons/icon-back.png" alt="" />
        </div>
        <div class="remote-icon outer-shadow" @click="handleKeyClick('caidan')">
          <img src="@/assets/images/icons/icon-home.png" alt="" />
        </div>
      </div>
      <div class="control-bottom-right">
        <div class="remote-icon-wrapper add" @click="handleKeyClick('yinjia')">
          <div class="remote-icon-add">
            <img src="@/assets/images/icons/icon-add.png" alt="" />
          </div>
        </div>
        <div
          class="remote-icon-wrapper minus"
          @click="handleKeyClick('yinjian')"
        >
          <div class="remote-icon-minus">
            <img src="@/assets/images/icons/icon-minus.png" alt="" />
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>

<script>
import { postKeyCode } from "@/service/apis";

export default {
  mounted() {
    document
      .getElementById("remote-control-container")
      .addEventListener("touchstart", function() {});
  },

  methods: {
    handleKeyClick(key) {
      console.log(key);
      // 安卓震动反馈
      try {
        window.navigator.vibrate(200);
      } catch (error) {
        console.log(error);
      }
      if (key === "screen") {
        //  投屏
      } else {
        //  红外按键
        const params = {
          key,
          str: "me",
        };
        postKeyCode(params);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.remote-control-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 80px 44px;
  background: #f2f2f2;
  border-radius: 35px;
  overflow: hidden;
  font-size: 0;

  .outer-shadow {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      box-shadow: 0px -8px 6px rgba(255, 255, 255, 0.49);
      border-radius: 100%;
    }
  }

  .remote-icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f2f2f2;
    box-shadow: 0px 9px 6px rgba(0, 0, 0, 0.06);
    border-radius: 39px;

    &:active {
      background: #d0d0d0;
      box-shadow: 0px 9px 6px rgba(0, 0, 0, 0.06);
    }
  }

  .control-top {
    display: flex;
    justify-content: space-between;

    .remote-icon {
      width: 78px;
      height: 78px;
    }
  }

  .control-center {
    position: relative;
    margin-top: 64px;
    width: 253px;
    height: 253px;
    background: #f2f2f2;
    box-shadow: 0px 9px 6px rgba(0, 0, 0, 0.06);
    border-radius: 200px;

    .remote-icon-wrapper {
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      // opacity: 0;
      z-index: 99;
      background-color: transparent;

      &:active {
        background: #d0d0d0;
        box-shadow: 0px 9px 6px rgba(0, 0, 0, 0.06);
      }

      &.top {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &.right {
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }

      &.bottom {
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &.left {
        top: 50%;
        left: 0%;
        transform: translateY(-50%);
      }
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      box-shadow: 0px -8px 6px rgba(255, 255, 255, 0.49);
      border-radius: 110px;
      z-index: 1;
    }

    .remote-icon-ok {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 85px;
      height: 85px;
      transform: translate(-50%, -50%);
      border-radius: 100%;
      z-index: 99;
    }

    .remote-icon-arrow {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      &.remote-icon-top {
        img {
          width: 23px;
          height: 12px;
        }
      }

      &.remote-icon-right {
        img {
          width: 12px;
          height: 23px;
        }
      }

      &.remote-icon-bottom {
        img {
          width: 23px;
          height: 12px;
        }
      }

      &.remote-icon-left {
        img {
          width: 12px;
          height: 23px;
        }
      }
    }
  }

  .control-bottom {
    margin-top: 64px;
    display: flex;
    justify-content: space-between;

    .control-bottom-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 59px;
      height: 182px;

      .remote-icon {
        width: 60px;
        height: 60px;
      }
    }

    .control-bottom-right {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      padding: 32px 19px;
      width: 59px;
      height: 182px;
      width: 59px;
      background: #f2f2f2;
      box-shadow: 0px 9px 6px rgba(0, 0, 0, 0.06);
      border-radius: 30px;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
        width: 100%;
        height: 100%;
        box-shadow: 0px -8px 6px rgba(255, 255, 255, 0.49);
        border-radius: 59px;
      }

      .remote-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        // opacity: 0;
        z-index: 99;
        background-color: transparent;

        &:active {
          background: #d0d0d0;
          box-shadow: 0px 9px 6px rgba(0, 0, 0, 0.06);
        }

        &.add {
          top: 0px;
        }

        &.minus {
          bottom: 0px;
        }
      }
    }
  }

  .control-numbers {
    display: flex;
    
    .remote-icon {
      width: 59px;
      height: 59px;

      img {
        width: 100%;
        height: 100%;
      }
    }

  }
}
</style>
