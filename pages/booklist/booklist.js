

import fetch from "../../utils/fetch.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    page: 1,
    more: true,
    notice:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBooksList()
  },
  getBooksList: async function () {
    let that = this;
    let res = await fetch(`/books/query?page=${this.data.page}&size=6`, {
      method: 'post',
      data: {
        author: "",
        bookClass: "",
        isbn: "",
        name: ""
      }
    })
    let arr = res.data.data.list;
    arr.map(e => {
      e.rate = that.start(Number(e.rate))
    })
    if (!arr.length) {
      wx.showToast({
        title: '到底了',
        icon: 'none'
      })
    }
    if (this.data.books.length) {
      this.setData({
        books: [...this.data.books, ...arr]
      })
    } else {
      this.setData({
        books: arr
      })
    }

  },

  start(n) {
    n = Math.round(n);
    let s = '★★★★★';
    let s2 = '☆☆☆☆☆';
    let c = n / 2
    let st = s.slice(0, Math.round(c));
    let st2 = s2.slice(0, Math.round(5 - c))
    return st + st2;
  },
  toDetail(e) {
    console.log(e)
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: `/pages/bookdetail/bookdetail?id=${id}`
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触底了')
    this.setData({
      page: this.data.page + 1
    }, () => {
      console.log(this.data.page)
      this.getBooksList()
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
fetch('/notice/get',{
  method: 'get'
}).then(res=>{
  console.log(res.data.data);
  this.setData({
    notice: res.data.data
  })
})
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
    this.getBooksList();
    wx.stopPullDownRefresh()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})