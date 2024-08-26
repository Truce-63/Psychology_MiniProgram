// app.js
App({
  globalData: {
    userInfo: null
  },
  globalToast(msg){ // 请求出错时提示 或 其他页面需要提示
    wx.showToast({
      title: msg || '系统出小差了',
      icon: 'none',
      duration: 1500
    })
  }
})
