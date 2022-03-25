<template>
  <div class="test">
    <button @click="publish">发布消息</button>
  </div>
</template>

<script>
import mqtt from "mqtt";

export default {
  data() {
    return {
      msgID: 100,
    };
  },

  mounted() {
    this.ready();
  },

  methods: {
    ready() {
      const clientId =
        "mqttjs_" +
        Math.random()
          .toString(16)
          .substr(2, 8);

      const host = "ws://58.213.74.150:8083/mqtt";
      // const host = "ws://broker.emqx.io:8083/mqtt";

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
        client.subscribe("EPG/control/IP", { qos: 0 });
      });

      // Received
      client.on("message", this.receiveMessage);
      this.client = client;
    },

    // 接收消息
    receiveMessage(topic, message) {
      console.log(topic);
      console.log("++++");
      const receiveMsg = JSON.parse(message.toString());
      console.log(receiveMsg);
    },

    publish() {
      // Publish 发布消息
      this.msgID++;
      const params = {
        type: "command",
        msgID: this.msgID,
        name: "OK",
      };
      // 这里需要转为字符串
      this.client.publish("EPG/control/IP", JSON.stringify(params), {
        qos: 0,
        retain: false,
      });
    },
  },
};
</script>

<style scoped lang="less">
button {
  width: 400px;
  height: 200px;
  font-size: 28px;
}
</style>
