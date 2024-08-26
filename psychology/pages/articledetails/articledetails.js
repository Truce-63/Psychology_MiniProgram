// pages/articledetails/articledetails.js
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
    articleInfo: {}
  },
  // 加入 & 取消 收藏
  onChange() {
    const isaddfavorite = this.data.articleInfo.isaddfavorite;
    this.setData({
      ['articleInfo.isaddfavorite']: isaddfavorite === 1 ? 0 : 1,
    });
    this.setFavoriteChange();
  },

  setFavoriteChange() {
    let param = {
      user_id: this.data.userData.user_id,
      news_id: this.data.articleInfo.news_id,
      title: this.data.articleInfo.title,
      brief_content: this.data.articleInfo.brief_content,
      content: this.data.articleInfo.content,
      isaddfavorite: this.data.articleInfo.isaddfavorite,
      update_time: this.data.articleInfo.update_time
    }
    request('post', 'changeFavorite', param).then(res => {
      // console.log(res, '======res');
      if (res.status == 200) {
        const tiptext = this.data.articleInfo.isaddfavorite === 0 ? '已取消收藏' : '已添加收藏';
        app.httpErr(tiptext);
      }
    }).catch(err => {});

  },
  // 根据用户id,资讯id,查询用户是否收藏
  getFavorite() {
    request('post', 'getFavorite', {
      news_id: this.data.articleInfo.news_id,
      user_id: this.data.userData.user_id,
    }).then(res => {
      if (res.status == 200) {
        console.log(res.data, '====shpucang');
        this.setData({
          ['articleInfo.isaddfavorite']: res['data'] && res['data'].length ? 1 : 0
        })
      }
    }).catch(err => {});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let articleinfo = wx.getStorageSync('articleinfo');
    this.setData({
      userData: wx.getStorageSync('userInfo'),
      articleInfo: {
        news_id: articleinfo.news_id ? articleinfo.news_id : articleinfo.id,
        ...articleinfo
      }
    })

    this.getFavorite();
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