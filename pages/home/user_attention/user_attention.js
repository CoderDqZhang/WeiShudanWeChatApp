// pages/home/user_attention/user_attention.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    attention_list:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.requestData()

  },


  requestData: function (){
    var that = this
    var data = {
      "userId": app.globalData.userId,
      "attentionType": "2"
    }
    app.func.requestGet('attention/getMyAttention', data, function (res) {
      console.log(res)
      that.setData({
        attention_list:res
      })
    })
  },

  user_info_tap: function (res) {
    var that = this
    var data = that.data.attention_list[res.currentTarget.dataset.index]
    var jsonData = JSON.stringify(data)
    wx.navigateTo({
      url: '../otherbooks/otherbooks?user_info=' + jsonData,
    })
  },

  cancel_attention_tap: function (res){
    var that = this
    var objectUser = that.data.attention_list[res.currentTarget.dataset.index]
    var data =
      {
        "attentionAtion": "cancel",
        "objectId": objectUser.id,
        "userId": app.globalData.userId,
        "attentionType": 2
      }
    app.func.requestPost('attention/update', data, function (res) {
      that.requestData()
      wx.showToast({
        title: res.message,
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