var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var top250url = app.globalData.doubanBase + '/v2/movie/top250' +'?start=0&count=3';
    var incommingsoonurl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    var inthearterurl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';

    // this.getrequestlist(top250url);
    // this.getrequestlist(incommingsoonurl);
    this.getrequestlist(inthearterurl);

  },
  getrequestlist:function(url){
    var that=this;
    wx.request({
      // 豆瓣API需要使用http://t.yushu.im代替之前的https://api.douban.com
      url: url,
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.processDouBanData(res.data)
        
      }
     
    })

  },
  processDouBanData:function(moviedouban){
    var movies=[];
    for (var idx in moviedouban.subjects){
      var subject = moviedouban.subjects[idx];
      var title=subject.title;
      if (title.length>6){
         title=title.substring(0,6)+'...'
      }
      var image=subject.images.large;
      var rating=subject.rating.average;
      var temp={
         image:image,
         title:title,
         average:rating
      };
      movies.push(temp);
    }
    this.setData({
      movies: movies
    })
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