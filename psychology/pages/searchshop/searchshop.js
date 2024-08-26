// pages/searchshop/searchshop.js
const {
  request
} = require('../../utils/http');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: '',
    shopList: [], // 全部文章 源数据
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
  },
  // 查询文章
  searchShop(event) {
    console.log(this.data.searchVal,'搜索数据');
    this.setData({
      searchVal: event.detail
    })

    this.getShopList()
  },
  // 获取全部文章
  getShopList() {
    let apiParam = this.data.searchVal ? {
      title: this.data.searchVal
    } : {
      user_id: this.data.userData.id
    };
    request('post', 'getAllClassContent', apiParam).then(res => {
      if (res.status == 200) {
        this.setData({
          shopList: res['data']
        })
        console.log(res['data']);
      }
    }).catch(err => {});
  },
  // 进入到文章详情页面
  topShopdetails(event) {
    const shopdata = event.currentTarget.dataset.shopdata;
    console.log(shopdata,'==================shopdata');
    wx.navigateTo({
      url: '../shopdetails/shopdetails?shopdata=' + JSON.stringify(shopdata),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData: wx.getStorageSync('userInfo'),
    })
    this.getShopList();
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