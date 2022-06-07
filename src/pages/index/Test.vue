<template>
  <div class="test">
    <video ref="testVideo" controls autoplay></video>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    this.ready();
  },

  methods: {
    ready() {
      const self = this;
      // let ws = new WebSocket("ws://localhost:8888"); // 连接信令服务器。主要用来交换呼叫，应答双方信息
      let ws = new WebSocket("ws://116.205.128.18:8888/"); // 连接信令服务器。主要用来交换呼叫，应答双方信息
      ws.onopen = function() {
        // 这里是为了在建立连接之后告诉服务端我是应答方
        ws.send(
          JSON.stringify({
            userId: "answer",
          })
        );
      };
      // createAnswer();

      function createAnswer() {
        let remotePeerConnection;
        let remoteStream;
        const servers = null;
        var constraints = { audio: true, video: true };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(stream) {
            /* 使用这个stream stream */
            remoteStream = stream;
            remotePeerConnection = new RTCPeerConnection(servers);
            remotePeerConnection.ontrack = function(event) {
              console.log(event);
              self.$refs["testVideo"].srcObject = event.streams[0];
            };
            // 媒体协商完成后，webrtc需要建立网络连接。建立网络连接的前提是客户端要知道对端的网络地址
            // 这个获取并交换网络地址的过程我们称为ICE
            remotePeerConnection.onicecandidate = function(event) {
              const candidate = event.candidate;
              // 通过信令 服务器 发送
              ws.send(JSON.stringify({
                type: "answer",
                isCandidate: true,
                candidate,
              }));
            };
            const videoTracks = remoteStream.getVideoTracks();
            // 音频轨道
            const audioTracks = remoteStream.getAudioTracks();
            // 判断视频轨道是否有值
            if (videoTracks.length > 0) {
              console.log(`使用的设备为: ${videoTracks[0].label}.`);
            }
            // 判断音频轨道是否有值
            if (audioTracks.length > 0) {
              console.log(`使用的设备为: ${audioTracks[0].label}.`);
            }
            // 遍历本地流的所有轨道
            remoteStream.getTracks().forEach((track) => {
              remotePeerConnection.addTrack(track, remoteStream);
            });
            ws.onmessage = (event) => {
              const offerJson = JSON.parse(event.data);
              console.log(offerJson);
              const { type, sdp, isCandidate, candidate } = offerJson;

              if (type == "offer") {
                console.log("接收到offer消息");
                if (!isCandidate) {
                  remotePeerConnection.setRemoteDescription(
                    new RTCSessionDescription({
                      type,
                      sdp,
                    })
                  );
                  remotePeerConnection.createAnswer().then((description) => {
                    console.log(JSON.stringify(description));
                    remotePeerConnection
                      .setLocalDescription(description)
                      .then(() => {
                        console.log("本地流设置成功");
                        ws.send(JSON.stringify(description));
                      });
                  });
                } else {
                  remotePeerConnection.addIceCandidate(candidate);
                }
              }
            };
          })
          .catch(function(err) {
            /* 处理error */
            console.log(err);
          });
      }

      createAnswer();
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

video {
  width: 100%;
  height: 100%;
}
</style>
