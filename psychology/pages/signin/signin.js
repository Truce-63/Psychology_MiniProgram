// pages/signin/signin.js
const app = getApp();
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    userpassword: "",
    userConfirm: ""

  },
  // 正则验证手机号与密码
  isCheck() {
    let isPhone = /^1[0-9]{10}$/.test(this.data.username);
    let isPassword = /^\d{6,16}$/.test(this.data.userpassword);
    if (!this.data.username || !this.data.userpassword || !this.data.userConfirm) {
      app.globalToast('请把信息输入完整!');
      return false;
    }
    if (!isPhone) {
      app.globalToast('请输入合法的手机号!');
      return false;
    }

    if (!isPassword) {
      app.globalToast('密码必须是6-16位!');
      return false;
    }

    if (this.data.userpassword !== this.data.userConfirm) {
      app.globalToast('两次密码不一样!');
      return false;
    }

    return true;

  },
  // 注册
  setRegister() {
    if (this.isCheck()) { // 如果通过正则校验 则请求注册接口
      request('post', 'register', {
        username: this.data.username,
        password: this.data.userpassword
      }).then(res => {
        if (res.status == 500) {
          wx.showModal({
            title: '提示',
            content: "注册失败",
            showCancel: false,
            success() {}
          })
        }
        if (res.status == 0) {
          wx.showModal({
            title: '提示',
            content: "该用户已存在",
            showCancel: false,
            success() {}
          })
        }
        if (res.status == 200) {
          wx.showModal({
            title: '提示',
            content: "注册成功",
            showCancel: false,
            success: (res2) => {
              if (res2.confirm) {
                wx.navigateTo({
                  url: '../login/login'
                });
              }
            }
          })
        }
      }).catch(err => {});
    }

  },
  // 直接登录
  goLogin() {
    wx.reLaunch({
      url: '../login/login',
    })
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