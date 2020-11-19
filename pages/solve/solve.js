// pages/solve/solve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qid:0,
    questionWithUser: {
      
    },
   
      list:[
      
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      qid:options.qid
    })

    var reqTask = wx.request({
      url: 'https://www.mutou135468.top/AnswerList',
      data: {
        Qid:this.data.qid,
        PageSize:10000,
        CurrentPage:1
      },
      header: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        this.setData({
          list:result.data.list,
          questionWithUser:result.data.questionWithUser,

        })
      
      },
    });
  },

  extraQ(e){
    let qid=this.data.questionWithUser.qid;
    wx.navigateTo({
      url: '../../pages/extraQuestion/extra?qid='+qid,
    });
  },
  getAnswer(e){
    let aid=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/extraAnswer/extra?aid='+aid,
    });
  },
  answer(e){
    wx.redirectTo({
      url: '../../pages/edAnswer/editor?qid='+this.data.qid,
    });
  },
  shoucang(e){
    wx.showModal({
      title: '提示',
      content: '是否收藏本题',
      showCancel: true,
      cancelText: '确定',
      cancelColor: '#3CC51F',
      confirmText: '取消',
      confirmColor: '#000000',
      success: (result) => {
        if(!result.confirm){
          wx.getStorage({
            key: 'user',
            success: (result)=>{
          
              var reqTask = wx.request({
                url: 'https://www.mutou135468.top/Wechat/CollectQuestion',
                data: {
                  Qid:this.data.qid,
                  Pno:result.data.data.pno
                },
                header: {'content-type':'application/json'},
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result)=>{
                  wx.showToast({
                    title: '收藏成功',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: false,
                  });
                },
              });
            },
          });
        }
      },
    });
  },

  like(e){
    
      var reqTask = wx.request({
        url: 'https://www.mutou135468.top/Wechat/CollectAnswer',
        data: {
          Aid:e.currentTarget.dataset.id
        },
        header: {'content-type':'application/json'},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success:(result)=>{
          wx.showToast({
            title: '点赞成功',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false,
          });
        }
      });

    
   
  }

})