// pages/scorerecord/scorerecord.js
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // scoreList: [{
    //     curscore: '96', // 本次考试分数
    //     time: '2022-05-20 16:15:26', // 本次考试时间
    //     totalscore: '1600', // 本次考试成绩
    //     answertime: '16分52秒', // 本次考试所用时间
    //   },
    //   {
    //     curscore: '96',
    //     time: '2022-05-20 16:15:26',
    //     totalscore: '1600',
    //     answertime: '16分52秒'
    //   },
    //   {
    //     curscore: '96',
    //     time: '2022-05-20 16:15:26',
    //     totalscore: '1600',
    //     answertime: '16分52秒'
    //   },
    //   {
    //     curscore: '96',
    //     time: '2022-05-20 16:15:26',
    //     totalscore: '1600',
    //     answertime: '16分52秒'
    //   },
    // ]
  },
  getScorerList() {

    request('get', 'getScoreList', {
      id: wx.getStorageSync('userInfo').id
    }).then(res => {
      // let arr = res.data.data.sort((a, b) => b.time - a.time);
      let arr = res.data.sort((a, b) => b.time < a.time ? -1 : 1);
      this.setData({
        scoreList: res.data
      })
      console.log(res.data, '======res', arr);
    }).catch(err => {});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getScorerList();
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