// pages/professionaltest/professionaltest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classTab: [{
      id: 1,
      class_name: '双相情感障碍测试',
      class_desc: '专业评估情绪状态，识别抑郁倾向'
    },{
      id: null,
      class_name: '',
      class_desc: ''
    }, {
      id: 2,
      class_name: '人格测评',
      class_desc: '深度剖析个性特质，助力自我认知与发展'
    }, {
      id: null,
      class_name: '',
      class_desc: ''
    }, {
      id: null,
      class_name: '',
      class_desc: ''
    }, {
      id: 3,
      class_name: '经典智力智商测试题',
      class_desc: '经典智商测试，判断自我学习能力'
    }, {
      id: null,
      class_name: '',
      class_desc: ''
    }, {
      id: 4,
      class_name: '人格测评2',
      class_desc: '深度剖析个性特质，助力自我认知与发展'
    }]
  },
  toClassList(event) {
    const id = event.currentTarget.dataset.type;
    console.log(id);
    if (id == null) {
      return false;
    }
    const url= `/pages/professionaltestlist/professionaltestlist?type=${id}`
    wx.navigateTo({
      url: url,
    })
    console.log(url)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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