// pages/home/mine/mine.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHaveOrder: false,
    showText: "须完成微信授权才能继续使用",
    showText1: "请删除后重新授权",
    userInfo: null,
    book_list:null,
    borrow_list:null,
    give_list:null,
    attention_list:null,
    fans_list:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowsHeigth: res.windowHeight
        })
        // success
      }
    })
    if (app.globalData.userId == '') {
      that.requestUserBind()
    }else{
      that.getUserInfo()
    }
    that.requestMyBooks()
    that.requestBorrow()
    that.requestGive()
    that.requestDataAttention()
    that.requestDataFances()
  },

  getUserInfo: function () {
    var that = this
    var data = { 'id': app.globalData.userId}
    app.func.requestGet('user/detail', data, function (res) {
      console.log(res)
      wx.setStorageSync(app.globalData.saveServerUserInfo, res)
      that.setData({
        isHaveOrder: false,
        userInfo: res 
      })
    })
  },

  requestUserBind: function () {
    var that = this
    var data = {'service': 'weixin', 'openid': app.globalData.openid}
    app.func.requestPost('user/checkOauthUser', data, function (res) {
      console.log(res)
      if (res.id != null) {
        app.globalData.userId = res.tails.userInfo.userId
      }else{
        if (app.globalData.userId == '') {
          wx.navigateTo({
            url: '../bind_user/bind_user',
          })
        }
      }
    })
  },

  change_user_info: function () {
    wx.navigateTo({
      url: '../user_info/change_userinfo',
    })
  },

  my_books: function (){
    wx.navigateTo({
      url: '../my_books/my_books',
    })
  },

  my_borrow: function (){
    wx.navigateTo({
      url: '../my_borrow/my_borrow',
    })
  },

  my_gives: function (){
    wx.navigateTo({
      url: '../my_gives/my_gives',
    })
  },

  my_attention: function(){
    wx.navigateTo({
      url: '../user_attention/user_attention',
    })
  },

  my_fans: function (){
    wx.navigateTo({
      url: '../user_fans/user_fans',
    })
  },



  requestMyBooks: function () {
    var that = this
    var data = { 'userId': app.globalData.userId, 'useUserId': app.globalData.userId }
    app.func.requestGet('wishBook/list', data, function (res) {
      console.log(res)
      that.setData({
        book_list: res.books.length
      })
    })
  },

  requestBorrow: function () {
    var that = this
    var numberCount = 0
    var data = { "userId": app.globalData.userId }
    app.func.requestGet('borrowBook/list', data, function (res) {
      numberCount = res.length
      var datas = { "useUserId": app.globalData.userId }
      app.func.requestGet('borrowBook/uselist', datas, function (ress) {
        that.setData({
          borrow_list: numberCount + ress.length
        })
      })
    })
  },

  requestGive: function () {
    var that = this
    var numberCount = 0
    var data = { "userId": app.globalData.userId }
    app.func.requestGet('giveBook/giveList', data, function (res) {
      numberCount = res.length
      var datas = { "useUserId": app.globalData.userId }
      app.func.requestGet('/giveBook/acceptlist', datas, function (ress) {
        
        that.setData({
          give_list: ress.length + numberCount
        })
      })
    })
  },

  requestDataAttention: function () {
    var that = this
    var data = {
      "userId": app.globalData.userId,
      "attentionType": "2"
    }
    app.func.requestGet('attention/getMyAttention', data, function (res) {
      that.setData({
        attention_list: res.length
      })
    })
  },
  requestDataFances: function () {
    var that = this
    var data = {
      "objectId": app.globalData.userId,
      "attentionType": "2"
    }
    app.func.requestGet('attention/getAttentionMyInfo', data, function (res) {
      that.setData({
        fans_list: res.length
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