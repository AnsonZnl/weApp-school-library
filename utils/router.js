// import routes from "../router/routerConfig";
// import routerFilter from "./routerFilter"

/**
 * 对wx.navigateTo的封装
 * @param {路由} url 
 * @param {参数} params 
 * @param {事件} events 
 */
const push = (url, params, events) => {
  // routerFilter()
  // router 防止页面栈爆满 到了8层之后就每次跳转然后关闭当前页面
  if (getCurrentPages().length > 8) {
    replace(url, params)
  } else {
    wx.navigateTo({
      url,
      events: events,
      success(res) {
        console.log(res);
      },
      fail(err) {
        console.log(err);
      }
    })
  }
}

/**
 * 对wx.redirectTo的封装
 * @param {路由} url 
 * @param {参数} params 
 */
const replace = (url, params) => {
  // routerFilter()
  wx.redirectTo({
    url,
    success(res) {
      console.log(res);
    },
    fail(err) {
      console.log(err);
    }
  })

}

/**
 * 对wx.navigateBack的封装
 * @param {返回的层级} number 
 */
const pop = (number) => {
  // routerFilter()
  wx.navigateBack({
    delta: number,
    success(res) {
      console.log(res);
    },
    fail(err) {
      console.log(err);
    }
  })
}

/**
 * 对wx.reLaunch的封装
 * @param {路由} url 
 * @param {参数} params 
 */
const relaunch = (url, params) => {
  // routerFilter()
  wx.reLaunch({
    url,
    success(res) {
      console.log(res);
    },
    fail(err) {
      console.log(err);
    }
  })
}

/**
 * 对tabbar的封装
 * @param {路由} url 
 */
const switchTab = (url) => {
  // routerFilter()
  wx.switchTab({
    url,
    success(res) {
      console.log(res);
    },
    fail(err) {
      console.log(err);
    }
  })
}

module.exports = {
  push,
  replace,
  pop,
  relaunch,
  switchTab
}
