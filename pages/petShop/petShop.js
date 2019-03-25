// pages/petShop/petShop.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPet: wx.getStorageSync('myPet') || null,
    petNum: wx.getStorageSync('myPet').length || 0,
    petAll: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
    activePet: null,
    showPetList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.setData({
      myPet: wx.getStorageSync('myPet') || null,
      petNum: wx.getStorageSync('myPet').length || 0,
      activePet: null,
    }, () => {
      let {
        myPet,
        petAll
      } = this.data;
      if (!myPet) {
        this.setData({
          showPetList: petAll
        })
        return;
      }
      this.changePetList();
    })
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

  },
  radioChange(e) {
    this.setData({
      activePet: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  changePetList: function() {
    let showPetList = [];
    let {
      myPet,
      petAll
    } = this.data;
    petAll.forEach(function(element) {
      if (!myPet.includes(element)) {
        showPetList.push(element)
      }
    });
    this.setData({
      showPetList
    })
  },
  handleBuy: function() {
    let now = new Date().getTime();
    let {
      myPet,
      activePet,
      petAll
    } = this.data;
    if (!activePet) {
      wx.showToast({
        title: '请选择宠物'
      })
      return;
    }
    let petInfo = {
      pet: activePet,
      age: 1,
      mood: 60,
      health: 60,
      petSize:'40rpx',
      birth: now,
      last: now - 10 * 1000
    }
    let myPetInfo = wx.getStorageSync('myPetInfo') || null;
    if (myPet && myPetInfo) {
      myPet.push(activePet)
      myPetInfo.push(petInfo)
    } else {
      myPet = [activePet]
      myPetInfo = [petInfo]
    }
    wx.setStorageSync('myPet', myPet)
    wx.setStorageSync('myPetInfo', myPetInfo)
    wx.showToast({
      title: '领养成功'
    })
    setTimeout(function() {
      wx.switchTab({
        url: './../home/home'
      })
    }, 2000)
  }
})