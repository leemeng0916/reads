 var require_data = require('../../../data/posts-data')
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
     this.data.currentdata = post_id;
     // 此处的postList中的post_id一定是0开始，每一个 {}递增。如果Post_id是随意取的，将不能和view中传递过来的匹配。
     var postdata = require_data.postList[post_id];

     this.setData(postdata);
     // 先查看console中的问题，无误后在进行调试
     var postscollected = wx.getStorageSync('post_collected');
     if (postscollected) {
       var postcollected = postscollected[post_id];
       this.setData({
         collected: postcollected
       });
     } else {
       postscollected = {};
       postscollected[post_id] = false;
       wx.setStorageSync(post_collected, postscollected[post_id])

     }

   },
   oncollectionTap: function(event) {
     var postscollected = wx.getStorageSync('post_collected');
     var postcollected = postscollected[this.data.currentdata];
     postcollected = !postcollected;
     postscollected[this.data.currentdata] = postcollected;
     wx.setStorageSync('post_collected', postscollected);
     this.setData({
       collected: postcollected
     });
     wx.showToast({
       title: postcollected?'收藏成功':'取消收藏',
       duration:1000
     })
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