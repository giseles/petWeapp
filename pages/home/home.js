// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexPicker: 0,
    myPet: wx.getStorageSync('myPet') || null,
    petNum: wx.getStorageSync('myPet').length || 0,
    myPetInfo: wx.getStorageSync('myPetInfo') || null,
    activePet: wx.getStorageSync('myPet')[0] || null,
    activeInfo: wx.getStorageSync('myPetInfo')[0] || null,
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      indexPicker: 0,
      myPet: wx.getStorageSync('myPet') || null,
      petNum: wx.getStorageSync('myPet').length || 0,
      myPetInfo: wx.getStorageSync('myPetInfo') || null,
      activePet: wx.getStorageSync('myPet')[0] || null,
      activeInfo: wx.getStorageSync('myPetInfo')[0] || null,
      fontSize: '40rpx',
      animationData: "",
      animation: null
    })
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
    let activePet = this.data.myPet[e.detail.value];
    let { myPetInfo } = this.data;
    let activeInfo = null
    myPetInfo.map(function (item, index) {
      if (item.pet === activePet) {
        activeInfo = item;
        return activeInfo
      }
    })
    this.setData({
      activePet,
      activeInfo
    })
  },
  navToPetShop: () => {
    wx.navigateTo({
      url: '/pages/petShop/petShop'
    })
  },
  feedWater: function () {
    this.handleFeed('water')
  },
  feedFood: function () {
    this.handleFeed('food')
  },
  feedPlay: function () {
    this.handleFeed('play')
  },
  handleFeed: function (method) {

    let { activeInfo, activePet, indexPicker,
      myPetInfo } = this.data;

    let now = new Date().getTime();
    if (now < activeInfo.last + 10 * 1000) {
      wx.showToast({
        title: `10s后再陪${activePet}${activePet}玩`,
        icon: 'loading',
      })
      return;
    }
    let fontSize = parseInt(this.data.fontSize);
    if (method === 'play') {
      activeInfo.mood = activeInfo.mood + 2;
      fontSize = fontSize + 2;
      this.petAnimation()
      this.setData({
        animation: 'animation',
      })
    } else {
      activeInfo.health = activeInfo.health + 2;
      fontSize = fontSize + 2;
    };
    activeInfo.last = now;
    myPetInfo.map(function (item, index) {
      if (item.pet === activePet) {
        indexPicker = index;
        return indexPicker
      }
    });
    myPetInfo.splice(indexPicker, 1);
    myPetInfo.push(activeInfo)
    wx.setStorageSync('myPetInfo', myPetInfo)
    this.setData({
      activeInfo,
      myPetInfo,
      fontSize: fontSize + 'rpx'
    })
    wx.showToast({
      title: `${activePet}${activePet}又长大啦..`
    })
    setTimeout(() => {
      this.setData({
        animation: '',
      })
    }, 10000)
  },

  petAnimation: function () {

    //创建动画
    var animation = wx.createAnimation({

      duration: 5000,
      timingFunction: "ease",
      delay: 0,
    })

    //设置动画
    // animation.rotate(90).step();     //旋转90度
    //animation.scale(1.5).step();        //放大1.5倍
    //animation.translate(-30,-50).step();        //偏移x,y,z
    //animation.skew(30,50).step();        //倾斜x,y

    animation.translate(100, 0).translate(-100, 0).step();     //边旋转边放大


    //导出动画数据传递给组件的animation属性。
    this.setData({
      animationData: animation.export(),
    })
  }
})