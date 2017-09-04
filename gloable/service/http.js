var rootDocment = 'https://api.topveda.cn/';//你的域名  
// var rootDocment = 'https://api.liangpiao.me/'

var app = getApp()

function requestPut(url, data, cb) {
  if (getApp().globalData.userInfo != null) {
    wx.request({
      url: rootDocment + url,
      data: data,
      method: 'put',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      },
    })
  }else{
    wx.showModal({
      title: "请允许获取用户信息",
      confirmColor: "#594CA8",
      confirmText: "知道了",
      success: function (res) {
        console.log('用户点击确定')
      }
    })
    return typeof cb == "function" && cb(false)
  }
  // wx.getStorage({
  //   key: getApp().globalData.saveUserInfo,
  //   success: function (res) {
      
  //   },
  //   fail: function () {
  //     if (res.message != null) {
  //       wx.showModal({
  //         title: "请允许获取用户信息",
  //         confirmColor: "#4bd4c5",
  //         confirmText: "知道了",
  //         success: function (res) {
  //           console.log('用户点击确定')
  //         }
  //       })
  //     }
  //     return typeof cb == "function" && cb(false)
  //   }
  // })
}

function requestDelete(url, data, cb) {
  console.log("请求delete")
  wx.getStorage({
    key: getApp().globalData.saveUserInfo,
    success: function (res) {
      wx.request({
        url: rootDocment + url,
        data: data,
        method: 'delete',
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          return typeof cb == "function" && cb(res.data)
        },
        fail: function () {
          return typeof cb == "function" && cb(false)
        },
      })
    },
    fail: function () {
      if (res.message != null) {
        wx.showModal({
          title: "请允许获取用户信息",
          confirmColor: "#594CA8",
          confirmText: "知道了",
          success: function (res) {
            console.log('用户点击确定')
          }
        })
      }
      return typeof cb == "function" && cb(false)
    }
  })
}

function requestPost(url, data, cb) {
  if (getApp().globalData.userInfo != null) {
    wx.request({
      url: rootDocment + url,
      data: data,
      method: 'post',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      },
    })
  } else {
    wx.showModal({
      title: "请允许获取用户信息",
      confirmColor: "#594CA8",
      confirmText: "知道了",
      success: function (res) {
        console.log('用户点击确定')
      }
    })
    return typeof cb == "function" && cb(false)
  }
}

function requestGet(url, data, cb) {
  if (getApp().globalData.userInfo != null) {
    wx.request({
      url: rootDocment + url,
      data: data,
      method: 'get',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        return typeof cb == "function" && cb(false)
      },
    })
  } else {
    wx.showModal({
      title: "请允许获取用户信息",
      confirmColor: "#594CA8",
      confirmText: "知道了",
      success: function (res) {
        console.log('用户点击确定')
      }
    })
    return typeof cb == "function" && cb(false)
  }
}

function requestUpload(url, data, filePath, name, cb){
  console.log("请求Upload")
  wx.getStorage({
    key: getApp().globalData.saveUserInfo,
    success: function (res) {
      wx.uploadFile({
        url: rootDocment + url,
        filePath: filePath,
        name:name,
        formData: data,
        method: 'post',
        header: {
          "content-type": "application/json",
          "cache-control": "no-cache",
          'Authorization': res.data.data.lp_session_id
        },
        success: function (res) {
          return typeof cb == "function" && cb(res.data)
        },
        fail: function () {
          
          return typeof cb == "function" && cb(false)
        },
      })
    },
    fail: function () {
      if (res.message != null) {
        wx.showModal({
          title: "请允许获取用户信息",
          confirmColor: "#594CA8",
          confirmText: "知道了",
          success: function (res) {
            console.log('用户点击确定')
          }
        })
      }
      return typeof cb == "function" && cb(false)
    }
  })
}

function requestSessionIDGet(url, data,lp_session_id, cb){
  wx.request({
    url: rootDocment + url,
    data: data,
    header: {
      'content-type': 'application/json',
      'Authorization': lp_session_id
    },
    method: 'get',
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    },

  })
}



module.exports.requestPost = requestPost
module.exports.requestGet = requestGet
module.exports.requestDelete = requestDelete
module.exports.requestPut = requestPut
module.exports.requestUpload = requestUpload
module.exports.requestSessionIDGet = requestSessionIDGet