// pages/mefavorite/mefavorite.js
const {
  request
} = require('../../utils/http');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
    shopList: []
  },
  // 进入到文章详情页面
  topShopdetails(event) {
    const shopdata = event.currentTarget.dataset.shopdata;
    console.log(shopdata, '==================shopdata');
    wx.navigateTo({
      url: '../shopdetails/shopdetails?shopdata=' + JSON.stringify(shopdata.shop_id),
    })
  },
  // 取消收藏文章
  cancelShop(event) {
    const favoritedata = event.currentTarget.dataset.favoritedata;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '该操作无法恢复，确认执行吗?',
      // showCancel: false,
      success: function (res) {
        if (res.confirm) {
          request('post', 'delUserfavorite', {
            shop_id: favoritedata.shop_id,
            user_id: that.data.userData.id,
          }).then(res => {
            if (res.status == 200) {
              that.getShopList()
            }
          }).catch(err => {});
        }
      }
    })



  },
  // 获取收藏列表
  getShopList() {
    request('post', 'getUserfavorite', {
      user_id: this.data.userData.id
    }).then(res => {
      if (res.status == 200) {
        this.setData({
          shopList: res['data'], // 从当前用户下 过滤出已收藏的数据
        })
        console.log(res['data']);
      }
    }).catch(err => {});
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
    // 点击tabbar刷新页面
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad()
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