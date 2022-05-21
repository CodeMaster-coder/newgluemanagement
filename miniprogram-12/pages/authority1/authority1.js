// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',
    employeeName:'',
    employeeId:'',
    logonUserInfo:'',
    select:false,
    userArea:'请选择工段',
    areas: [
    '2.1侧围','2.1底板主线','2.1底板分拼','2.1总拼','2.1门盖','2.2门盖', '2.2侧围','2.2底板主线','2.2底板分拼','2.2总拼',
     ],
     font_color: '#808080',
     infoimage:'',
     nickName:''
  },
  employeeName:function(e){this.setData({employeeName:e.detail.value})},
  employeeId:function(e){this.setData({employeeId:e.detail.value})},
  userArea:function(e){this.setData({userArea:e.detail.value})},
  bindShowMsg() {
    this.setData({
     select: !this.data.select
    })
   },
   mySelect(e) {
    console.log(e)
    var name = e.currentTarget.dataset.name
    // console.log(name)
    this.setData({
      userArea: name,
     select: false,
     font_color: 'black'
    })

   },
login(){
  let that = this,
  employeeName = that.data.employeeName,
  employeeId = that.data.employeeId,
  userArea = that.data.userArea;
if(employeeName != '' & employeeId!='' & userArea != '') {
          wx.getUserProfile({
            desc:'用于完善客户信息',
            success: function(res){
              let user = res.userInfo;
              // let encryptedData = res.encryptedData;
              // let iv = res.iv;
              wx.login({
                success: function(res){
                  let code = res.code           
                    that.setData({
                      code: code
                    })

              if(employeeName != '' & employeeId!='' & userArea != '' & code != ''){
                wx.request({
                  url: 'https://www.liuke.xyz/glue/login',
                  method:'POST',
                  header:{'content-type': 'application/x-www-form-urlencoded'},
                  data:{
                    code: code,
                    demo:'register',
                    // encryptedData: encryptedData,
                    // iv: iv,
                    employeeName: employeeName,
                    employeeId: employeeId,
                    userArea: userArea
                  },
                  success: function(res){
                    if(res.data.status == true){
                      wx.showToast({
                        title: '注册信息已提交，请等待审核',
                        icon: 'none',
                        duration: 1000
                      })
                      wx.setStorageSync('registerUserInfo', user)
                      let logonUserInfo = wx.getStorageSync('registerUserInfo')
                      if(logonUserInfo){
                        that.setData({
                          logonUserInfo: logonUserInfo,
                          infoimage:logonUserInfo.avatarUrl,
                          nickName:logonUserInfo.nickName
                        })
                        // console.log(that.data.logonUserInfo.avatarUrl)
                      }
                    }
                    else{
                      wx.showToast({
                        title: '未注册成功，请重试',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }}})
            }
              
            
          })

 







    }
else{
  wx.showToast({
    title: '数据不能为空，请完善个人注册信息',
    icon: 'none',
    duration: 1000
  })
}
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let logonUserInfo = wx.getStorageSync('registerUserInfo')
    if(logonUserInfo){
      wx.showToast({
        title: '请耐心等待审核通过',
        icon: 'none', 
        duration: 2000
      })
    }
    this.setData({
      logonUserInfo: logonUserInfo,
      infoimage:logonUserInfo.avatarUrl,
      nickName:logonUserInfo.nickName
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