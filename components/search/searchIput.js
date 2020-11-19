// components/search/searchIput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  
  data: {

  },

 
  methods: {
    searchBtn : function(e){ 
      
      wx.navigateTo({
        url: '../../pages/search/search?value='+e.detail.value,
      });







      
    }
  }
})
