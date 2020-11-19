Page({
  data: {
    formats: {},
    readOnly: false,
    content:'正文.....',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    imgurlArray:[],
    myarr:[],     //传送图片的url
    editorContent:"",//正文输入内容
    Pno:0,
    Qid:0
  },
  bindPickerChange: function(e) {
  
    this.setData({
      index: e.detail.value
    })
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad(options) {
    this.setData({
      Qid:options.qid
    })
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
  
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
      
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
       
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  save(e){
    this.setData({
      urlArray:this.data.myarr+e
    })
 
  },
  //匿名功能
  IsNotShow(e){
 
    var isHidden=e.detail.value
    this.setData({
      isHidden:isHidden
    })
  
  },
  //标题判空
  title(e){

    this.setData({
      titleContent:e.detail.value
    })
  },
  //正文判空
  editor(e){
    this.setData({
      editorContent:e.detail.html
    })
  },
  //点击提交，开始请求大战
  submit(){
    var newArrays=[];
    const that=this;
    //判断正文与标题是否为空，不空则正式发送请求，否则弹窗警告
    if(this.data.editorContent=="<p><br></p>"){
      wx.showToast({
        title: '正文不能为空!',
        icon: 'none',
      });
    }else{
      //显示提示框，提示是否选择了正确的科目
      wx.showModal({
        title: '提交',
        content: '是否将问题提交指定科目区',
        showCancel: true,
        cancelText: '确定',
        cancelColor: '#3CC51F',
        confirmText: '取消',
        confirmColor: '#000000',
        success: (result) => {
          if(!result.confirm){
            //点击确定，确定发送请求
            //读取图片本地暂存url数组
            var imgurlArray=this.data.imgurlArray
            var index="0";
            //逐一上传图片至服务器
            if(imgurlArray.length ==0){
                wx.getStorage({
                  key: 'user',
                  success: (result)=>{
                    this.setData({
                      Pno:result.data.data.pno
                    })
                    this.editorCtx.getContents({
                      success:(res)=>{
                        var reqTask = wx.request({
                          url: 'https://www.mutou135468.top/Wechat/AnswerUpload',
                          data: {
                            Acontent:res.html,
                            Pno:this.data.Pno,
                            Atxt:res.text,
                            imgUrl:JSON.stringify(this.data.myarr),
                            Qid:this.data.Qid
                          },
                          header: {'content-type':'application/json'},
                          method: 'GET',
                          dataType: 'json',
                          responseType: 'text',
                          success: (result)=>{
                            wx.redirectTo({
                              url: '../../pages/solve/solve?qid='+this.data.Qid,
                            });
                          },
                        });
                      }
                    })
                  },
                });
            }else{
              imgurlArray.forEach(element => {
                index+="0"
                var upTask = wx.uploadFile({
                  url: 'https://www.mutou135468.top/Wechat/imageUpload',
                  filePath:element,
                  name:"img"+index,
                 //后台request.getParts接受
                  formData: {
                  }, header: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': wx.getStorageSync("access_token"),  //如果需要token的话要传
                  },
                  success: (result)=>{
                    //获取本地存储内容
                    var imgs=result.data
                    wx.getStorage({
                      key: 'user',
                      success: (result)=>{
                        this.setData({
                          Pno:result.data.data.pno
                        })
                     
                        //拼接返回图片url数组
                        newArrays=[imgs]
                        newArrays =newArrays.concat(that.data.myarr)
                        that.setData({
                          myarr:newArrays
                        })
                        //当foreach循环结束，开始带着url和其他参数继续申请新接口
                       if(imgurlArray.length == newArrays.length){
                        this.editorCtx.getContents({
                          success:(res)=>{
                        
                            var reqTask = wx.request({
                              url: 'https://www.mutou135468.top/AnswerUpload',
                              data: {
                            Acontent:res.html,
                            Pno:this.data.Pno,
                            Atxt:res.text,
                            imgUrl:JSON.stringify(this.data.myarr),
                            Qid:this.data.Qid,

                              },
                              method: 'POST',
                              header: {
                                //默认值'Content-Type': 'application/json'
                               'content-type': 'application/x-www-form-urlencoded' //post
                             },
                              success: (result)=>{
                                wx.redirectTo({
                                  url: '../../pages/solve/solve?qid='+this.data.Qid,
                                });
                              },
                            });
                          }
                        })
      
      
                       }
  
                      },
                    });
                 
                  }, //
                });
              });
            }
           
            //结束之后，清零imgurlArray
            this.setData({
              imgurlArray:[],
              myarr:[]
            })

            




            //发送请求，第一步先上传图片
            //上传成功返回函数，后台返回图片url
            //第三步将html代码传入后台
            //后台将图片url插入html代码，替换 存入数据库
          }
        },
      });
    }
      
  },

  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            var newArray=[res.tempFilePaths[0]]
            newArray =newArray.concat(that.data.imgurlArray)
            that.setData({
              imgurlArray:newArray
            })
          }
        })
      }
    })
  }
})
