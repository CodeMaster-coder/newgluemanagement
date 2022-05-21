// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gluecode:0
  },
  employeeId:function(e){this.setData({gluecode:e.detail.value})},
  navibtn(){
    console.log(this.data.gluecode.length)
    if(this.data.gluecode.length == 12){
      wx.navigateTo({
        url: '/pages/history/history?gluecode=' + this.data.gluecode,
      })
    }else{
      wx.showToast({
        title: '胶水编号错误！',
        icon:'error'
      })
    }
  },
  scancode(){
    wx.scanCode({
      success(res){
        console.log(res.result)
        if(res.result.length == 12){
          wx.navigateTo({
            url: '/pages/history/history?gluecode=' + res.result,
          })
        }else{
          wx.showToast({
            title: '胶水编号错误！',
            icon:'error'
          })
        }
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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