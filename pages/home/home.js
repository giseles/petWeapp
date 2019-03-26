// pages/home/home.js
import { randomNum } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexPicker: 0,
    myPet: wx.getStorageSync('myPet') || null,
    myPetInfo: wx.getStorageSync('myPetInfo') || null,
    activePet: wx.getStorageSync('myPet')[0] || null,
    activeInfo: wx.getStorageSync('myPetInfo')[0] || null,
    petSize: wx.getStorageSync('myPetInfo')[0] ? wx.getStorageSync('myPetInfo')[0].petSize : '40rpx',
    animationClass: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
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

  },
  navToPetShop: () => {
    wx.navigateTo({
      url: '/pages/petShop/petShop'
    })
  },
  // 刷新数据
  getData: function (index = 0) {
    let myPet = wx.getStorageSync('myPet');
    let myPetInfo = wx.getStorageSync('myPetInfo');
    this.setData({
      indexPicker: index,
      myPet: myPet || null,
      myPetInfo: myPetInfo || null,
      activePet: myPet[index] || null,
      activeInfo: myPetInfo[index] || null,
      petSize: myPetInfo[index] ? myPetInfo[index].petSize : '40rpx',
      animationClass: null
    });
  },
  // 选择宠物
  bindPickerChange(e) {
    let myPetInfo = JSON.parse(JSON.stringify(this.data.myPetInfo));
    let indexPicker = e.detail.value;
    let activePet = this.data.myPet[indexPicker];
    let activeInfo = myPetInfo[indexPicker];


    // 判断年龄是否更新
    let now = new Date().getTime();
    let age = Math.floor((now - activeInfo.birth) / (24 * 60 * 1000) + 1);
    let handleDay = Math.floor((now - activeInfo.last) / (24 * 60 * 1000) + 1);
    if (activeInfo.age !== age) {
      activeInfo.age = age;
    }
    if (handleDay > 1) {
      activeInfo.health = activeInfo.mood + randomNum(-5, 2);
      activeInfo.mood = activeInfo.mood + randomNum(-5, 2);
      activeInfo.last = now;
    }
    myPetInfo.splice(indexPicker, 1, activeInfo);
    wx.setStorageSync('myPetInfo', myPetInfo);
    this.getData(indexPicker);
  },

  // 喂养宠物
  handleFeed: function (event) {
    let method = event.currentTarget.dataset.feed;
    let {
      activePet,
      myPet,
      indexPicker
    } = this.data;
    let activeInfo = JSON.parse(JSON.stringify(this.data.activeInfo));
    let myPetInfo = JSON.parse(JSON.stringify(this.data.myPetInfo));
    let now = new Date().getTime();
    if (now < activeInfo.last + 10 * 1000) {
      const time = 10 - Math.floor((now - activeInfo.last) / 1000);
      wx.showToast({
        title: `${time}s后再陪${activePet}${activePet}玩`,
        icon: 'loading',
      })
      return;
    }
    let petSize = parseInt(this.data.petSize);
    if (method === 'play') {
      activeInfo.mood = activeInfo.mood + 2;
      this.setData({
        animationClass: 'animation',
      })
    } else {
      activeInfo.health = activeInfo.health + 2;
      if (petSize < 550) {
        activeInfo.petSize = petSize + 4 + 'rpx';
      }
    };
    activeInfo.last = now;
    if (indexPicker === undefined) {
      console.log('error');
      return;
    };
    myPetInfo.splice(indexPicker, 1, activeInfo);
    wx.setStorageSync('myPetInfo', myPetInfo)
    let newInfo = wx.getStorageSync('myPetInfo') || null;

    this.setData({
      myPetInfo: newInfo,
      activeInfo: newInfo[indexPicker],
      petSize: newInfo[indexPicker].petSize
    })
    wx.showToast({
      title: `${activePet}${activePet}又长大啦..`
    })
    setTimeout(() => {
      this.setData({
        animationClass: '',
      })
    }, 10000)
  },
})