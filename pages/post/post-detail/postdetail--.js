var post_require = require('../../../data/posts-data')
// pages/post-detail/postdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var post_id = options.id;
    this.data.currentpostid=post_id;
    // options.id(id取的是post.js文件中的id)
    // console.log(post_id);
    var postdata = post_require.postList[post_id];
    // 通过从data文件中接收数据，然后传入不同的Post_id
    // 值
    // console.log(postdata);
    this.setData(postdata);
    //  wx.setStorageSync("key", "风暴英雄");
    //  设置同步缓存，如不清除缓存，下次打开依然存在缓存，需要用引号将key包裹起来。设置一个缓存，只能使用一对数据。
    // wx.setStorageSync("key", {game:'baoxue',
    // developer:'meiguo'
    // });
    // wx.setStorageSync("key1", {
    //   game: 'baoxue1',
    //   developer: 'meiguo1'
    // })
    // 修改缓存的方法和创建是一样的，但是需要保证key一致。
    var postscollected = wx.getStorageSync('post_collected');
    // 初次加载存在两种情况：
    // 1.没有缓存，postcollected为空，直接执行else
    // 2.当前view没有缓存，执行if内部语句，最终为false。
    if (postscollected) {
      // 1.如果缓存postscollected存在，且当前view的缓存有值，直接发送数据到逻辑层显示当前的标签状态。
      // 2.如果缓存存在，但当前的view缓存为空，也会发送空数据到逻辑层，显示当前状态为灰色按钮。
      var postcollected = postscollected[post_id];
      this.setData({
        collected : postcollected
      })
    } else {
      // 如果第一次打开，没有缓存，创建相应的缓存dict,将当前的view的缓存赋值，赋值为false,然后将该值赋值到缓存中，注意此次只有一个key：value
      postscollected = {};//？？为何可以是dict
      postscollected[post_id] = false;
     
      wx.setStorageSync('post_collected', postscollected)
    }
  },
  oncollectionTap: function(event) {
    var postscollected = wx.getStorageSync('post_collected');
    // 1.第一次点击第二个view，记录了当前的状态，返回
    // 2.第一次点击第一个view，记录当前状态，空，显示灰色.无缓存。
    // 3.第二次点击第一个view，点击收藏按钮，缓存中该view并无记录值，下面的语句显示postcollected为多少？
    // 理解错误：每一个view点击进来后跳转界面，都会执行一个onload()。
    var postcollected = postscollected[this.data.currentpostid];
    postcollected=!postcollected;
    postscollected[this.data.currentpostid] = postcollected;
    wx.setStorageSync('post_collected', postscollected);
    this.setData({ collected: postcollected})



    // console.log(i)

  },
  onshareTap: function(event) {
    // wx.removeStorageSync('key');
    // 清除key值的缓存
    wx.clearStorageSync();
    // 清除全部缓存
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})