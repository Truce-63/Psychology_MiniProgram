// pages/sendmsg/sendmsg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userData: wx.getStorageSync('userInfo'),
    filteredList: [],
    send_msg: '',
    searchList: [{
        title: '测试的准确性如何保证？',
        desc: '我们的心理健康测试由专业心理学者编写，并经过严格的评估。但请注意，由于个体差异和测试环境等因素，测试结果可能并非完全准确。建议您在测试时保持诚实，并结合其他评估方式进行参考。'
      },
      {
        title: '测试的可操作性如何？',
        desc: '我们的测试设计考虑了用户的可操作性，尽量使用简洁明了的语言。如果您在测试过程中遇到任何问题或困惑，欢迎随时联系我们，我们将竭诚为您解答。'
      },
      {
        title: '如何保护测试的隐私性？',
        desc: '您的隐私对我们至关重要。我们承诺，您的测试结果将仅被授权人员查看，并会采取严格的安全措施来保护您的数据。请放心参与测试，如有任何隐私方面的疑虑，欢迎随时与我们联系。'
      },
      {
        title: '测试能否根据个人的具体情况进行定制？',
        desc: '我们的测试在设计时已尽可能考虑不同用户的需求，但心理健康问题具有复杂性和多样性。如果您希望在测试后得到更个性化的建议，建议您与专业心理咨询师进行进一步交流和探讨。'
      }
    ],
    newArray: []

  },

  handleChange(e) {
    console.log(e.detail.value);
    this.setData({
      send_msg: e.detail.value
    })
  },

  search(event) {
    const title = event.currentTarget.dataset.title;
    let {
      searchList,
      send_msg,
      userData
    } = this.data;

    if (title) {
      send_msg = title;
    }

    let newList = [{
      role: 'self',
      title: send_msg,
      url: userData.head_portrait
    }];

    // 然后将匹配到的原始对象添加到新数组中  
    searchList.filter(item => item.title.includes(send_msg))
      .forEach(item => {
        newList.push(item);
      });

    this.setData({
      filteredList: newList,
      send_msg: ''
    })

    console.log(newList); // 输出新的数组对象，包含send_msg对象和匹配到的原始对象

  },

  set() {
    // 复制 searchList 数组  
    let shuffledList = [...this.data.searchList];

    // 打乱 shuffledList 数组  
    this.shuffleArray(shuffledList);

    // 取前三个元素形成新数组  
    let newArray = shuffledList.slice(0, 3);

    // 输出新数组  
    console.log(newArray);
    this.setData({
      newArray: newArray
    })
  },
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userData: wx.getStorageSync('userInfo'),
    })

    this.set()
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