// pages/classify/classify.js
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classTab: [], // 分类tab
    currentFirst: 1, // 默认为显示第一个分类
    currentShopList: [], // 当前选中分类的文章
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
  },
  // 跳转到搜索页面
  toSearchPage() {
    wx.navigateTo({
      url: '../searchshop/searchshop',
    })
  },
  // 获取分类tab
  getClassTab() {
    request('post', 'getClassTabs', {}).then(res => {
      if (res.status == 200) {
        this.setData({
          classTab: res.data
        })
      }
    }).catch(err => {});
  },
  // 获取分类信息
  getClassSource() {
    request('post', 'getClassList', {
      class_id: this.data.currentFirst
    }).then(res => {
      if (res.status == 200) {
        console.log(res,'===============')
        this.setData({
          currentShopList: res.data
        })
      }
    }).catch(err => {});
  },
  // 点击分类
  switchCalss(event) {
    const dataset = event.currentTarget.dataset.itemdata;
    console.log(dataset, '110');
    this.setData({
      currentFirst: dataset.id
    });
    // 在点击分类tab之后 将id赋值 调用接口请求数据
    this.getClassSource();
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
      userData: wx.getStorageSync('userInfo')
    })
    this.getClassTab()
    this.getClassSource()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getClassTab()
    this.getClassSource()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getClassTab()
    // this.getClassSource()

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