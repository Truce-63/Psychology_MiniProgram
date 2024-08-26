// pages/shopdetails/shopdetails.js
const app = getApp()
const {
  request
} = require('../../utils/http');
const {
  formatTime
} = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
    shopObject: {}, // 当前文章的信息对象
    evaluateList: [], // 当前文章留言 数据源
    shopId: null, // 文章id
  },
  // 取消收藏
  onChange(event) {
    if (app.isLogin()) { // 用户已登录
      this.cancelShop();
    } else { // 用户未登录
      wx.showModal({
        title: '提示',
        content: '您未登录，请先登录再进行相关操作，是否登录？',
        success: function (res) {
          if (res.confirm) {
            wx.reLaunch({
              url: '../login/login',
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  // 添加 & 取消收藏文章
  cancelShop() {
    let paramsData = {
      item_image: this.data.shopObject.item_image,
      item_name: this.data.shopObject.item_name,
      class_id: this.data.shopObject.class_id,
      shop_id: this.data.shopObject.id,
      user_id: this.data.userData.id
    }
    if (!this.data.shopObject.isfavorite) { // 收藏
      request('post', 'addUserfavorite', paramsData).then(res => {
        if (res.status == 200) {
          app.globalToast('收藏成功');
          const isfavorite = this.data.shopObject.isfavorite;
          this.setData({
            ['shopObject.isfavorite']: isfavorite === 0 ? 1 : 0,
          });
        }
      }).catch(err => {});
    } else { // 取消收藏
      request('post', 'delUserfavorite', {
        shop_id: this.data.shopObject.id,
        user_id: this.data.userData.id
      }).then(res => {
        if (res.status == 200) {
          app.globalToast('取消收藏');
          const isfavorite = this.data.shopObject.isfavorite;
          this.setData({
            ['shopObject.isfavorite']: isfavorite === 0 ? 1 : 0,
          });
        }
      }).catch(err => {});
    }

  },
  // 获取当前文章留言
  getEvaluateList() {
    request('post', 'getShopEvaluate', {
      shop_id: this.data.shopId
    }).then(res => {
      if (res.status == 200) {
        this.setData({
          evaluateList: res['data']
        })
      }
    }).catch(err => {});
  },
  // 根据文章id查询单个文章信息
  getShopidList() {
    request('post', 'getAllClassContent', {
      shop_id: this.data.shopId
    }).then(res => {
      if (res.status == 200) {
        const imgUrl = res['data'][0].item_practice;
        this.setData({
          shopObject: {
            ...res['data'][0],
            // 使用正则替换处理，添加style属性防止图片太宽
            item_practice: imgUrl.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;" ')
          }
        })

        console.log(this.data.shopObject);
      }
    }).catch(err => {});
  },
  // 取消收藏
  clickFavorite() {
    this.cancelShop();
  },
  // 根据用户id,文章id,查询用户是否收藏
  getFavorite() {
    request('post', 'getUserfavorite', {
      shop_id: this.data.shopId,
      user_id: this.data.userData.id,
    }).then(res => {
      if (res.status == 200) {
        this.setData({
          ['shopObject.isfavorite']: res['data'] && res['data'].length ? 1 : 0
        })
        console.log(this.data.shopObject);
      }
    }).catch(err => {});
  },
  // 点击留言按钮
  clickEvaluate(event) {
    const evaluateid = event.currentTarget.dataset.evaluateid;
    wx.navigateTo({
      url: '../orderevaluate/orderevaluate?evaluateid=' + JSON.stringify(evaluateid),
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.shopdata), '===接收');
    this.setData({
      // shopObject: JSON.parse(options.shopdata),
      shopId: JSON.parse(options.shopdata),
      userData: wx.getStorageSync('userInfo')
    })
    console.log(this.data.shopId);
    this.getShopidList();
    this.getFavorite();
    this.getEvaluateList();
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