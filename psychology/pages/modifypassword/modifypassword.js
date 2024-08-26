// pages/modifypassword/modifypassword.js
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userContent: {}
  },
  // 输入框变化时更新数据
  onFieldChange(e) {
    this.setData({
      'userContent.confirmPaw': e.detail
    });
  },
  // 修改密码
  editpassword() {
    // 修改密码成功之后 跳转到登录页面
    request('get', 'updatePost', {
      id: this.data.userContent.id,
      user: this.data.userContent.user,
      paw: this.data.userContent.confirmPaw
    }).then(res => {
      // console.log(res, '======res');
      if (res.status == 200) {
        wx.reLaunch({
          url: '../login/login',
        });
      }
    }).catch(err => {});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userContent: {
        ...wx.getStorageSync('userInfo'), // 用户信息
        confirmPaw: ''
      }
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