// pages/authentication/authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  user:[]
  },
  middleauth(e){
    console.log(e.currentTarget.dataset.index  )
    let id = e.currentTarget.dataset.index;
    let that = this;
    let user = that.data.user;
    let user_id = user[id];
    let userid = user_id.id
    // console.log(userid)
    wx.showModal({
      title:'授权确认框',
      content:'确定授予' + user[id].employeeName + '中级权限？',
      success:function(res){
        if(res.confirm){
      wx.request({
        url: 'https://www.liuke.xyz/glue/login',
        data:{
          code:'auth',
          authority:2,
          id:userid
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          var user= that.data.user;
         user.splice(id, 1);
          if(res.data.status = true){
            wx.showToast({
              title: '中级权限审批成功',
              icon: 'none',
              duration: 2000
            })
          that.setData({
            user:user
          })
          }else{
            wx.showToast({
              title: '系统异常',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })}
      else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
    })
 
  },
  lowauth(e){
    console.log(e.currentTarget.dataset.index  )
    let id = e.currentTarget.dataset.index;
    let that = this;
    let user = that.data.user;
    let user_id = user[id];
    let userid = user_id.id
    // console.log(userid)
    wx.showModal({
      title:'授权确认框',
      content:'确定授予' + user[id].employeeName + '低级权限？',
      success:function(res){
        if(res.confirm){
          var user= that.data.user;
          user.splice(id, 1);
    wx.request({
      url: 'https://www.liuke.xyz/glue/login',
      data:{
        code:'auth',
        authority:1,
        id:userid
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.data.status = true){
          wx.showToast({
            title: '低级权限审批成功',
            icon: 'none',
            duration: 2000
          })
        that.setData({
          user:user
        })
        }else{
          wx.showToast({
            title: '系统异常',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })}}})
  },
  noneauth(e){
    console.log(e.currentTarget.dataset.index  )
    let id = e.currentTarget.dataset.index;
    let that = this;
    let user = that.data.user;
    let user_id = user[id];
    let userid = user_id.id
    // console.log(userid)
    wx.showModal({
      title:'授权确认框',
      content:'确定不授予' + user[id].employeeName + '任何权限？',
      success:function(res){
        if(res.confirm){
          var user= that.data.user;
          user.splice(id, 1);
    wx.request({
      url: 'https://www.liuke.xyz/glue/login',
      data:{
        code:'auth',
        authority:0,
        id:userid
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.data.status = true){
          wx.showToast({
            title: '不予通过权限审批成功',
            icon: 'none',
            duration: 2000
          })
        that.setData({
          user:user
        })
        }
        else{
          wx.showToast({
            title: '系统异常',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })}}})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let user = [];
    wx.request({
      url: 'https://www.liuke.xyz/glue/login',
      data:{
        code:'userinfo'
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        let obj = JSON.parse(res.data)
        console.log(obj.length)
        if(obj.length == 0){
          wx.showToast({
            title: '没有等待审批权限的注册人员',
            icon: 'none',
            duration: 2000
          })
        }else{
        for(var i=0;i<obj.length;i++){
          var obj1 = obj[i];
          user.push(obj1);
          that.setData({
            user:user
          })
          console.log(user)
        }}
        // if(res.data.status = true){
        //   that.setData({
        //     user:res.data[0]
        //   })
        // }
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