<template>
  <div class="remote-control-container" id="remote-control-container">
    <div class="control-top">
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Standby')">
        <img src="@/assets/images/icons/icon-close.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('screen')">
        <img src="@/assets/images/icons/icon-screen.png" alt="" />
      </div>
    </div>
    <div class="control-center outer-shadow">
      <div class="remote-icon remote-icon-ok" @click="handleKeyClick('OK')">
        <img src="@/assets/images/icons/icon-ok.png" alt="" />
      </div>
      <div class="remote-icon-wrapper top" @click="handleKeyClick('Up')">
        <div class="remote-icon-arrow remote-icon-top">
          <img src="@/assets/images/icons/icon-arrow-top.png" alt="" />
        </div>
      </div>
      <div class="remote-icon-wrapper right" @click="handleKeyClick('Right')">
        <div class="remote-icon-arrow remote-icon-right">
          <img src="@/assets/images/icons/icon-arrow-right.png" alt="" />
        </div>
      </div>
      <div class="remote-icon-wrapper bottom" @click="handleKeyClick('Down')">
        <div class="remote-icon-arrow remote-icon-bottom">
          <img src="@/assets/images/icons/icon-arrow-bottom.png" alt="" />
        </div>
      </div>
      <div class="remote-icon-wrapper left" @click="handleKeyClick('Left')">
        <div class="remote-icon-arrow remote-icon-left">
          <img src="@/assets/images/icons/icon-arrow-left.png" alt="" />
        </div>
      </div>
    </div>
    <div class="control-bottom">
      <div class="control-bottom-left">
        <div class="remote-icon outer-shadow" @click="handleKeyClick('Return')">
          <img src="@/assets/images/icons/icon-back.png" alt="" />
        </div>
        <div
          class="remote-icon outer-shadow"
          @click="handleKeyClick('HomePage')"
        >
          <img src="@/assets/images/icons/icon-home.png" alt="" />
        </div>
      </div>
      <div class="control-bottom-right">
        <div class="remote-icon-wrapper add" @click="handleKeyClick('Volume+')">
          <div class="remote-icon-add">
            <img src="@/assets/images/icons/icon-add.png" alt="" />
          </div>
        </div>
        <div
          class="remote-icon-wrapper minus"
          @click="handleKeyClick('Volume-')"
        >
          <div class="remote-icon-minus">
            <img src="@/assets/images/icons/icon-minus.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="control-numbers">
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-1')">
        <img src="@/assets/images/icons/1@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-2')">
        <img src="@/assets/images/icons/2@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-3')">
        <img src="@/assets/images/icons/3@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-4')">
        <img src="@/assets/images/icons/4@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-5')">
        <img src="@/assets/images/icons/5@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-6')">
        <img src="@/assets/images/icons/6@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-7')">
        <img src="@/assets/images/icons/7@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-8')">
        <img src="@/assets/images/icons/8@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-9')">
        <img src="@/assets/images/icons/9@2x.png" alt="" />
      </div>
      <div class="remote-icon outer-shadow" @click="handleKeyClick('Num-0')">
        <img src="@/assets/images/icons/0@2x.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import mqtt from "mqtt";

let hostname;
if (process.env.NODE_ENV == "development") {
  hostname = process.env.VUE_APP_SERVENAME;
} else {
  hostname = window.location.hostname;
}

export default {
  data() {
    return {
      msgID: 100,
      isRemoting: false,
    };
  },

  mounted() {
    document
      .getElementById("remote-control-container")
      .addEventListener("touchstart", function() {});
    this.ready();
  },

  methods: {
    handleKeyClick(key) {
      if (key === "screen") {
        if (!this.isRemoting) {
          //  投屏
          this.client.publish("remote/open", "open", {
            qos: 0,
            retain: false,
          });
          this.isRemoting = true;
          this.$parent.isRemoting = true;
        } else {
          //  关闭投屏
          this.client.publish("remote/open", "close", {
            qos: 0,
            retain: false,
          });
          this.isRemoting = false;
          this.$parent.isRemoting = false;
        }
      } else {
        //  红外按键
        const params = {
          type: "command",
          name: key,
        };
        this.publish(params);
      }
    },

    ready() {
      const clientId =
        "mqttjs_" +
        Math.random()
          .toString(16)
          .substr(2, 8);

      // const host = "ws://58.213.74.150:8083/mqtt";
      const host = `wss://${hostname}/mqtt`; // 系统工程师做了代理不加 8084 端口号
      console.log(host);
      const options = {
        keepalive: 60,
        clientId: clientId,
        protocolId: "MQTT",
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: "WillMsg",
          payload: "Connection Closed abnormally..!",
          qos: 0,
          retain: false,
        },
      };

      // console.log("Connecting mqtt client");
      const client = mqtt.connect(host, options);

      client.on("error", (err) => {
        console.log("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        console.log("Reconnecting...");
      });

      // 连接
      client.on("connect", () => {
        console.log("Client connected:" + clientId);
        // Subscribe 订阅
        client.subscribe("EPG/control/SN000001", { qos: 0 });
        // client.subscribe("EPG/report/SN000001", { qos: 0 });
        client.subscribe("remote/close", { qos: 0 });
      });

      // Received
      client.on("message", this.receiveMessage);
      this.client = client;
    },

    // 接收消息
    receiveMessage(topic, message) {
      console.log(topic);
      console.log("++++");
      if (topic == "EPG/control/SN000001") {
        console.log(message.toString());
      } else if (topic == "remote/close") {
        this.isRemoting = false;
        this.$parent.isRemoting = false;
      } else {
        console.log(message.toString());
      }
    },

    publish(params) {
      // Publish 发布消息
      this.msgID++;
      params.msgID = String(this.msgID);
      // 这里需要转为字符串
      this.client.publish("EPG/control/SN000001", JSON.stringify(params), {
        qos: 0,
        retain: false,
      });
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
    margin-top: 64px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    .remote-icon {
      width: 59px;
      height: 59px;
      margin-bottom: 38px;
      margin-right: 38px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      &:last-child {
        margin-bottom: 0;
        margin-right: 0;
      }

      img {
        display: block;
        width: 17px;
        height: 40px;
      }
    }
  }
}
</style>
