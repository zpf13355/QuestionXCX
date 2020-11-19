// pages/user/index.js
Page({
  data: {
    pclass:null,
    pclassify:null,
    pgrade:null,
    pname:null,
    pno:null,
    ppro:null
  },

  onLoad: function (options) {
      wx.getStorage({
        key: 'user',
        success: (result)=>{
         this.setData({
          pclass:result.data.data.pclass,
          pclassify:result.data.data.pclassify,
          pgrade:result.data.data.pgrade,
          pname:result.data.data.pname,
          pno:result.data.data.pno,
          ppro:result.data.data.ppro
         })
        },

      });
  },


  collect(e){
    wx.navigateTo({
      url: '../../pages/question_list/question_list?pno='+this.data.pno,
    });
  },
  ques(e){
    wx.navigateTo({
      url: '../../pages/collect_list/collect_list?pno='+this.data.pno,
    });
  }

})