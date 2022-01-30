// pages/login/login.js
import fetch from "../../utils/fetch.js"
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: '',
    username: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onShow() {
    
  },
  login(e) {
    var that = this
    if (e.detail.value.username == "") {
        wx.showToast({
          title: '请输入姓名',
          icon: "none"
        })
        return
      }
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
      title: '注册中',
    })
    fetch('/student/register',{ 
      method: 'post',
      data: e.detail.value,
    }).then(res=>{
      console.log(res)
      
      wx.showToast({
        title: '注册成功',
      })
     setTimeout(()=>{
        wx.navigateBack({
            delta: 1,
          })
     }, 2000)
    })
  },
  
  

})