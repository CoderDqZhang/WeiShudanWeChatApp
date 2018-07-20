// pages/home/user_info/change_userinfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userInfo: wx.getStorageSync(app.globalData.saveServerUserInfo)
    })
    console.log(that.data.userInfo)
  },

  formSubmit: function (e) {
    var that = this
    var formValue = e.detail.value
    var data = {
      'id': app.globalData.userId,
      'mobile': formValue.phone,
      'qq': formValue.qq,
      'weixin': formValue.weChat,
      'qrCode':''
    }
    app.func.requestPost('user/edit', data, function (res) {
      wx.setStorageSync(app.globalData.saveServerUserInfo, res)
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      })
      wx.navigateBack({
        
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