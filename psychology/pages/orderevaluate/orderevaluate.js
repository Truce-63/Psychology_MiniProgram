// pages/orderevaluate/orderevaluate.js
const {
  request
} = require('../../utils/http');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startNum: 0, // 留言 星星个数
    evaluateCon: '', // 留言 内容
    evaluateId: null, // 当前订单信息对象
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
  },
  // 提交留言
  saveEvaluate() {
    console.log(this.data.evaluateObject);
    request('post', 'addShopEvaluate', {
      user_id: this.data.userData.id,
      user_name: this.data.userData.username,
      shop_id: this.data.evaluateId,
      evaluate_start: this.data.startNum,
      evaluate_content: this.data.evaluateCon,
    }).then(res => {
      if (res.status == 200) {
        wx.reLaunch({
          url: '../index/index',
        })
      } else {
        app.globalToast(res['msg']);
      }
    }).catch(err => {});
  },
  startChange(event) {
    this.setData({
      startNum: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      evaluateId: JSON.parse(options.evaluateid),
      userData: wx.getStorageSync('userInfo'),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})