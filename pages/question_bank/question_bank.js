// pages/question_bank/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list:0,
      total:0,
      PageSize:6,
      CurrentPage:1,
      Subject:0
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
   
      this.setData({
        Subject:options.subject
      })
      var reqTask = wx.request({
        url: 'https://www.mutou135468.top/navigatorImg',
        data: {
          PageSize:6,
          CurrentPage:this.data.CurrentPage,
          Subject:this.data.Subject
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
  
    getextra(e){
   
      let qid=e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../../pages/solve/solve?qid='+qid,
      });
    },
    onReachBottom: function () {
   
      let cur=this.data.CurrentPage;
      let pas=this.data.PageSize
      let total=this.data.total
    
      this.setData({
        CurrentPage:this.data.CurrentPage+1
      })
      if(cur*pas>total){
        wx.showToast({
          title: '达到底部',
          icon: 'none',
        });
      }
      else{
        var reqTask = wx.request({
          url: 'https://www.mutou135468.top/navigatorImg',
          data: {
            PageSize:6,
            CurrentPage:this.data.CurrentPage,
            Subject:this.data.Subject
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