// pages/home/my_borrow/my_borrow.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    borrow_list_user:[],
    borrow_list_other:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.requestBorrow()
  },

  requestBorrow: function () {
    var that = this
    var data = { "userId": app.globalData.userId}
    app.func.requestGet('borrowBook/list', data, function (res) {
      for (var i = 0; i < res.length; i++) {
        var imageType = app.define.imageType(res[i].tails.bookInfo.bookImg)
        res[i].tails.bookInfo.imageType = imageType
        res[i].tails.bookInfo.detailHref = ''
        res[i].borrowStart = app.define.toDate(Number(res[i].borrowStart) / 1000)
        res[i].borrowEnd = app.define.toDate(Number(res[i].borrowEnd))
        var borrowDesc = res[i].isReturn == 3 ? '借出' : '完成'
        res[i].bookStatus = borrowDesc
      }
      that.setData({
        borrow_list_user: res
      })
      var datas = { "useUserId": app.globalData.userId }
      app.func.requestGet('borrowBook/uselist', datas, function (ress) {
        for (var i = 0; i < ress.length; i++) {
          var imageType = app.define.imageType(ress[i].tails.bookInfo.bookImg)
          ress[i].borrowStart = app.define.toDate(Number(ress[i].borrowStart) / 1000)
          ress[i].borrowEnd = app.define.toDate(Number(ress[i].borrowEnd))
          ress[i].tails.bookInfo.imageType = imageType
          ress[i].tails.bookInfo.detailHref = ''
          var borrowDesc = ress[i].state == 2 ? '待还' : '完成'
          ress[i].bookStatus = borrowDesc
        }
        that.setData({
          borrow_list_other: ress
        })
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

  }
})