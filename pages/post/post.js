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
  //dataset.为固定写法,注意后面的postid必须为小写，写法为XML中data-后面的变量名。
  // 1.XML加载的时候，就会将每个VIEW的ID值从数据中拿到，将其放在data-postid中。
  // 2.当点击对应的VIEW时，按钮绑定的事件，将view的id值获取到。
  // 3.事件通过跳转界面，将id传到下一个界面去。
  // 4.下一个界面的Js文件接受id后，同时将数据层的数据获取到，从数组赋予Id，从而获取到对应的item
    var i = event.currentTarget.dataset.postid;
  // console.log('this is new text si '+ i)
  wx.navigateTo({
    url: 'post-detail/postdetail?id='+i,//相对路径，同一个目录下的文件可以直接调取,跳转页面时，直接加问号和ID，会将值传入到postview的js文件中onload的Options.
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
    //post_require.postList是一个数组
    // 传入到data 中样式为：
    // data: {
    //   post_con: post_require.postList
    // }

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