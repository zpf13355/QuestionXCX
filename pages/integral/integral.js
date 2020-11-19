// pages/integral/integral.js
Page({

  data: {
    tabs:[
      {
        id:0,
        value:"学院",
        isActive:true
      },
      {
        id:1,
        value:"专业",
        isActive:false
      },
      
    ],

    list1:{
      
    },
    list2:{},
    list3:{
     
    },
    list4:[
      
    ]
  },

  handleTitle(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs,
    })
    if(tabs[0].isActive == true){
      var reqTask = wx.request({
        url: 'https://www.mutou135468.top/Wechat/Contribute',
        header: {'content-type':'application/json'},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result)=>{
          this.setData({
            list4:result.data.left,
            list1:result.data.fir_third[0],
            list2:result.data.fir_third[1],
            list3:result.data.fir_third[2]
          })
        },
      });
    }else{
      wx.getStorage({
        key: 'user',
        success: (result)=>{
          var profession = result.data.data.ppro
          console.log(profession);
          var reqTask = wx.request({
            url: 'https://www.mutou135468.top/Wechat/Contribute',
            data:{
              ppro:profession
            },
            header: {'content-type':'application/json'},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result)=>{
              console.log(result.data);
              this.setData({
                list4:result.data.left,
                list1:result.data.fir_third[0],
                list2:result.data.fir_third[1],
                list3:result.data.fir_third[2]
              })
            },
          });
        },
      });
    }
  },
  onLoad: function (options){
  
    var reqTask = wx.request({
      url: 'https://www.mutou135468.top/Wechat/Contribute',
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        console.log(result.data);
        this.setData({
          list4:result.data.left,
          list1:result.data.fir_third[0],
          list2:result.data.fir_third[1],
          list3:result.data.fir_third[2]
        })
      },
    });




  }

     
})