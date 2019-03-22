// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    mypetNum: 0,
    myPet: ['鼠', '牛', '虎', '兔'],
    myPetInfo: [{ pet: '狗', age: 1, mood: 1, health: 10, birth: '', last: '' },
      { pet: '虎', age: 1, mood: 1, health: 10, birth: '', last: '' },
      { pet: '猫', age: 1, mood: 1, health: 10, birth: '', last: '' },
      { pet: '鸡', age: 1, mood: 1, health: 10, birth: '', last: '' }],
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
    wx.setStorage({
      key: 'key',
      data: 'value'
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
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    },()=>{
      console.log(this.data.myPet[e.detail.value])
    })
  },
  navToPetShop: () => {
    wx.navigateTo({
      url: '/pages/petShop/petShop'
    })
  }
})