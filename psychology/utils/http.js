// const GET = 'GET';
// const POST = 'POST';
// const PUT = 'PUT';
// const FORM = 'FORM';
// const DELETE = 'DELETE';
const app = getApp();
const baseURL = 'http://127.0.0.1:6008/'; // 设置一个全局常量baseUrl用来存储请求前缀
const request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const reqmethod =  method.toUpperCase();
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url: baseURL + url,
      method: reqmethod,
      data: reqmethod === "POST" ? JSON.stringify(data) : data,
      header: {
        'content-type': 'application/json',
      },
      success(res) { //请求成功
        wx.hideLoading();
        //判断状态码---status状态根据后端定义来判断
        if (res.data.status == 200) {
          resolve(res.data);
        } else {
          //其他异常
          app.globalToast(res.data.msg); // 此方法会弹出除了状态为200的提示语
          reject('运行时错误,请稍后再试');
        }
      },
      fail(err) { //请求失败
        wx.hideLoading();
        app.globalToast();
        reject(err)
      }
    })
  })
}
module.exports = {
  request
}