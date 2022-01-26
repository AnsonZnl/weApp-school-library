/**
 * @param {
 * authType: 授权类型
 * } 
 */

module.exports = async function wxAuth(authType) {
  // scopeArr ref: https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html
  let scopeArr = [
    'userInfo',
    'userLocation',
    'userLocationBackground',
    'address',
    'invoiceTitle',
    'invoice',
    'werun',
    'record',
    'writePhotosAlbum',
    'camera'
  ]
  if (scopeArr.indexOf(authType) == -1) {
    return console.error('请输入正确的授权类型');
  }
  let scope = 'scope.' + authType;
  let isUserSet = await getSettingSync(scope);
  if (isUserSet) return true;
  let isAuthorize = await authorizeSync(scope)
  if (isAuthorize) return true;
  let showModalMes = await showModalSync(scope)
  // 弹框提示去授权
  if (showModalMes) {
    // 去手动授权
    let openSet = await openSettingSync(scope);
    if (openSet) {
      return true
    } else {
      return false
    }
  } else {
    // 拒绝授权
    return false
  }
}

// 1判断用户是否开启该授权
function getSettingSync(scope) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting[scope]) {
          console.log('未授权')
          resolve(false)
        } else {
          console.log('已授权')
          resolve(true)
        }
      },
      fail(err) {
        reject()
        console.error('wx.getSetting Error', err)
      }
    })
  })
}
// 2请求用户授权
function authorizeSync(scope) {
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope: scope,
      success() {
        resolve(true)
        console.log('授权成功')
      },
      fail() {
        resolve(false)
        console.log('授权失败')
      }
    })
  })
}
// 3弹框提示用户手动授权
function showModalSync(scope) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: `为了更好的用户体验，请您授权 ${scope} 功能`,
      confirmText: '去授权',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('点击确认')
          resolve(true)
        } else if (res.cancel) {
          resolve(false)
        }
      },
      fail(err) {
        reject()
        console.error(err, 'wx.showModal Error')
      }
    })
  })
}
// 4调起客户端小程序设置界面，返回用户设置的操作结果
function openSettingSync(scope) {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        if (res.authSetting[scope]) {
          resolve(true)
        } else {
          resolve(false)
        }
      },
      fail(err) {
        reject()
        console.error(err, 'wx.openSetting Error')
      }
    })
  })
}