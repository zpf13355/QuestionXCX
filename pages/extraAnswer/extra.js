Page({

  data: {
    content: '',
  },

  onLoad: function (options) {
    var reqTask = wx.request({
      url: 'https://www.mutou135468.top/getAnswer',
      data: {
        Aid:options.aid
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result)=>{
        
        var content = result.data

        var newContent = content.replace('<html>\n <head></head>\n <body>\n', '')
          .replace('\n </body>\n</html>', '')
        this.setData({
          content: newContent
        })





      },
    });
   
  },
})