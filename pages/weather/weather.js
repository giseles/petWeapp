// pages/weather/weather.js
import {
  randomNum
} from '../../utils/util.js'
let bmap = require('../../libs/bmap-wx.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherData: '',
    lifeimg: [
      '/images/lifestyle_drsg.png',
      '/images/lifestyle_cw.png',
      '/images/lifestyle_flu.png',
      '/images/lifestyle_sport.png',
      '/images/lifestyle_uv.png',
    ],
    myPetInfo: wx.getStorageSync('myPetInfo') || null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let BMap = new bmap.BMapWX({
      ak: '8uNzpmeLN88cyZp7KfrPiSroCPR5vXpo'
    });
    let fail = (data) => {
      wx.showToast({
        title: "请稍后再试",
        icon: 'loading',
      })
    };
    let success = (data) => {
      console.log(data);
      let weatherData = data.currentWeather[0];
      let forecast = data.originalData.results[0].weather_data;
      let advise = data.originalData.results[0].index;
      let date = weatherData.date.split("(");
      let currentWeater = date[1].replace(/[^0-9]/ig, "")
      date = date[0].replace(/(\s*$)/g, "");
      forecast.splice(0, 1);
      //天气影响宠物心情
      let myPetInfo = this.data.myPetInfo;
      if (weatherData.weatherDesc.includes("雨") && myPetInfo) {
        let now = new Date().getTime();
        for (let index in myPetInfo) {
          let current = myPetInfo[index];
          let handleDay = Math.floor((now - current.last) / (24 * 60 * 60 * 1000) + 1);
          if (handleDay > 1) {
            current.mood = current.mood + randomNum(-10, -5);
            myPetInfo.splice(index, 1, current);
          }
        }
        wx.setStorageSync('myPetInfo', myPetInfo);
      }
      this.setData({
        weatherData,
        forecast,
        advise,
        date,
        currentWeater,
        city: weatherData.currentCity
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})