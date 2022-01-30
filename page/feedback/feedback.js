import fetch from "../../utils/fetch.js"


Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        content: '',
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let userInfo = wx.getStorageSync('_info')
        this.setData({
            userInfo
        })
    },
    submit() {
        fetch('/feedback/add', {
            method: 'post',
            data: {
                uid: this.data.userInfo._id,
                username: this.data.userInfo.username,
                title: this.data.title,
                account: this.data.userInfo.account,
                content: this.data.content
            }
        }).then(res=>{
            wx.showToast({
              title: '提交成功！',
            })
            setTimeout(()=>{
                wx.navigateBack({
                    delta: 1,
                  })
            }, 2000)
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