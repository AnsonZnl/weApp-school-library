// 封装request请求
/**
 * 和wx.request一样接受一个对象：https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
 * 
// 遵循w3c的Fetch：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
// jQuery.ajax( url [, settings ] )
// fetch(url,{...})
 **/

function fetch(url, initData) {
  const app = getApp()
  const APIVERSION = '1.0' //调用接口版本
  const DEVICE = 'wxApp' //调用接口设备为小程序
  const baseUrl = app.globalData.apiUrl || wx.getStorageSync('_apiUrl')

  if (!baseUrl) {
    console.error('_apiUrl 不能为空!');
    return;
  }
  if (typeof url === 'object') {
    // 防止在只传一个对象的情况下报错
    initData = url;
  } else {
    initData.url = url; // 转换url，如果有两个URl，则使用第一个参数url为准
  }
  initData.url = baseUrl + initData.url; // 创建url
  // debugger
  if (!url && !initData.url) {
    console.error('URL 不能为空!');
    return;
  }

  let defaultData = {
    url: baseUrl + initData.url,
    method: 'GET',
    header: {
      'content-type': 'application/json',
      'TOKEN': wx.getStorageSync('_token') || '',
      'APIVERSION': APIVERSION,
      'DEVICE': DEVICE,
      'Accept': '*/*'
    },
  }

  // 取消请求，添加abort https://developers.weixin.qq.com/community/develop/doc/00064cc26bc058a6a848f238351c00
  return new Promise(function (resolve, reject) {
    let showLoad = initData.showLoad; // 是否有loading
    if (initData.showLoad) {
      delete initData.showLoad
    }
    let signal = initData.signal; // 是否有中止信号
    let data = Object.assign(defaultData, initData); //如何属性重复，initData 可以 覆盖 defaultData
    // debugger
    if (showLoad) wx.showLoading(showLoad)
    let requestTask = wx.request({
      ...data,
      success(res) {
        // if (res.header.TOKEN) wx.setStorageSync('_token', res.header.TOKEN)
        // token 更新
        if (res.header["TOKEN"] && defaultData.header['TOKEN'] != res.header["TOKEN"]) {
          wx.setStorageSync('_token', res.header["TOKEN"]);
        }
        if (res.statusCode >= 200 && res.statusCode < 300) {
          if (res.data.code == 20000) {
            resolve(res);
          } else {
            wx.showToast({
              title: res.data.message || `响应错误，状态码${res.statusCode}`,
              icon: 'none',
            })
            reject(res);
          }

        } else {
          wx.showToast({
            title: `响应错误，状态码${res.statusCode}`,
            icon: 'none',
          })
          errorHandle(res)
          reject(res);
        }
      },
      fail(err) {
        // console.log(baseUrl,defaultData,{...data});
        // debugger
        if (err.errMsg == "request:fail abort") {
          console.info('请求已中止')
          return;
        }
        wx.showToast({
          title: `网络错误，状态码${err.statusCode}`,
          icon: 'none',
        })
        reject(err);
      },
      complete() {
        if (showLoad) wx.hideLoading()
      }
    })
    // 如果有信号，就赋值中止操作和状态。
    if (signal && (typeof signal === 'object')) {
      signal.aborted = false;
      signal.onabort = function () {
        requestTask.abort();
        this.aborted = true;
      }
    }
  })
}
// 统一的 错误处理
function errorHandle(err) {
  // 服务器错误
  if (err.statusCode == 500) {
    wx.showToast({
      title: '服务器错误',
      icon: 'none'
    })
    return;
  } else if (err.statusCode == 401) {
    wx.reLaunch({
      url: '/pages/login/login'
    })
    return;
  } else {
    console.error('未知错误', err)
  }
}


module.exports = fetch

// module.exports = fetch