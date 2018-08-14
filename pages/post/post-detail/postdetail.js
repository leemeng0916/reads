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
    var postcollected = wx.getStorageSync('post_collected');
    if (postcollected) {
      var i = postcollected[post_id];
      this.setData({
        collect: i
      })
    } else {
      postcollected = {};
      postcollected[post_id] = false;
      wx.setStorageSync('post_collected', postcollected)
    }
  },
  oncollectionTap: function(event) {
    var i = wx.getStorageSync('key');
    console.log(i)
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