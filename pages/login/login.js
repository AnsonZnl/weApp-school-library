// pages/login/login.js
import fetch from "../../utils/fetch.js"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: '1160030721',
    password: '123456',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onShow() {
    
  },
  login(e) {
    var that = this
    if (e.detail.value.account == "") {
      wx.showToast({
        title: '请输入学号',
        icon: "none"
      })
      return
    }
    
    if (e.detail.value.password == "") {
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
      return
    }
    
    wx.showLoading({
      title: '登录中',
    })
    fetch('/student/login',{ 
      method: 'post',
      data: e.detail.value,
    }).then(res=>{
      console.log(res)
      wx.setStorageSync('_token', res.data.data.token)
      
      wx.setStorageSync('_info', res.data.data.info)
      wx.setStorageSync('_userid', res.data.data.info._id)
      
      wx.switchTab({
        url: `/pages/booklist/booklist`
      })
    })
  },
  
  

})