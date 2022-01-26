// 封装request请求

module.exports = function fetch(url, initData = {}) {
  const baseUrl = wx.getStorageSync('_apiUrl') || '';
  if(!baseUrl){
    console.error('_apiUrl 不能为空!');
    return;
  }
  if (!url) {
    console.error('URL 不能为空!');
    return;
  }
  if (initData.url) console.warn('initData的url属性无效，请使用url。')

  let defaultData = {
    url: `${baseUrl}${url}`,
    header: {
      'content-type': 'application/json',
      // ...更多header参考：https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
    },
  }
  return new Promise(function (resolve, reject) {
    let showLoad = initData.showLoad;
    delete initData.showLoad;
    let data = Object.assign(defaultData, initData);
    if (showLoad) wx.showLoading(showLoad); // 显示加载loading
    const requestTask = wx.request({
      ...data,
      success(res) {
        if (res.status >= 200 && res.status < 300) {
            resolve(res);
        } else {
          errorHandle(res)
          reject(res);
        }
      },
      fail(err) {
        reject(err);
      },
      complete() {
        console.log('中断')
        if (showLoad) wx.hideLoading()
      }
    })
    // 如果有取消信号，就赋值
    data.signal && (data.signal.onabort = () => {
      if (showLoad) wx.hideLoading()
      requestTask.abort()
    })
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