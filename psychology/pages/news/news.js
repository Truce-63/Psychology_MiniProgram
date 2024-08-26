// pages/news/news.js
const app = getApp();
const {
  request
} = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
    newlist: [],
    statusList: ['未预约', '预约中', '已预约']
  },
  // 比较时间
  compareDate(today, activityTime) {
    let isNext = false;
    var arrA = today.split("-");
    var dateA = new Date(arrA[0], arrA[1], arrA[2]).getTime();
    var arrB = activityTime.split("-");
    var dateB = new Date(arrB[0], arrB[1], arrB[2]).getTime();
    if (dateA > dateB) {
      isNext = false;
    } else { // 当前时间 在 活动时间 之前，则允许预约活动
      isNext = true;
    }
    return isNext;
  },
  // 预约活动
  addYuyue(event) {
    const activity = event.currentTarget.dataset.activity;
    // 获取当前日期
    const today = new Date().toLocaleDateString();
    // 活动日期
    const activityTime = activity.activity_time;
    console.log(today, activityTime);
    if (!this.compareDate(today, activityTime)) { // 当前时间大于活动时间 代表不可以预约了
      app.globalToast('活动不可以预约啦~')
      return false;
    }
    const user_id = this.data.userData.id;
    request('post', 'addUserActivity', {
      ...activity,
      activity_id: activity.id,
      user_id: user_id,
      appointment_status: 1
    }).then(res => {
      if (res.status === 200) {
        this.getnewsSource();
      }
    }).catch(err => {});
  },
  // 获取活动列表
  getnewsSource() {
    request('post', 'getActivity', {}).then(res => {
      if (res.status === 200) {
        this.getFavorite(res.data || [])
      }
    }).catch(err => {});
  },
  // 根据用户id,活动id,查询用户是否预约
  getFavorite(newlist) {
    request('post', 'getUserActivity', {
      user_id: this.data.userData.id,
    }).then(res => {
      if (res.status == 200) {
        // newlist是所有活动的列表
        const result = newlist.map(aObj => {
          const bObj = res['data'].find(bObj => bObj.activity_id === aObj.id);
          if (bObj) {
            return {
              ...aObj,
              ...bObj
            };
          }
          return {
            ...aObj,
            appointment_status: 0
          };
        });
        this.setData({
          newlist: result
        })
      }
    }).catch(err => {});
  },
  // 复制地址
  doAuthor: function (event) {
    const address = event.currentTarget.dataset.address;
    wx.setClipboardData({
      data: address,
      success(res) {
        app.globalToast('地址复制成功')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData: wx.getStorageSync('userInfo'), // 获取用户信息
    })
    this.getnewsSource();
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