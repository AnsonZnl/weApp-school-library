import fetch from "../../utils/fetch.js"
import {
    formatTime2
} from "../../utils/formatTime.js"
Page({
    data: {
        id: 0,
        startDate: formatTime2(new Date),
        endDate: '',
        detail: {},
        xzdate: ''
    },
    onLoad(op) {
        let id = op.id
        let endDate = formatTime2(new Date)
        let date = new Date
        const year = date.getFullYear()
        const month = date.getMonth() + 2
        const day = date.getDate()

        const formatNumber = n => {
            n = n.toString()
            return n[1] ? n : '0' + n
        }

        let s = [year, month, day].map(formatNumber).join('-')
        this.setData({
            id,
            endDate,
            xzdate: s
        })
        this.getBookDetail(id)
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            endDate: e.detail.value
        })
    },
    sendApply: async function() {
        let uinfo = wx.getStorageSync('_info')
        let res =await fetch('/books/borrow', {
            method: 'post',
            data: {
                userid: uinfo._id,
                bookid: this.data.id,
                startDate: this.data.startDate,
                endDate: this.data.endDate,
                account: uinfo.account,
                username: uinfo.username,
                bookname: this.data.detail.name
            }
        })
        console.log(res)
        // 
  
        // wx.navigateTo({
        //   url: '/pages/me/me',
        // })
    },

    getBookDetail(id) {
        fetch('/books/query?page=1&size=1', {
                method: 'post',
                data: {
                    _id: id
                }
            })
            .then(res => {
                console.log(res)
                let data = res.data.data.list[0];
                data.rate = this.start(data.rate);
                this.setData({
                    detail: data
                })
            }).catch(err => {
                console.log(err)
            })
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

})