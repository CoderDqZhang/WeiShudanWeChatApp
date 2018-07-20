// pages/home/book_user/book_user.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id: null,
    book_desc: null,
    windowHeight:0,
    windowWidth:0,
    shareData:null
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.book_id != null) {
      that.data.shareData = options.book_id
      that.setData({
        book_id: options.book_id
      })
      that.requestBookDescInfo()
    }
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
  },

  requestBookDescInfo: function () {
    var that = this
    var data = {
      "userId": app.globalData.userId,
      "id": that.data.book_id
    }
    app.func.requestGet('book/detail', data, function (res) {
      console.log(res)
      var imageType = app.define.imageType(res.book.bookImg)
      res.book.imageType = imageType
      that.setData({
        book_info: res
      })
    })
  },

  user_info_tap: function (res) {
    var that = this
    var data = that.data.book_info.users[res.currentTarget.dataset.index]
    var jsonData = JSON.stringify(data)
    wx.navigateTo({
      url: '../otherbooks/otherbooks?user_info=' + jsonData,
    })
  },

  attention_tap: function (res) {
    var that = this
    var objectUser = that.data.book_info.users[res.currentTarget.dataset.index]
    var data =
      {
        "attentionAtion": "attention",
        "objectId": objectUser.id,
        "userId": app.globalData.userId, 
        "attentionType": 2
      }
    app.func.requestPost('attention/update', data, function (res) {
      wx.showToast({
        title: res.message,
      })
    })
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
    var that = this
    return {
      title: '微借书小程序',
      path: 'pages/home/book_user/book_user?book_id=' + that.data.shareData,
      success: function (res) {

      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})