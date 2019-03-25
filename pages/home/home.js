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
    petSize: wx.getStorageSync('myPetInfo')[0] ? wx.getStorageSync('myPetInfo')[0].petSize : '40rpx',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
      indexPicker: 0,
      myPet: wx.getStorageSync('myPet') || null,
      petNum: wx.getStorageSync('myPet').length || 0,
      myPetInfo: wx.getStorageSync('myPetInfo') || null,
      activePet: wx.getStorageSync('myPet')[0] || null,
      activeInfo: wx.getStorageSync('myPetInfo')[0] || null,
      petSize: wx.getStorageSync('myPetInfo')[0] ? wx.getStorageSync('myPetInfo')[0].petSize : '40rpx',
      animationClass: null
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
  navToPetShop: () => {
    wx.navigateTo({
      url: '/pages/petShop/petShop'
    })
  },
  // 选择宠物
  bindPickerChange(e) {
    let activePet = this.data.myPet[e.detail.value];
    let {
      myPetInfo
    } = this.data;
    let activeInfo = null,
      indexPicker;
    myPetInfo.map(function(item, index) {
      if (item.pet === activePet) {
        activeInfo = item;
        indexPicker = index;
        return activeInfo
      }
    })
    // 判断年龄是否更新
    // let now = new Date().getTime();
    // let age = Math.floor((now - activeInfo.birth) / (24 * 60 * 1000) + 1);
    // if (activeInfo.age !== age) {
    //   activeInfo.age = age;

    //   myPetInfo.splice(indexPicker, 1);
    //   myPetInfo.push(activeInfo)
    //   wx.setStorageSync('myPetInfo', myPetInfo);
    //   let newInfo = wx.getStorageSync('myPetInfo') || null;
    //   this.setData({
    //     myPetInfo: newInfo,
    //     activeInfo,
    //     activePet,
    //     petSize: activeInfo.petSize || '40rpx'
    //   })

    // } 
    this.setData({
      activePet,
      activeInfo,
      petSize: activeInfo.petSize || '40rpx',
    })
  },

  // 喂养宠物
  handleFeed: function(event) {
    let method = event.currentTarget.dataset.feed;
    let {
      activeInfo,
      activePet,
      indexPicker,
      myPetInfo,
      myPet
    } = this.data;
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
        petSize = petSize + 4;
      }
    };
    activeInfo.last = now;
    myPetInfo.map(function(item, index) {
      if (item.pet === activePet) {
        indexPicker = index;
        return indexPicker
      }
    });
    myPetInfo.splice(indexPicker, 1);
    myPetInfo.push(activeInfo);
    wx.setStorageSync('myPetInfo', myPetInfo)
    let newInfo = wx.getStorageSync('myPetInfo') || null;
    this.setData({
      myPetInfo: newInfo,
      activeInfo: newInfo[newInfo.length - 1],
      petSize: newInfo[newInfo.length - 1].petSize
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