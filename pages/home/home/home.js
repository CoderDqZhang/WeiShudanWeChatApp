// pages/home/home/home.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getUserInfo()
    app.define.imageType('test')
    // that.requestLogin()
  },

  /**
   * 扫一扫点击
   */
  scan_tap: function () {
    var that = this
    wx.scanCode({
      'onlyFromCamera': true,
      success:(res) => {
        that.scanResultGender(res)
        console.log(res)
      },
    })
    // wx.navigateTo({
    //   url: '../book_desc/book_desc?isbn=' + '9787111079279',
    // })
  },

  scanResultGender: function(data) {
    var that = this
    switch (data.scanType) {
      case 'EAN_13':
        wx.navigateTo({
          url: '../book_desc/book_desc?isbn=' + data.result,
        })
        break;
      case 'QR_CODE':
        var data = JSON.parse(data.result)
        data.useUserId = app.globalData.userId
        if (data.giveEnd != null) {
          that.requestGiveEnd(data)
        }else if (data.borrowEnd == null) {
          that.requestBorrowReturn(data)
        }else{
          that.requestBorrowBook(data)
        }
        break;
      default:
        break;
    }
  },

  requestGiveEnd: function (data) {
    console.log('赠送')
    var testData = data
    testData.userId = data.userUserId
    testData.userUserId = data.userId
    app.func.requestPost('giveBook/acceptAdd', testData, function (res) {
      console.log(res)
      wx.showModal({
        title: res.message,
        confirmColor: "#594CA8",
        confirmText: "知道了",
        success: function (res) {
          console.log('用户点击确定')
        }
      })
    })
  },

  requestBorrowReturn: function (data) {
    console.log('还书')
    app.func.requestPost('borrowBook/returnAdd', data, function (res) {
      wx.showModal({
        title: res.message,
        confirmColor: "#594CA8",
        confirmText: "知道了",
        success: function (res) {
          console.log('用户点击确定')
        }
      })
    })
  },

  requestBorrowBook: function (data) {
    console.log('借书')
    app.func.requestPost('borrowBook/borrowAdd', data, function (res) {
      wx.showModal({
        title: res.message,
        confirmColor: "#594CA8",
        confirmText: "知道了",
        success: function (res) {
          console.log('用户点击确定')
        }
      })
    })
  },

  /**
     * 登录接口 ，，，，先固定死
     */
  // requestLogin: function () {
  //   app.func.requst
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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