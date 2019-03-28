// pages/weather/weather.js
let bmap = require('../../libs/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherData: '',
    show: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let BMap = new bmap.BMapWX({
      ak: '8uNzpmeLN88cyZp7KfrPiSroCPR5vXpo'
    });
    let fail = (data) => {
      console.log('fail!!!!')
    };
    let success = (data) => {
      console.log('success!!!');
      let weatherData = data.currentWeather[0];
      weatherData =
        `城市：${weatherData.currentCity}
        日期：${weatherData.date}
        温度：${weatherData.temperature}
        天气：${weatherData.weatherDesc}
        风力：${weatherData.wind}
        PM2.5：${weatherData.pm25}
      `;
      this.setData({
        weatherData: weatherData
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
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