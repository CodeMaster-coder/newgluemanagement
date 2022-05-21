// app.js
const app = getApp()
var util = require("/utils/util.js")
App({

  onLaunch() {
    let userinfo = util.get('userinfo')
    console.log(userinfo)

    
    if (userinfo != null){
      if(userinfo[0].authority != 'false'){
        wx.navigateTo({
        url: '/pages/mainpage/mainpage',
      })}

    }
    else{
      wx.login({
        success: function(res){
        let code = res.code;
        console.log(code)
        if(code != ''){
          wx.request({
            url: 'https://www.liuke.xyz/glue/login',
            method: 'POST',
            header:{'content-type': 'application/x-www-form-urlencoded'},
            data:{
              code: code,
              demo: 'login'
            },        
            success: function(res){
              let backUserInfo = res.data;
              let userinfo = backUserInfo[0];
              if(backUserInfo  != '' ){
                if(userinfo.authority!= 'false'){
               util.put('userinfo', backUserInfo,604800)
                wx.removeStorage({key: 'registerUserInfo'})
                wx.navigateTo({
                  url: '/pages/mainpage/mainpage',
                }) }
              }
              else{
                wx.navigateTo({
                  url: '/pages/authority1/authority1',
                })
              }
            }
          })
        }
      }
          
      })


    }
  },
  globalData: {
    product:[],
    gun:[]
  }
})
