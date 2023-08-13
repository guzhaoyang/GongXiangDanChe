"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      latitude: 0,
      longitude: 0,
      covers: [{
        id: 1,
        width: 50,
        height: 50,
        latitude: 0,
        longitude: 0
      }],
      city: "",
      flag: false
    };
  },
  onReady() {
    this.mapDom = common_vendor.index.createMapContext("mapDom");
    console.log(423, this.mapDom);
  },
  onLoad(option) {
    this.covers[0].latitude = Number(option.lat);
    this.covers[0].longitude = Number(option.lng);
    this.city = option.city;
    console.log("onLoad");
    common_vendor.index.getLocation({
      type: "gcj02",
      success: (res) => {
        console.log("getLocation11");
        console.log("当前位置的经度：" + res.longitude);
        console.log("当前位置的纬度：" + res.latitude);
        this.latitude = Number(res.latitude);
        this.longitude = Number(res.longitude);
        this.mapDom.includePoints({
          padding: [140, 50, 140, 50],
          points: [
            //第一个是我的位置
            {
              latitude: this.latitude,
              longitude: this.longitude
            },
            // 第二个是店铺的位置
            {
              latitude: this.covers[0].latitude,
              longitude: this.covers[0].longitude
            }
          ]
        });
      }
    });
  },
  methods: {
    // 地图初始化完成后触发
    lodingMap() {
      console.log(423);
      console.log("gzy");
      this.flag = true;
    },
    getHereHandle() {
      if (!this.flag)
        return;
      common_vendor.index.openLocation({
        latitude: this.covers[0].latitude,
        //维度
        longitude: this.covers[0].longitude,
        //经度
        name: this.city,
        //目的地定位名称
        scale: 15
        //缩放比例
        // address: "河南省鹤壁市浚县"    //导航详细地址
      });
    },
    backPositionHandle() {
      if (!this.flag)
        return;
      this.mapDom.moveToLocation();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.latitude,
    b: $data.longitude,
    c: $data.covers,
    d: common_vendor.o((...args) => $options.lodingMap && $options.lodingMap(...args)),
    e: common_vendor.o((...args) => $options.backPositionHandle && $options.backPositionHandle(...args)),
    f: common_vendor.t($data.city),
    g: common_vendor.o((...args) => $options.getHereHandle && $options.getHereHandle(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/参与的项目/前端学习/GongXiangDanChe/pages/map/index.vue"]]);
wx.createPage(MiniProgramPage);
