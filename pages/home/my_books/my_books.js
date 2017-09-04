// pages/home/my_books/my_books.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_list:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestMyBooks()
  },


  requestMyBooks: function () {
    var that = this
    var data = { 'userId': app.globalData.userId,'useUserId': app.globalData.userId}
    app.func.requestGet('wishBook/list', data, function (res){
      console.log(res)
      for (var i = 0; i < res.books.length; i ++) {
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

  book_list_tap: function (res){
    var that = this
    var data = JSON.stringify(that.data.book_list.books[res.currentTarget.dataset.index])
    wx.navigateTo({
      url: '../book_desc/book_desc?mybook=' + data,
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