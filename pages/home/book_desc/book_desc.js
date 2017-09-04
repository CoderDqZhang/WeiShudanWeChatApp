// pages/home/book_desc/book_desc.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_info: null,
    my_book_info: null,
    windowWidth: 0,
    windowHeight: 0,
    isAddBook: false,
    isMyBook: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.mybook != null) {
      var data = JSON.parse(options.mybook)
      that.setData({
        my_book_info: data,
        isMyBook: data.borrowState == 1 || data.borrowState == 3 ? true : false,
        book_info: data.tails.bookInfo
      })
      console.log(that)
    } else {
      that.setData({
        isAddBook: true
      })
      that.requestBookInfo(options.isbn)
    }
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
  },

  requestBookInfo: function (isbn) {
    var that = this
    var data = { 'searchKey': isbn }
    app.func.requestGet('book/getBookByISBN', data, function (res) {
      console.log(res)
      var imageType = app.define.imageType(res[0].bookImg)
      res[0].imageType = imageType
      that.setData({
        book_info: res[0]
      })
    })
  },

  scah_code_product: function (res) {
    var that = this
    if (that.data.my_book_info.borrowState == 1) {
      wx.showActionSheet({
        itemList: ['借书', '赠送'],
        success: function (res) {
          var data
          switch (res.tapIndex) {
            case 0:
              var timestamp = Date.parse(new Date());
              timestamp = timestamp / 1000; 
              timestamp = timestamp + 20 * 24 * 60 * 60
              data = {
                "bookId":that.data.my_book_info.bookId,
                "userId":app.globalData.userId,
                "borrowEnd": "" + timestamp
                }
                break;
            default:
              data = {
                "bookId": that.data.my_book_info.bookId,
                "userId": app.globalData.userId,
                "giveEnd": ""
              }
              break;
          }
          wx.navigateTo({
            url: '../qrcode/qrcode?data=' + JSON.stringify(data),
          })
          console.log(res.tapIndex)
        },
        fail: function (res) {

        }
      })
    } else {
      wx.showActionSheet({
        itemList: ['还书'],
        success: function (res) {
          var data = {
            "bookId": that.data.my_book_info.bookId,
            "userId": app.globalData.userId,
          }
          wx.navigateTo({
            url: '../qrcode/qrcode?data=' + JSON.stringify(data),
          })
        },
        fail: function (res) {

        }
      })
    }
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

  }
})