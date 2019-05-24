// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['生命周期函数开始测试'],
    num: 0,
    title: 'Demo'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let list = this.data.list;
    list.push('监听页面加载 onLoad')
    this.setData({
      list
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let list = this.data.list;
    list.push('监听页面初次渲染完成 onReady')
    this.setData({
      list
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let list = this.data.list;
    list.push('监听页面显示 onShow')
    let num = this.data.num + 2
    this.setData({
      list,
      num
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let list = this.data.list;
    list.push('监听页面隐藏 onHide')
    this.setData({
      list
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    let list = this.data.list;
    list.push('监听页面卸载 onUnload')
    this.setData({
      list
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let list = this.data.list;
    list.push('监听用户下拉动作 onPullDownRefresh')
    this.setData({
      list
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let list = this.data.list;
    list.push('页面上拉触底事件的处理函数 onReachBottom')
    this.setData({
      list
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    let list = this.data.list;
    list.push('用户点击右上角分享 onShareAppMessage')
    this.setData({
      list
    })
  }
})