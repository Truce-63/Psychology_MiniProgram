// index.js
// 获取应用实例
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [], // 全部文章 源数据
  },
  // 进入到文章详情页面
  topShopdetails(event) {
    const shopdata = event.currentTarget.dataset.shopdata;
    console.log(shopdata, '==================shopdata');
    wx.navigateTo({
      url: '../shopdetails/shopdetails?shopdata=' + JSON.stringify(shopdata),
    })
  },
  getShopList() {
    request('post', 'getAllClassContent', {}).then(res => {
      if (res.status == 200) {
        this.setData({
          shopList: res['data']
        })
      }
    }).catch(err => {});
  },
  // 去 答题 页面
  toExamanswer() {
    wx.navigateTo({
      url: '../examanswer/examanswer',
    })
  },
  // 去 排行榜 页面
  toRankinglist() {
    wx.navigateTo({
      url: '../rankinglist/rankinglist',
    })
  },
  // 去 答题记录 页面
  toScorerecord() {
    wx.navigateTo({
      url: '../scorerecord/scorerecord',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopList()
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