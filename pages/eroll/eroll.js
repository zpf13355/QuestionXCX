// pages/eroll/eroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    sno:"",
    code:0,
    classify:""
  },

  nameInput:function(e){
   
    this.data.userName=e.detail.value;
  },
  snoInput:function(e){

    this.data.sno=e.detail.value;
  },
  callInput:function(e){
 
    this.data.call=e.detail.value;
  },

  //注册
  zc:function(e){
    var that=this;
    var mySno=/^4\d{2}09\d{6}$/;
    if(that.data.userName==""){
      wx.showModal({
        title: '提示!',
        content: '请输入姓名',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
        
    }
    else if(!mySno.test(that.data.sno)){
      wx.showModal({
        title: '提示!',
        content: '请输入正确的学号',
        showCancel: false,
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });
    }
    else{
      //效验完成向后台发送数据
      var reqTask = wx.request({
        url: 'https://www.mutou135468.top/register',
        data: {
          Pclassify:this.data.classify,
          Pno:this.data.sno,
          Pname:this.data.userName,
          code:this.data.code
        },
      

        header: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
     
          wx.setStorage({
            key: 'user',
            data: result.data,
            success: (result)=>{
           
             wx.switchTab({
               url: '../../pages/index/index',
               success: (result)=>{
                 
               },
             });
            },

          });
        },
      });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        code:options.code,
        classify:options.classify
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