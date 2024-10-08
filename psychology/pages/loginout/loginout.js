// pages/loginout/loginout.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  confirmExit() {
    wx.showModal({
      title: '提示',
      content: '确认要退出登录吗?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          app.globalToast('已成功退出!');
          wx.clearStorage();
          wx.reLaunch({
            url: '../login/login',
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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