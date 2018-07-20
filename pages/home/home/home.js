// pages/home/home/home.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_list:null,
    winWidth:0,
    winHeight:0,
    searchText: "",
    inputValue: "",
    isInPut: false,  
    search_list:null, 
    current_page: 1,
    hasMore: false,
    hasRefesh: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.screenWidth,
          winHeight: res.screenHeight
        })
      },
    })

    this.requestMyBooks()
  },

  requestData: function (){
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var data = { 'type': '1','pagesize':'10'}
    app.func.requestGet('recommendBook/list', data, function (res) {
      console.log(res)
      for (var i = 0; i < res.length; i++) {
        var imageType = app.define.imageType(res[i].tails.bookInfo.bookImg)
        res[i].tails.bookInfo.imageType = imageType
        res[i].tails.bookInfo.detailHref = ''
      }
      that.setData({
        book_list: res
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 500)
    })
  },

  loadMore: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
    });
    var that = this;
    that.setData({
      hasMore: true,
      current_page: that.data.current_page + 1
    });
    that.requestSearchData(that.data.inputValue, that.data.current_page)
  },
  refesh: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
      current_page: 1
    });
    // that.requestMyBooks()
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value,
    })
    this.requestSearchData(this.data.inputValue, this.data.current_page)
  },

  cancelTap: function (e) {
    this.setData({
      isInPut: false,
      searchBarWidth: this.data.winWidth - 16,
      searchText: ""
    })
  },

  inputFocus: function (e) {
    this.setData({
      searchHistory: wx.getStorageSync('searchHistoryTicket')
    })
    this.setData({
      isInPut: true,
      searchBarWidth: this.data.winWidth - 75
    })
  },

  requestSearchData: function (data, curPage) {
    var that = this
    that.setData({
      searchText: data
    })
    let searchData = { "type": 2, "curPage": curPage, searchKey:data}
    var url = "common/search"
    app.func.requestGet(url, searchData, function (res) {
      console.log(res)
      if (res.code == '-11') {
        return 
      }
      for (var i = 0; i < res.books.length; i++) {
        var imageType = app.define.imageType(res.books[i].bookImg)
        res.books[i].imageType = imageType
        res.books[i].detailHref = ''
        if (curPage != 1) {
          that.data.search_list.push(res.books[i])
        }
      }
      
      if (curPage != 1) {
        that.setData({
          search_list: that.data.search_list,
          hasMore: res.books.length == 10 ? true : false
        })
      }else{
        that.setData({
          search_list: res.books,
          hasMore: res.books.length == 10 ? true : false
        })
      }
      
      console.log("res")
    });
  },

  /**
   * 扫一扫点击
   */
  scan_tap: function () {
    // wx.navigateTo({
    //   url: '../book_desc/book_desc?isbn=9787508680231',
    // })
    
    var that = this
    wx.scanCode({
      'onlyFromCamera': true,
      success: (res) => {
        that.scanResultGender(res)
        console.log(res)
      },
    })
  },

  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    page = 1;
    this.setData({
      list: [],
      scrollTop: 0
    });
    GetList(this)
  },
  onPullDownRefresh: function () {
    console.log("下拉")
  },
  onReachBottom: function () {
    console.log("上拉");
    var that = this
    that.setData({
      isHaveData:true
    })
    that.requestSearchData(that.data.searchText, that.datacurrent_page)
  },

  requestUserBind: function () {
    var that = this
    var data = { 'service': 'weixin', 'aopenid': app.globalData.openid }
    app.func.requestPost('user/checkOauthUser', data, function (res) {
      console.log(res)
      if (res.id != null) {
        app.globalData.userId = res.tails.userInfo.userId
        wx.scanCode({
          'onlyFromCamera': true,
          success: (res) => {
            that.scanResultGender(res)
            console.log(res)
          },
        })
      } else {
        wx.navigateTo({
          url: '../bind_user/bind_user',
        })
      }
    })
  },

  scanResultGender: function(data) {
    var that = this
    switch (data.scanType) {
      case 'EAN_13':
        wx.navigateTo({
          url: '../book_desc/book_desc?isbn=' + data.result,
        })
        break;
      case 'QR_CODE':
        var data = JSON.parse(data.result)
        data.useUserId = app.globalData.userId
        if (data.giveEnd != null) {
          that.requestGiveEnd(data)
        }else if (data.borrowEnd == null) {
          that.requestBorrowReturn(data)
        }else{
          that.requestBorrowBook(data)
        }
        break;
      default:
        break;
    }
  },


  requestMyBooks: function () {
    var that = this
    var data = { 'userId': app.globalData.userId, 'useUserId': app.globalData.userId }
    console.log(data)
    app.func.requestGet('wishBook/list', data, function (res) {
      console.log(res)
      for (var i = 0; i < res.books.length; i++) {
        var imageType = app.define.imageType(res.books[i].tails.bookInfo.bookImg)
        res.books[i].tails.bookInfo.imageType = imageType
        res.books[i].tails.bookInfo.detailHref = ''
        var borrowDesc = res.books[i].borrowState == 1 ? '拥有' : res.books[i].borrowState == 2 ? '借出' : res.books[i].borrowState == 3 ? '待还' : '完成'
        res.books[i].tails.bookInfo.borrowDesc = borrowDesc
      }
      that.setData({
        book_list: res.books
      })
    })
  },

  book_list_tap: function (res) {
    var that = this
    var data = JSON.stringify(that.data.book_list[res.currentTarget.dataset.index].tails.bookInfo)
    wx.navigateTo({
      url: '../book_desc/book_desc?topbook=' + data,
    })

    // var that = this
    // var data = that.data.book_list[res.currentTarget.dataset.index]
    // wx.navigateTo({
    //   url: '../book_user/book_user?book_id=' + data.bookId,
    // })
  },

  search_book_list_tap: function (res) {
    var that = this
    var data = that.data.search_list[res.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../book_user/book_user?book_id=' + data.id,
    })
  },

  requestGiveEnd: function (data) {
    console.log('赠送')
    var testData = data
    testData.userId = data.userUserId
    testData.userUserId = data.userId
    app.func.requestPost('giveBook/acceptAdd', testData, function (res) {
      console.log(res)
      wx.showModal({
        title: res.message,
        confirmColor: "#594CA8",
        confirmText: "知道了",
        success: function (res) {
          console.log('用户点击确定')
        }
      })
    })
  },

  requestBorrowReturn: function (data) {
    console.log('还书')
    app.func.requestPost('borrowBook/returnAdd', data, function (res) {
      wx.showModal({
        title: res.message,
        confirmColor: "#594CA8",
        confirmText: "知道了",
        success: function (res) {
          console.log('用户点击确定')
        }
      })
    })
  },

  requestBorrowBook: function (data) {
    console.log('借书')
    app.func.requestPost('borrowBook/borrowAdd', data, function (res) {
      wx.showModal({
        title: res.message,
        confirmColor: "#594CA8",
        confirmText: "知道了",
        success: function (res) {
          console.log('用户点击确定')
        }
      })
    })
  },

  /**
     * 登录接口 ，，，，先固定死
     */
  // requestLogin: function () {
  //   app.func.requst
  // },

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
    return {
      title: '微借书小程序',
      path: 'pages/home/home/home?userId=' + app.globalData.userId + 'useUserId'+ app.globalData.userId,
      success: function (res) {
  
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  }
})