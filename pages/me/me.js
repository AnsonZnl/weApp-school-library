import fetch from "../../utils/fetch.js"

// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    userInfo: {},
    myBooks: []
  },

  // 扫码
  scanCode() {
    let that = this;
    wx.showLoading({
      title: '添加中..',
    })
    wx.scanCode({
      success(res) {
        let isbn = res.result;
        console.log(res);
        wx.cloud.callFunction({
          name: 'getBookInfo',
          data: {
            isbn
          }
        }).then(res => {
          console.log(res)
          wx.hideLoading()
          wx.showModal({
            title: '添加成功',
            content: `成功将"${res.result.title}"添加到书架`,
            showCancel: false
          })
          let arr = that.data.myBooks;
          arr.push(res.result);
          that.setData({
            myBooks: arr
          })
        }).catch(err => {
          console.log(err)
          wx.hideLoading()
          wx.showModal({
            title: '添加失败',
            content: err.errMsg,
            showCancel: false
          })
        })
      },
      fail(err) {
        wx.hideLoading()
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id = wx.getStorageSync('_userid')
    this.setData({
      id
    })
    this.getuserInfo(id)
  },
  getuserInfo: async function (id = this.data.id) {
    console.log(id);
    let res = await fetch('/student/info?_id=' + id, {})
    console.log(res);
    this.setData({
      userInfo: res.data.data
    })
  },
  returnBook(event) {
    let id = event.currentTarget.dataset.id
    // console.log(event,id)
    // return;
    wx.navigateTo({
      url: '/pages/return/return?id=' + id,
    })
  },
  feedback() {
    wx.navigateTo({
      url: '/page/feedback/feedback',
    })
  },
  logou() {
    wx.clearStorage({
      success: (res) => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getuserInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})