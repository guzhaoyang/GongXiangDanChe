"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_debounce = require("../../utils/debounce.js");
const _sfc_main = {
  data() {
    return {
      title: "出发",
      key: "2J4BZ-3CFEV-OYSPG-UDFGU-ONNNS-63FOT",
      city: "河南省鹤壁市浚县",
      locationConfig: null,
      noClick: true,
      suggestionData: null,
      isShowSearch: false
    };
  },
  onLoad() {
  },
  methods: {
    DanChe() {
      common_vendor.index.navigateTo({
        url: `/pages/danche/index`
      });
    },
    toMap() {
      this.getPosition((location) => {
        common_vendor.index.navigateTo({
          url: `/pages/map/index?lat=${location.lat}&lng=${location.lng}&city=${this.city}`
        });
      });
    },
    getPosition(callback) {
      common_vendor.index.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?address=${this.city}&key=${this.key}`,
        success: ({
          data
        }) => {
          callback(data.result.location);
        }
      });
    },
    getCityHandle(val) {
      this.city = val;
      this.isShowSearch = false;
    },
    changeCity: utils_debounce.Debounce(function(e) {
      this.isShowSearch = true;
      console.log(432);
      this.city = e.target.value;
      common_vendor.index.request({
        url: `https://apis.map.qq.com/ws/place/v1/suggestion?key=${this.key}&keyword=${this.city}`,
        success: ({
          data
        }) => {
          console.log(423, data.data);
          this.suggestionData = data.data;
        }
      });
    }, 1e3)
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title),
    b: common_vendor.o(($event) => $options.toMap()),
    c: common_vendor.o([($event) => $data.city = $event.detail.value, (...args) => $options.changeCity && $options.changeCity(...args)]),
    d: $data.city,
    e: common_vendor.f($data.suggestionData, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.address),
        b: common_vendor.o(($event) => $options.getCityHandle(item.address), item.id),
        c: item.id
      };
    }),
    f: $data.isShowSearch,
    g: common_vendor.o(($event) => $options.DanChe())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/参与的项目/前端学习/GongXiangDanChe/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
