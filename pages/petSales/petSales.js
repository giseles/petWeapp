// pages/activePets/activePets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPet: wx.getStorageSync('myPet') || null,
    petNum: wx.getStorageSync('myPet').length || 0,
    activePet: null,
    myPetInfo: wx.getStorageSync('myPetInfo') || null,
    activeInfo: null,
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
      myPetInfo: wx.getStorageSync('myPetInfo') || null,
      activeInfo: null,
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
  },
  handleSale: function() {
    let {
      myPetInfo,
      activePet,
      myPet
    } = this.data;
    let activeInfo, nowIndex;
    if (!activePet) {
      wx.showToast({
        title: '请选择宠物'
      })
      return;
    }

    wx.showModal({
      title: '残忍提示',
      content: '是否真的要丢弃',
      success(res) {
        if (res.confirm) {
          myPetInfo.map(function(item, index) {
            if (item.pet === activePet) {
              activeInfo = item;
              nowIndex = index
              return activeInfo
            }
          });
          myPetInfo.splice(nowIndex, 1);
          myPet.splice(nowIndex, 1);
          wx.setStorageSync('myPetInfo', myPetInfo)
          wx.setStorageSync('myPet', myPet);
          wx.showToast({
            title: `${activePet}${activePet}去屠宰场了..`
          })
          setTimeout(function() {
            wx.switchTab({
              url: './../home/home'
            })
          }, 2000)
        } else if (res.cancel) {
          wx.showToast({
            title: `${activePet}${activePet}爱你..`
          })
          setTimeout(function() {
            wx.switchTab({
              url: './../home/home'
            })
          }, 2000)
        }
      }
    })
  },
  sureSale: function() {
    let {
      myPetInfo,
      activePet,
      myPet
    } = this.data;
    let activeInfo, nowIndex;
    myPetInfo.map(function(item, index) {
      if (item.pet === activePet) {
        activeInfo = item;
        nowIndex = index
        return activeInfo
      }
    });
    myPetInfo.splice(nowIndex, 1);
    myPet.splice(nowIndex, 1);
    wx.setStorageSync('myPetInfo', myPetInfo)
    wx.setStorageSync('myPet', myPet);
  }
})