//app.js
Page({
  data:{
    value:"",
    list:0,
    PageSize:6000,
    CurrentPage:1
  },
 
  onLoad: function(options){
    this.setData({
      value:options.value
    })

    var reqTask = wx.request({
      url: 'https://www.mutou135468.top/Search',
      data: {
        SearchInput:this.data.value,
        PageSize:this.data.PageSize,
        CurrentPage:1
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