//my.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // pets: wx.getStorageSync('myPet')||null,
    // petNum: wx.getStorageSync('myPet').length || 0,
    mypetNum: 3,
    myPet: ['鼠', '牛', '虎', '兔'],
    myPetInfo: [{ pet: '狗', age: 1, mood:1,health:10,birth:'',last:''},
      { pet: '虎', age: 1, mood: 1, health: 10, birth: '', last: '' },
      { pet: '猫', age: 1, mood: 1, health: 10, birth: '', last: '' },
      { pet: '鸡', age: 1, mood: 1, health: 10, birth: '', last: '' }],
    petAll: ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (!wx.getStorageSync('petAll')){
      wx.setStorageSync('petAll', this.data.petAll)
    }
    console.log(this.data.myPet.length)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  navToPetShop:()=>{
    wx.navigateTo({
      url: '/pages/petShop/petShop'
    })
  },
  navToPetSales:()=>{
    wx.navigateTo({
      url: '/pages/petSales/petSales'
    })
  },
})
