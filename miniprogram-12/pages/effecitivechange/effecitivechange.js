// pages/effecitivechange/effecitivechange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    effectiveDate:'',
    glucode:''
  },
  bindDateChange2: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      effectiveDate: e.detail.value
    })
  },
  changebtn(){
    let that = this
    wx.showModal({
      title:'有效期更改确认框',
      content:'确定更改' + this.data.glucode + '有效期？',
      success(res){
        if(res.confirm){
          wx.request({
            url: 'https://www.liuke.xyz/gluelog/login',
            data:{
              id:that.data.id,
              effectiveDate:that.data.effectiveDate,
              code:'effectivechange',
            },
            method:'POST',
            header:{'content-type': 'application/x-www-form-urlencoded'},
           
            success: function(res){
              console.log(res.data)
              if(res.data.status == true){
                wx.showToast({
                  title: '日期更改成功！',
                  icon:'success'
                })
                setTimeout(
                  function(){ //注意function这里不能缺少
                    wx.navigateTo({
                      url: '/pages/overdue/overdue',
                    })
                  },1500)
               
              }
              else{
                wx.showToast({
                  title: '日期更改失败！',
                  icon:'error'
                })
              }
          }})
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.scanCode({
      success(res){
        console.log(res.result)
        let glucode = res.result
        wx.request({
          url: 'https://www.liuke.xyz/gluelog/login',
          method:'POST',
          header:{'content-type': 'application/x-www-form-urlencoded'},
          data:{
            gluecode: glucode,
            code:'searcheGluecode',
          },
          success: function(res){
            console.log(res.data)
            if(res.data.length == 0){
              wx.showToast({
                title: '胶水尚未入库！',
                icon:'error'
              })
              setTimeout(
                function(){ //注意function这里不能缺少
                  wx.navigateTo({
                    url: '/pages/mainpage/mainpage',
                  })
                },1500)
             
            }
            else{
              that.setData({
                id:res.data[0].id, 
                gluecode:res.data[0].gluecode,  
                effectiveDate:res.data[0].effectiveDate, 
              })
            }
        }})
      }
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