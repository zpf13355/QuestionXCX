//app.js
Page({
  data:{
    pno:0,
    list:0
  },
 
  onLoad: function(options){
    this.setData({
      pno:options.pno
    })

    var reqTask = wx.request({
      url: 'https://www.mutou135468.top/GetCollectQuestion',
      data: {
        Pno:this.data.pno
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        this.setData({
          list:result.data
        })
      },
    });
  },

  getQ(e){

    wx.navigateTo({
      url: '../../pages/solve/solve?qid='+e.currentTarget.dataset.id,
    });
  },





});