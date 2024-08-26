// pages/metestrecord/metestrecord.js
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
  },
  // 获取成绩记录
  getRecordList() {
    request('post', 'getTestResultList ', {
      user_id: this.data.userData.id
    }).then(res => {
      if (res.status == 200) {
        this.setData({
          recordList: res['data']
        })
        console.log(res['data']);
      }
    }).catch(err => {});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userData: wx.getStorageSync('userInfo'),
    })
    this.getRecordList()
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