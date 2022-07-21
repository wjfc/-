const path = require("path");
const autoprefixer = require("autoprefixer");
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { TDesignResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  publicPath: "./",
  outputDir: "dist/remote-ipad",   // 修改成对应的项目名
  css: {
    loaderOptions: {

      postcss: {
        plugins: [
          autoprefixer(),
        ]
      }
    }
  },
  devServer: {
    open: true,
    // https: true,
    proxy: {        // 根据实际项目做接口代理
      "/shoudong": {
        target: "http://192.168.1.248/",
        changeOrigin: true
      },
      "/jscnCloud": {
        target: "http://192.168.1.188:8005",
        changeOrigin: true
      },
      "monitor": {
        target: "http://58.213.74.150:17280/",
        changeOrigin: true
      },
      "/rtc": {
        target: "https://jszhgdxc.baron.com.cn/",
        changeOrigin: true
      },
      "/api/v2": {
        target: "http://1.116.245.209:8080/",
        changeOrigin: true
      },
      "/api/": {
        target: "https://jszhgdxc.baron.com.cn/",
        changeOrigin: true
      },
      "/json": {
        target: "https://jszhgdxc.baron.com.cn/",
        changeOrigin: true
      },
      "/cms": {
        target: "http://122.193.8.99:8876/",
        changeOrigin: true
      },

    }
  },
  configureWebpack: {
    externals: {
      'AMap': 'AMap',
    },

    plugins: [
      AutoImport({
        resolvers: [TDesignResolver()],
      }),
      Components({
        resolvers: [TDesignResolver()],
      }),
    ]
  },

};

