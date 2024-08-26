const {
  request
} = require('../../utils/http');

const app = getApp();
// pages/testResult/testResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: wx.getStorageSync('userInfo'), // 获取用户信息
    user_type:'', //测试类型
    user_score:'', //测试分数
    type:'', //测试结果类型
    description:'', //测试结果描述
    suggestion:'',  //结果建议
  },

  //获取 测试结果
  getTestResult(){
    request('post','getTestResult',{
      user_type:this.data.user_type,
      user_score:this.data.user_score
    }).then(res => {
      if (res.status == 200){
        console.log('res.data:',res.data) 
        this.setData({
          type:res.data[0].type,
          description: res.data[0].description,
          suggestion: res.data[0].suggestion
        });

        this.addTestResult();
      }
    }).catch(err => {
      console.error('请求失败:', err);
      app.globalToast('提交失败，请检查网络或稍后重试');
    });  
  },

  // 提交测试结果
  addTestResult() {
    const userData = this.data.userData;
    const formatTime = time => {
      // 示例格式化时间的函数
      return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    };
    request('post', 'addTestResult', {
      user_id: userData.id,
      user_name: userData.username,
      user_score: this.data.user_score,
      update_time: formatTime(new Date()),
      test_type: this.data.user_type,
      test_result_type: this.data.type, // 使用 getTestResult 中获取的 type
      description: this.data.description, // 使用 getTestResult 中获取的 description
      suggestion: this.data.suggestion // 使用 getTestResult 中获取的 suggestion
    }).catch(err => {
      console.error('请求失败:', err);
      app.globalToast('测试记录提交失败，请检查网络或稍后重试');
    });
  },


  goBack() {
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user_type:Number(options.user_type),
      user_score:Number(options.user_score)
    },()=>{
      this.getTestResult();
      // console.log('传送数据:score',options);
      // console.log('传送数据user_type,user_score',typeof options.user_score,typeof options.user_type)
      // console.log('jiance传送数据:score',this.data.score,this.data.type);
      // console.log('jiance传送数据type,score类型',typeof this.data.score,typeof this.data.type)
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