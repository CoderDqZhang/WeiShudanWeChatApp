// pages/home/login/login.js
var app = getApp()
function countdown(that) {
  var second
  if ('发送验证码' == that.data.second) {
    that.data.second = 60
    that.setData({
      second: 60
    })
    second = 60
  } else {
    second = that.data.second
  }

  if (second == 0) {
    that.setData({
      second: "重新获取"
    });
    return;
  }
  var time = setTimeout(function () {
    if ('发送验证码' == second || second == "重新获取") {
      that.data.second = 60
      that.setData({
        second: 60
      })
    }
    that.setData({
      second: parseInt(that.data.second - 1)
    });
    countdown(that);
  }
    , 1000)
}
Page({
  data: {
    phone: "",
    second: '发送验证码'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  senderCode: function () {
    var that = this;
    var data = {
      "phone": this.data.phone,
    }
    app.func.requestGet('sms/sendSms', data, function (res) {
      if (res.errors != null) {
        wx.showModal({
          title: res.errors[0].error[0].toString(),
          showCancel: false,
          confirmText: "知道了",
          confirmColor: "#594CA8",
          success: function (res) {
            if (res.confirm) {

            }
          }
        })
        return
      }
      if ('发送验证码' == that.data.second) {
        countdown(that);
      } else {
        that.setData({
          second: 60
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this
    console.log(e.detail.value.phone.toString())
    console.log(e.detail.value.code.toString())
    var data = {
      'mobile': e.detail.value.phone.toString(),
      'code': e.detail.value.code.toString(),
      'username': app.globalData.userInfo.username,
      'password':'',
      'headimage':'',
      'openid': app.globalData.openid,
      'service':'weixin',
      'oauthParams':''
    }

    app.func.requestPost('user/registerOauthUser', data, function (res) {
      
      if (res.code < 0) {
        wx.showModal({
          title: res.message,
          showCancel: false,
          confirmText: "知道了",
          confirmColor: "#594CA8",
          success: function (res) {
            if (res.confirm) {

            }
          }
        })
        return
      }
      app.globalData.userId = res.id
      var userInfo = wx.getStorageSync('userInfo')
      wx.setStorageSync('userInfo', userInfo)
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    })
  },
})