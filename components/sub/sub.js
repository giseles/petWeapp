// components/sub/sub.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      type: Number,
      value: 2,
      observer: function(newVal, oldVal, changedPath) {
        if (newVal > 10) {
          this.setData({
            _index: 10
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})