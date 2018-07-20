// pages/home/comment/comment.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_list: null,
    windowHeight: 0,
    windowWidth: 0,
    check: [],
    book_info: null,
    isEdite:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
    if (options.book_info != null) {
      that.setData({
        book_info: JSON.parse(options.book_info)
      })
    }

    var data = wx.getStorageSync("tags")
    that.setData({
      data_list: wx.getStorageSync("tags")
    })
    for (var i = 0; i < that.data.data_list.length; i++) {
      that.data.check.push(0)
    }
  },

  changeData: function () {
    var that = this
    that.data.check = []
    that.setData({
      data_list: wx.getStorageSync("tags")
    })

    for (var i = 0; i < that.data.data_list.length; i++) {
      that.data.check.push(0)
    }
  },

  add_my_comment: function (res) {
    wx.navigateTo({
      url: '../add_comment/add_comment',
    })
  },

  add_my_book: function (res) {
    var that = this
    var str = ''
    for (var i = 0; i < that.data.check.length; i++) {
      if (that.data.check[i] == 1) {
        str = str + 'weichat_' + that.data.data_list[i] + '_'
      }
    }
    var that = this
    var data = {
      "bookId": that.data.book_info.id,
      "userId": app.globalData.userId,
      "state": "1,2,3",
      "commentContent": str,
      "comments": [],
      "address": ""
    }
    app.func.requestPost('wishBook/add', data, function (res) {
      wx.showModal({
        title: res.message,
        showCancel: false,
        confirmText: "知道了",
        confirmColor: "#594CA8",
        success: function success(res) {
          if (res.confirm) {
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
            var pages = getCurrentPages();
            var prePage = pages[pages.length - 2];
            //关键在这里
            prePage.requestMyBooks()
          }

        }
      });
    })
  },

  select_comment: function (res) {
    var that = this
    var tempData = that.data.check
    for (var i = 0; i < that.data.check.length; i++) {
      var tag = that.data.check[i]
      if (i == res.currentTarget.dataset.index) {
        if (tag == 0) {
          tempData[i] = 1
        } else {
          tempData[i] = 0
        }
      } else {
        tempData[i] = that.data.check[i]
      }
    }
    that.setData({
      check: tempData
    })

  },

  edite_comment:function(e) {
    var that = this
    that.setData({
      isEdite: that.data.isEdite ? false:true
    })
  },

  delete_btn: function (res) {
    var that = this
    var tempList = []
    var tempCheck = []
    for (var i=0;i<that.data.data_list.length;i++){
      if (i != res.currentTarget.dataset.index) {
        tempList.push(that.data.data_list[i])
        tempCheck.push(0)
      }
    }
    that.setData({
      data_list:tempList,
      check: tempCheck
    })
    wx.setStorageSync("tags", that.data.data_list)
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