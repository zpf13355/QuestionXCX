// pages/cates/cates.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"程序语言",
        isActive:false
      },
      {
        id:2,
        value:"数据库",
        isActive:false
      },
      {
        id:3,
        value:"框架",
        isActive:false
      },
    ],
        lauanage_list:[
              {
                id:0,
                name:"Java",
                url:"https://www.mutou135468.top/imgCate/J1vOv6.png"
              },
              {
                id:1,
                name:"php",
                url:"https://www.mutou135468.top/imgCate/J1xSVe.png"
              },
              {
                id:2,
                name:"C++",
                url:"https://www.mutou135468.top/imgCate/3.jpg"
              },
              {
                id:3,
                name:"Python",
                url:"https://www.mutou135468.top/imgCate/1.jpg"
              },
              {
                id:4,
                name:"JavaScript",
                url:"https://www.mutou135468.top/imgCate/2.jpg"
              }
            
          
        ],

        sql_list:[
              {
                id:5,
                name:"SQL",
                url:"https://www.mutou135468.top/imgCate/4.jpg"
              },
              {
                id:6,
                name:"SQL Sever2012",
                url:"https://www.mutou135468.top/imgCate/5.png"
              },
              {
                id:7,
                name:"MySQL",
                url:"https://www.mutou135468.top/imgCate/J3pgdU.jpg"
              }
            
          

        ],

        web_list:[
              {
                id:8,
                name:"Node Js",
                url:"https://www.mutou135468.top/imgCate/J3S4Df.jpg"
              },
              {
                id:9,
                name:"Spring",
                url:"https://www.mutou135468.top/imgCate/8.jpg"
              },
              {
                id:10,
                name:"React",
                url:"https://www.mutou135468.top/imgCate/6.png"
              },
              {
                id:11,
                name:"MyBatis",
                url:"https://www.mutou135468.top/imgCate/J3S28A.jpg"
              },
              {
                id:12,
                name:"VUE",
                url:"https://www.mutou135468.top/imgCate/7.jpg"
              }
        ]
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },

  handleTitle(e){
   
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs,
    })
  },

 
})