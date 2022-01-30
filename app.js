
import config from "./config/index.js"
import fetch from "./utils/fetch.js"
App({
  globalData: {
    // apiUrl: 'http://localhost:3000'
    apiUrl: config.APIURL
  },
  onLaunch: function () {
    wx.setStorageSync('_apiUrl', this.globalData.apiUrl)
    if (!this.fetch) this.fetch = fetch
  }
})