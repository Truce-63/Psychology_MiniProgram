// pages/login/login.js
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: 'admin', // 用户名
    userpassword: '123789' // 密码
  },
  // 快速注册
  goSignin() {
    wx.navigateTo({
      url: '../signin/signin',
    })
  },

  // 登录
  login() {

    if (this.data.username && this.data.userpassword) {
      request('post', 'signIn', {
        username: this.data.username,
        password: this.data.userpassword
      }).then(res => {
          console.log(res);
        if (res.status == 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'none',
          });
          wx.setStorageSync('userInfo', res.data);
          // wx.switchTab只能用于跳转到tabbar页面，并关闭其他非tabbar页面
          wx.switchTab({
            url: '../index/index',
          });
        }
      }).catch(err => {});
    } else {
      wx.showToast({
        title: '请把信息输入完整!',
        icon: 'none',
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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