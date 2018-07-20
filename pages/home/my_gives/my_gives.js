// pages/home/my_gives/my_gives.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    give_list_user:[],
    give_list_other:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.requestGive()
  },

  requestGive: function () {
    var that = this
    var data = { "userId": app.globalData.userId }
    app.func.requestGet('giveBook/giveList', data, function (res) {
      for (var i = 0; i < res.length; i++) {
        var imageType = app.define.imageType(res[i].tails.bookInfo.bookImg)
        res[i].tails.bookInfo.imageType = imageType
        res[i].tails.bookInfo.detailHref = ''
        res[i].giveStart = app.define.toDate(Number(res[i].giveStart) / 1000)
        var giveDesc = '赠送'
        res[i].bookStatus = giveDesc
      }
      that.setData({
        give_list_user: res
      })
      var datas = { "useUserId": app.globalData.userId }
      app.func.requestGet('/giveBook/acceptlist', datas, function (ress) {
        for (var i = 0; i < ress.length; i++) {
          var imageType = app.define.imageType(ress[i].tails.bookInfo.bookImg)
          ress[i].giveStart = app.define.toDate(Number(ress[i].giveStart) / 1000)
          ress[i].tails.bookInfo.imageType = imageType
          ress[i].tails.bookInfo.detailHref = ''
          var giveDesc = '领受'
          ress[i].bookStatus = giveDesc
        }
        that.setData({
          give_list_other: ress
        })
      })
    })
  },

  give_list_tap:function (res){
    var that = this
    var data = JSON.stringify(that.data.give_list_user[res.currentTarget.dataset.index].tails.bookInfo)
    wx.navigateTo({
      url: '../book_desc/book_desc?topbook=' + data,
    })
  },
  give_list_tap_ohter: function (res) {
    var that = this
    var data = JSON.stringify(that.data.give_list_other[res.currentTarget.dataset.index].tails.bookInfo)
    wx.navigateTo({
      url: '../book_desc/book_desc?topbook=' + data,
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