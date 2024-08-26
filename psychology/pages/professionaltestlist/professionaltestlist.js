// pages/professionaltestlist/professionaltestlist.js
const {
  request
} = require('../../utils/http');
const {
  formatTime
} = require('../../utils/util');
const app = getApp();
Page({

  /** 
   * 页面的初始数据
   */
  data: {
    TimuList: [],
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
    answers: {},
    type: '', // 题目类型
    score:'',
  },
  onChange(event) {
    const name = event.detail.split(':')[0];
    const value = Number(event.detail.split('_')[1]);

    // 更新答案对象，先判断是否存在
    this.setData({
      ['answers.' + name]: value
    }, () => {
      console.log("分值", value);
      console.log(this.data.answers);
    });
},
  submitTest: function () {
    const {
      userData
    } = this.data;
    
    // 提交测试时，获取所有选中的option对象  
    const selectedOptions = Object.values(this.data.answers);

    console.log("题目数量",this.data.TimuList.length)
    console.log("答题数",selectedOptions)
    

    const sum = selectedOptions.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log("测试总分",sum);
    
    // 检查是否完成全部题目
    const TimuLength = this.data.TimuList.length;
    if (selectedOptions.length !== TimuLength) {
        app.globalToast('请回答所有题目后再提交');
        return; // 阻止提交
    }
        wx.navigateTo({
          url: `/pages/testResult/testResult?user_type=${this.data.type}&user_score=${sum}`,
        });
        

  },
 
  // 获取全部题目
  getTimuList() {
    const { type } = this.data;
    console.log("--------题目type",type);
    request('post', 'getTimuList', {
      problem_type: String(type)
    }).then(res => {
      if (res.status == 200) {
        this.setData({
          TimuList: (res['data'] || []).map(item => {
            return {
              ...item,
              problem_option: JSON.parse(item.problem_option)
            }
          })
        })
        console.log(res['data']);
      }
    }).catch(err => {});
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type: JSON.parse(options.type),
      userData: wx.getStorageSync('userInfo'),
      
    },()=>{
      //console.log("-----type: ",type)
      console.log("-----options: ",options)
      this.getTimuList()
    })
  
    
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