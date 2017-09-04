//app.js
var http = require('gloable/service/http.js');
var define = require('gloable/define/define.js');

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        that.globalData.windowWidth = res.windowWidth
        that.globalData.windowHeight = res.windowHeight
      }
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            withCredentials: false,
            success: function (res) {
              wx.setStorageSync(that.globalData.saveUserInfo, res.userInfo)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
      
    }
  },

  globalData: {
    userInfo: null,
    saveUserInfo:"saveUserInfo",
    // userId: "4aeedfa860994ce9aee0febd89d5d005",
    userId: "5a4c0b330ec14fb081ce03f3929cba16",
    windowWidth: 0,
    windowHeight: 0
  },

  func: {
    requestPost: http.requestPost,
    requestUpload: http.requestUpload,
    requestGet: http.requestGet,
    requestPut: http.requestPut,
    requestDelete: http.requestDelete,
    requestSessionIDGet: http.requestSessionIDGet
  },

  define: {
    imageType: define.imageUrlType,
    toDate: define.toDate,
  }
})
