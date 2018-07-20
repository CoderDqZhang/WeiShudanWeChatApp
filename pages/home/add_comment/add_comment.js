// pages/home/add_comment/add_comment.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArray:[],
    windowHeight: 0,
    windowWidth: 0,
    inputValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      dataArray:wx.getStorageSync("tags")
    })
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  add_my_comment: function () {
    var that = this
    if (that.data.inputValue == '') {
      wx.navigateBack({
      })
    }else{
      if (that.data.dataArray == '') {
        that.data.dataArray = []
      }
      that.data.dataArray.push(that.data.inputValue)
      wx.setStorageSync("tags", that.data.dataArray)
      var pages = getCurrentPages();
      if (pages.length > 1) {
        //上一个页面实例对象
        var prePage = pages[pages.length - 2];
        //关键在这里
        prePage.changeData()
      }
      wx.navigateBack({
        delta: 2, // 回退前 delta(默认为1) 页面
        success: function success(res) {
          // success
        },
        fail: function fail() {
          // fail
        },
        complete: function complete() {
          // complete
        }
      });
    }
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
  
  }
})