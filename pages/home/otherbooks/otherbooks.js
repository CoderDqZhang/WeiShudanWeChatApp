// pages/home/other_books/other_books.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_list: null,
    user_info: null,
    windowHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.user_info != null) {
      that.setData({
        user_info: JSON.parse(options.user_info)
      })
    }
    this.requestMyBooks()
    that.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight
    })
  },

  requestMyBooks: function () {
    var that = this
    var data = { 'userId': app.globalData.userId, 'useUserId': that.data.user_info.id }
    app.func.requestGet('wishBook/list', data, function (res) {
      console.log(res)
      for (var i = 0; i < res.books.length; i++) {
        var imageType = app.define.imageType(res.books[i].tails.bookInfo.bookImg)
        res.books[i].tails.bookInfo.imageType = imageType
        res.books[i].tails.bookInfo.detailHref = ''
        var borrowDesc = res.books[i].borrowState == 1 ? '拥有' : res.books[i].borrowState == 2 ? '借出' : res.books[i].borrowState == 3 ? '待还' : '完成'
        res.books[i].tails.bookInfo.borrowDesc = borrowDesc
      }
      that.setData({
        book_list: res
      })
    })
  },

  showUserFunction: function () {
    var data = this.data.user_info
    var itemList = []
    if (data.mobile != '') {
      itemList.push('拨打电话')
      itemList.push('复制电话')
    }
    if (data.tails.userInfo.weixin != '') {
      itemList.push('复制微信号')
    }
    if (data.tails.userInfo.qrCode != '') {
      itemList.push('查看微信二维码')
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: data.mobile,
          })
        } else if (res.tapIndex == 1) {
          wx.setClipboardData({
            data: data.mobile,
            success: function (res) {
              wx.getClipboardData({
                success: function (res) {
                  wx.showToast({
                    title: '复制成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
          })
        } else if (res.tapIndex == 2) {
          wx.setClipboardData({
            data: data.tails.userInfo.weixin,
            success: function (res) {
              wx.getClipboardData({
                success: function (res) {
                  wx.showToast({
                    title: '复制成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
          })
        }
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
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

  }
})