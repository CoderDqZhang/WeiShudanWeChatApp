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
    doubanApi:null,
    doubanInfo:null,
    comment_list:[],
    shareData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.mybook != null) {
      var data = JSON.parse(options.mybook)
      that.data.shareData = options.mybook
      that.setData({
        my_book_info: data,
        isMyBook: data.borrowState == 1 || data.borrowState == 3 ? true : false,
        book_info: data.tails.bookInfo
      })
      that.showBookInfo(data.isbn)
      console.log(that)
    } else if (options.topbook != null) {
      var data = JSON.parse(options.topbook)
      that.setData({
        my_book_info: data,
        isMyBook: false,
        book_info: data
      })
      that.showBookInfo(data.isbn)
      console.log(that)
    } else {
      that.setData({
        isAddBook: true
      })
      that.requestBookInfo(options.isbn)
      that.showBookInfo(options.isbn)
    }
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
    that.requestComment()
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

  requestComment: function (res) {
      var that = this
      var data = { 'commType': '2','objectId':that.data.book_info.id}
      var tempList = []
      app.func.requestGet('comment/list', data, function (res) { 
        var strs = res[0].commContent.split('_')
        for (var i = 0; i < strs.length; i ++) {
          if (i % 2 == 0 && strs[i] == 'weichat') {
            console.log(strs[i + 1])
            tempList.push(strs[i + 1])
          }
        }
        that.setData({
          comment_list:tempList
        })
        console.log(that)
        console.log(res)
      })
  },

  showBookInfo: function (isbn) {
    var that = this
    wx.request({
      url: 'https://api.douban.com/v2/book/isbn/:' + isbn,
      method: 'get',
      header: {
        'content-type': 'application/text',
      },
      success(res){
        that.setData({
          doubanInfo:res.data ,
        })
        
      },
      fail(res){
        console.log(res)
      },
    })
  },

  add_my_book: function (res){
    var that = this
    // let imageArray = that.data.book_info.bookImage.
    that.data.book_info.detailHref = ""
    var data = JSON.stringify(that.data.book_info)
    wx.navigateTo({
      url: '../comment/comment?book_info=' + data,
    })
  },

  books_desc: function (res){
    var that = this
    wx.navigateTo({
      url: '../boooks_douban/books?url=' + that.data.doubanInfo.alt,
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
    var that = this
    return {
      title: '微借书小程序',
      path: 'pages/home/book_desc/book_desc?mybook=' + that.data.shareData,
      success: function (res) {

      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})