// pages/rankinglist/rankinglist.js
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: [{
        num: 1, // 用户排名
        userId: 'admin', // 用户id
        username: '蔚来1', // 用户名称
        totalscore: 101, // 用户总成绩
      },
      {
        num: 2,
        username: '蔚来2',
        totalscore: 102
      },
      {
        num: 3,
        username: '蔚来3',
        totalscore: 103
      },
      {
        num: 4,
        username: '蔚来4',
        totalscore: 100
      },
      {
        num: 5,
        username: '蔚来5',
        totalscore: 100
      },
    ]
  },

  getRankList() {
    
    request('get', 'getRankList', {}).then(res => {
      if(res.status === 200) {
        this.setData({
          rankList: res.data
        })
      }
      console.log(res.data, '======res');
    }).catch(err => {});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRankList();
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