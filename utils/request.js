export function REQUEST(url, params, method, success, fail) {
  REQUESTLoading(url, params, method, "", success, fail)
}
export function REQUESTGet(url, success, fail) {
  REQUESTLoading(url, null, "GET", "", success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
export function REQUESTLoading(url, params = null, method = "POST", message, success, fail) {
  console.log("请求服务端" + url + "       参数是" + params);
  let storageToken = wx.getStorageSync('token');
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  if (method != 'GET') {
    params = JSON.stringify(params);
  }
  wx.request({
    url: url,
    data: params,
    header: {
      'content-type': 'application/json',
      'appkey': '98HcsgdJ3mx4Ufcm',
      "Authorization": storageToken
    },
    method: method,
    success: (res) => {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail()
      }

    },
    fail: (res) => {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: (res) => {

    },
  })
}
// module.exports = {
//   REQUEST: REQUEST,
//   requestLoading: requestLoading
// }
