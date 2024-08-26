// pages/examanswer/examanswer.js
const app = getApp();
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
    allTotal: 5, // 总题目数
    start: "", // 进页面的时间
    time: 1 * 10 * 60 * 1000, // 10min倒计时 1秒等于1000毫秒
    timeData: {},
    pageNumber: 0, // 默认题号 第一题
    radioVal: [], // 本试卷选中的正确答案
    radio: '', // 当前单选的答案
    radioIndex: null,
    examInfo: {}
  },
  // 处理答题倒计时
  timeChange(e) {
    let time = e.detail;

    // console.log(e.detail);
    this.setData({
      timeData: e.detail,
    });
    if (time.days === 0 && time.hours === 0 && time.milliseconds === 0 && time.minutes === 0 && time.seconds === 0) { // 倒计时结束 返回首页
      app.globalToast("答题时间结束,您本次答题无效");
      wx.reLaunch({
        url: '../index/index',
      });
    }
  },

  // 处理选择答案
  checkChange(e) {
    console.log('所选选项',e.detail);
    this.setData({
      radio: e.detail,
      radioIndex: this.data.examInfo.optionList.findIndex((n) => e.detail == n.optionval)
    })
    console.log('examInfo',this.data.examInfo)
    let flag = true
    if (this.data.examInfo.correct_results === e.detail) { // 将正确题号存入数组内计算分数
      console.log('flag1',flag)
      if(flag===true){
      this.data.radioVal.push(e.detail);
    }
      this.setData({
        radioVal: this.data.radioVal
      })
      console.log(this.data.radioVal, '答案数组');
      flag = false
      console.log('flag2',flag)
    }
    
  },
  // 获取试卷
  getExam(e) {
    this.setData({
      radio: ""
    })
    if (e && e.currentTarget.dataset.addpageno) {
      this.setData({
        pageNumber: this.data.pageNumber += 1
      })
    }
    request('get', 'getExamInfo', {
      pageNo: this.data.pageNumber
    }).then(res => {
      if (res.status === 200) {
        this.setData({
          examInfo: res.data
        })
      }
    }).catch(err => {});
  },
  addExamInfo() {
    request('get', 'setStudentInfo', {
      student_id: wx.getStorageSync('userInfo').id,
      student_name: wx.getStorageSync('userInfo').username,
      curscore: this.data.radioVal.length * 20, // 每个正确的题目价值10分
      // curscore: '', // 固定分数100，每个人都是最优秀的人
      time: formatTime(new Date()), // 交卷时间
      answertime: this.getTimeDifference(), // 考试所花费的时间 只需精确到分秒
    }).then(res => {
      app.globalToast(res.msg);
      wx.reLaunch({
        url: '../index/index',
      });

    }).catch(err => {});
  },
  // 获取两个时间的差值
  getTimeDifference() {
    // const data = formatTime(new Date(), false);
    const data = new Date();
    let answertime = this.timedifference(this.data.start, data);
    // let shijian = this.timedifference('20180901000121', '20180906000111');
    console.log(answertime, '打印相差时间', this.data.start, data);
    return answertime;
  },
  //计算两个时间之间的时间差
  timedifference(startTime, endTime) {
    // 以上是求得 用户输入时间的毫秒数
    // var date1 = new Date(); //开始时间 
    // var date2 = new Date(); //结束时间 
    // var date3 = date2.getTime() - date1.getTime() //时间差的毫秒数 
    var date3 = endTime.getTime() - startTime.getTime() //时间差的毫秒数
    //计算出相差天数 
    var days = Math.floor(date3 / (24 * 3600 * 1000))
    //计算出小时数 
    var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数 
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数 
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数 
    var minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数 
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数 
    var seconds = Math.round(leave3 / 1000)
    // return `${days}天${hours}时${minutes}分${seconds}秒`;
    return `${minutes}分${seconds}秒`;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // start: formatTime(new Date(), false)
      start: new Date()
    })
    this.getExam(); // 获取试卷
    // this.addExamInfo();
    // console.log(formatTime(new Date()), '交卷时提交此时间');
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