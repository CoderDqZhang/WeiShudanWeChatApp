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
    var user = this.getUserInfo()
    wx.getSystemInfo({
      success: function (res) {
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
          that.loginWidthCode(res.code)
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              wx.setStorageSync(that.globalData.saveUserInfo, res.userInfo)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        },
        fail:function (res){
          console.log(res)
        }
      })
      
    }
  },

  loginWidthCode: function (code) {
    var that = this
    var data = {'code':code}
    that.func.requestLogin('user/wxLogin', data, function (res) {
      console.log(res)
      if (res.id != null) {
        that.globalData.userId = res.id
        var pages = getCurrentPages();
        console.log(pages)
        var home = pages[0]
        console.log(home)
        home.requestMyBooks()
        var ss = res.tails.wxSessionVo
        that.globalData.openid = res.tails.wxSessionVo.openid
      }else{
        that.globalData.openid = res.data.openid
      }
    })
  },

  globalData: {
    userInfo: null,
    saveUserInfo:"saveUserInfo",
    saveServerUserInfo: "saveServerUserInfo",
    // userId: "4aeedfa860994ce9aee0febd89d5d005",
    isbindUser: '',
    openid:'',
    userId: '',
    windowWidth: 0,
    windowHeight: 0
  },

  func: {
    requestPost: http.requestPost,
    requestUpload: http.requestUpload,
    requestGet: http.requestGet,
    requestPut: http.requestPut,
    requestLogin: http.requestLogin,
    requestDelete: http.requestDelete,
    requestSessionIDGet: http.requestSessionIDGet
  },

  define: {
    imageType: define.imageUrlType,
    toDate: define.toDate,
  }
})
