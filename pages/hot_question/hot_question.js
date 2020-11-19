// pages/question_bank/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    list:0,
    total:0,
    CurrentPage:1,
    PageSize:6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      Subject:options.subject
    })
    var reqTask = wx.request({
      url: 'https://www.mutou135468.top/HotQuestions',
      data: {
        PageSize:6,
        CurrentPage:this.data.CurrentPage,
      },
      header: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
      

        this.setData({
          list:result.data.data,
          total:result.data.extraMsg
        })
      },
    });

  },

  getQ(e){
  
    wx.navigateTo({
      url: '../../pages/solve/solve?qid='+e.currentTarget.dataset.id,
    });
  },
  onReachBottom: function () {
   
    let cur=this.data.CurrentPage;
    let pas=this.data.PageSize
    let total=this.data.total
 
    this.setData({
      CurrentPage:this.data.CurrentPage+1
    })
    if(cur*pas>=total){
      wx.showToast({
        title: '达到底部',
        icon: 'none',
      });
    }else{
      var reqTask = wx.request({
        url: 'https://www.mutou135468.top/HotQuestions',
        data: {
          PageSize:6,
          CurrentPage:this.data.CurrentPage,
        },
        header: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
        
         
          this.setData({
            list:[...this.data.list,...result.data.data],
            total:result.data.extraMsg
          })
        },
      });
    }
    
},
  


})