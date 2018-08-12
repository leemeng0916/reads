var post_require=require('../../data/posts-data')//只能使用相对路径表达
//接受post-data中的数据，读取出需要变量名.post-data文件中的key
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  onpostview:function(event){
  //通过event来获取XML中VIEW的item.post_id
  //event当前事件，currentTarget表示当前VIEW
  //dataset.id 是一个集合，可以提取出data-id中的值，也可以提取出标签内该data开头其余字段的值。
  //dataset.id 为固定写法。
  var i=event.currentTarget.dataset.id;
  //console.log('this is new text si '+ i)
  wx.navigateTo({
    url: 'postview/postview?id='+i,//相对路径，同一个目录下的文件可以直接调取,跳转页面时，直接加问号和ID，会将值传入到postview的js文件中onload的Options.
  })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //数据绑定现在只能使用下面这种方式，对于for循环后的数据绑定
    //使用{key:value}这种方式给data 传值，到XML中可以读取出key
    //绑定数据是在onload之后发生的。
    this.setData({ post_con: post_require.postList})
  },
    
 
   
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})