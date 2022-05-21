// pages/history/history.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'', 
    gluecode:'', 
    model:'', 
    productDate:'', 
    effectiveDate:'', 
    voucher:'', 
    inventoryDate:'',
    lingyongbanci:'',
    userSection:'',
    collectDate:'',
    collectNum:'',
    collectPerson:'',
    exchangebanci:'',
    exchangeSection:'',
    exchangeArea:'',
    exchangeRobot:'',
    exchangeNum:'',
    exchangePerson:'',
    exchangeDate:'',
    recoverbanci:'',
    recoverWeight:'',
    recoverPerson:'',
    recoverDate:'',
    click: false,
    click1: false,
    click2: false,
    click3: false,
    lingyongshow:true,
    exchangeshow:true,
    banci:['A','B'],
    area:['2.1总拼','2.1门盖','2.1底板主线','2.1底板分拼','2.2总拼','2.2门盖','2.1侧围','2.2侧围',
    '2.2底板主线','2.2底板分拼'],
    subarea:[],
    robots:[]
  },
  //领用
  bancioptions(){
    let that = this;
    that.setData({
      click: !this.data.click,
    });   
    
  },
  cselectedone(e){
    var name = e.currentTarget.dataset.name;
    var that = this;
    if(that.data.lingyongbanci == name){
      this.setData({
        lingyongbanci: name,
        // select: false,
       
       })
    }else{
    this.setData({
     lingyongbanci: name,
    //  select: false,
    
    // buttonshow:true,
    })}
  },
  areaoptions(){
    let that = this;
    that.setData({
      click1: !this.data.click1,
    });   
    
  },
  cselectedtwo(e){
    var name = e.currentTarget.dataset.name;
    var that = this;
    if(that.data.userSection == name){
      this.setData({
        userSection: name,
        // select: false,
       
       })
    }else{
    this.setData({
      userSection: name,
    //  select: false,
    
    // buttonshow:true,
    })}
  },
  collectGlue(){
    let that = this
    let userinfo = util.get('userinfo')
    let collectPerson = userinfo[0].employeeName
    console.log(collectPerson)
    let lingyongbanci = this.data.lingyongbanci
    let userSection = this.data.userSection
    if(lingyongbanci != null & userSection != null){
      wx.request({
        url: 'https://www.liuke.xyz/gluelog/login',
        data:{
          code:'collect',
          id:this.data.id,
          collectPerson:collectPerson,
          lingyongbanci:lingyongbanci,
          userSection:userSection
        },
          method:'POST',
          header:{'content-type': 'application/x-www-form-urlencoded'},
          success:function(res){
            console.log(res.data);
            if (res.data.status == true){
              wx.showToast({
                title: '提交成功！！！',
                icon: 'none',
                duration: 2000
              })
              that.setData({
                lingyongshow:false,
              })
            }else{
              wx.showToast({
                title: '提交失败！！！',
                icon: 'none',
                duration: 2000
              })
            }
          }
      })
      console.log(lingyongbanci)
    }else{
      wx.showToast({
        title: '领用信息不全',
        icon:'error'
      })
    }
  },
  //更换
  bancioptions(){
    let that = this;
    that.setData({
      click: !this.data.click,
    });   
    
  },
  selectedone(e){
    var name = e.currentTarget.dataset.name;
    var that = this;
    if(that.data.exchangebanci == name){
      this.setData({
        exchangebanci: name,
        // select: false,
       
       })
    }else{
    this.setData({
      exchangebanci: name,
    //  select: false,
    
    // buttonshow:true,
    })}
  },
  areaoptions(){
    let that = this;
    that.setData({
      click1: !this.data.click1,
    });   
    
  },
  selectedtwo(e){
    var name = e.currentTarget.dataset.name;
    var that = this;
    if(that.data.exchangeSection == name){
      this.setData({
        exchangeSection: name,
        // select: false,
       
       })
    }else{
    this.setData({
      exchangeSection: name,
    //  select: false,
    
    // buttonshow:true,
    })}
  },
  subareaoptions(){
    let that = this;
    that.setData({
      subarea:[],
      robots:[]
    })
    console.log(that.data.exchangeSection)
    if(that.data.exchangeSection != null){
      wx.request({
        url: 'https://www.liuke.xyz/gluelog/login',
        data:{
          code:"subarea",
          exchangeSection:that.data.exchangeSection
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          var obj1 = res.data[0];
          
          let obj = JSON.parse(obj1)
          for(var i=0;i<obj.length;i++)
          {var subarea1 = obj[i],
            subarea = that.data.subarea;
            subarea.push(subarea1);
            that.setData({
              subarea:that.data.subarea 
            })}
            console.log(that.data.subarea )
            that.setData({
              click2: !that.data.click2,
            });  
          }  
      })
    }else{
      wx.showToast({
        title: '请先选择工段！',
        icon:'error'
      })
    }
    
  },
  selectedthr(e){
    var name = e.currentTarget.dataset.name;
    var that = this;
    if(that.data.exchangeArea == name){
      this.setData({
        exchangeArea: name,
        // select: false,
       
       })
    }else{
    this.setData({
      exchangeArea: name,
    //  select: false,
    
    // buttonshow:true,
    })}
  },
  exchangeRobot(){
    let that = this;
    that.setData({
      subarea:[],
      robots:[]
    })
    
    if(that.data.exchangeSection != null & that.data.exchangeArea != null){
      wx.request({
        url: 'https://www.liuke.xyz/gluelog/login',
        data:{
          code:"robot",
          exchangeSection:that.data.exchangeSection,
          exchangeArea:that.data.exchangeArea
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          var obj1 = res.data[0];
          
          let obj = JSON.parse(obj1)
          for(var i=0;i<obj.length;i++)
          {var subarea1 = obj[i],
            subarea = that.data.subarea;
            subarea.push(subarea1);
            that.setData({
              robots:that.data.subarea 
            })}
            that.setData({
              click3: !that.data.click3,
            });  
          }  
      })
    }else{
      wx.showToast({
        title: '请先选择班组！',
        icon:'error'
      })
    }
    
  },
  selectedfou(e){
    var name = e.currentTarget.dataset.name;
    var that = this;
    if(that.data.exchangeRobot == name){
      this.setData({
        exchangeRobot: name,
        // select: false,
       
       })
    }else{
    this.setData({
      exchangeRobot: name,
    //  select: false,
    
    // buttonshow:true,
    })}
  },
  exchangeGlue(){
    let that = this
    let userinfo = util.get('userinfo')
    let collectPerson = userinfo[0].employeeName
    console.log(collectPerson)
    let exchangebanci = that.data.exchangebanci
    let exchangeSection = that.data.exchangeSection
    let exchangeArea = that.data. exchangeArea
    let exchangeRobot = that.data.exchangeRobot


    if(exchangebanci != null & exchangeSection != null & exchangeArea != null & exchangeRobot != null){
      wx.request({
        url: 'https://www.liuke.xyz/gluelog/login',
        data:{
          code:'exchange',
          id:this.data.id,
          exchangePerson:collectPerson,
          exchangebanci:that.data.exchangebanci,
          exchangeSection:that.data.exchangeSection,
          exchangeArea:that.data. exchangeArea,
          exchangeRobot:that.data.exchangeRobot,
        },
          method:'POST',
          header:{'content-type': 'application/x-www-form-urlencoded'},
          success:function(res){
            console.log(res.data);
            if (res.data.status == true){
              wx.showToast({
                title: '提交成功！！！',
                icon: 'none',
                duration: 2000
              })
              that.setData({
                exchangeshow:false,
              })
            }else{
              wx.showToast({
                title: '提交失败！！！',
                icon: 'none',
                duration: 2000
              })
            }
          }
      })
    }else{
      wx.showToast({
        title: '更换信息不全',
        icon:'error'
      })
    }
  },
  //回收
  bancioptions(){
    let that = this;
    that.setData({
      click: !this.data.click,
    });   
    
  },
  rselectedone(e){
    var name = e.currentTarget.dataset.name;
    var that = this;
    if(that.data.recoverbanci == name){
      this.setData({
        recoverbanci: name,
        // select: false,
       
       })
    }else{
    this.setData({
      recoverbanci: name,
    //  select: false,
    
    // buttonshow:true,
    })}
  },
  recoverWeight(e){
    if(this.data.recoverWeight !== e.detail.value){
      let recoverWeight = e.detail.value
      this.setData({
        recoverWeight:recoverWeight
      })
    }
  },
  recoverGlue(){
    let that = this
    let userinfo = util.get('userinfo')
    let collectPerson = userinfo[0].employeeName
    console.log(collectPerson)
    let recoverbanci = that.data.recoverbanci
    let recoverWeight = that.data. recoverWeight



    if(recoverbanci != null & recoverWeight != null){
      console.log( recoverWeight)
      wx.request({
        url: 'https://www.liuke.xyz/gluelog/login',
        data:{
          code:'recover',
          id:this.data.id,
          recoverPerson:collectPerson,
          recoverbanci:recoverbanci,
          recoverWeight:recoverWeight,
        },
          method:'POST',
          header:{'content-type': 'application/x-www-form-urlencoded'},
          success:function(res){
            console.log(res.data);
            if (res.data.status == true){
              wx.showToast({
                title: '提交成功！！！',
                icon: 'none',
                duration: 2000
              })
              that.setData({
                exchangeshow:false,
              })
            }else{
              wx.showToast({
                title: '提交失败！！！',
                icon: 'none',
                duration: 2000
              })
            }
          }
      })
    }else{
      wx.showToast({
        title: '回收信息不全',
        icon:'error'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    let gluecode = options.gluecode
        console.log(gluecode)
        wx.request({
          url: 'https://www.liuke.xyz/gluelog/login',
          method:'POST',
          header:{'content-type': 'application/x-www-form-urlencoded'},
          data:{
            gluecode: gluecode,
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
                model:res.data[0].model, 
                productDate:res.data[0].productDate, 
                effectiveDate:res.data[0].effectiveDate, 
                voucher:res.data[0].voucher, 
                inventoryDate:res.data[0].inventoryDate,
                lingyongbanci:res.data[0].lingyongbanci,
                userSection:res.data[0].userSection,
                collectDate:res.data[0].collectDate,
                collectNum:res.data[0].collectNum,
                collectPerson:res.data[0].collectPerson,
                exchangebanci:res.data[0].exchangebanci,
                exchangeSection:res.data[0].exchangeSection,
                exchangeArea:res.data[0].exchangeArea,
                exchangeRobot:res.data[0].exchangeRobot,
                exchangeNum:res.data[0].exchangeNum,
                exchangePerson:res.data[0].exchangePerson,
                exchangeDate:res.data[0].exchangeDate,
                recoverbanci:res.data[0].recoverbanci,
                recoverWeight:res.data[0].recoverWeight,
                recoverPerson:res.data[0].recoverPerson,
                recoverDate:res.data[0].recoverDate
              })
            }
        }})
     
    
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