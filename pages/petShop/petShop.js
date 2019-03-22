// pages/petShop/petShop.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mypetNum: 4,
    myPet: ['鼠', '牛', '虎', '兔'],
    petAll: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
    petBuy:null,
    showPetList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let showPetList=[];
    let { myPet, petAll}=this.data
    petAll.forEach(function (element) {
      if (!myPet.includes(element)){
        showPetList.push(element)
       }
    });
    this.setData({
      showPetList
    })
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

  },
  radioChange(e) {
    this.setData({
      petBuy: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  handleBuy: function(){
    let now = new Date().getTime();
    let petInfo = { pet: this.data.petBuy, age: 1, mood: 8, health: 8, birth: now, last: now }
    let myPetInfo = wx.getStorageSync('myPetInfo');
    if (!myPetInfo) {
      myPetInfo = [petInfo]
      wx.setStorageSync('myPetInfo', myPetInfo)
    }else{
      myPetInfo.push(petInfo)
      wx.setStorageSync('myPetInfo', myPetInfo)
    }
  }
})