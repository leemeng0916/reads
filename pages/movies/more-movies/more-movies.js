// pages/movies/more-movies/more-movies.js
var app = getApp();
var util = require('../../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataUrl:'',
    nextnum:0,
    movies:[],
    isEmtpy:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.contap;
     console.log(id);
    this.setData({
      navititle: id
    });
    var dataUrl = '';
    switch (id) {
      case '最近上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
      case '全部250名':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
      case '即将上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
    }
    util.getrequestlist(dataUrl, this.processDouBanData);
    this.data.dataUrl=dataUrl;
  },
  processDouBanData: function(moviedouban) {
    var movies = [];
    var totalmovies={};
    for (var idx in moviedouban.subjects) {
      var subject = moviedouban.subjects[idx];
      var title = subject.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + '...'
      }
      var image = subject.images.large;
      var rating = subject.rating.average;
      var stars = util.convertstar1(subject.rating.stars);
      // console.log(subject.rating.stars);
      var temp = {
        image: image,
        title: title,
        average: rating,
        stars: stars,
      };

      movies.push(temp);
    }
    if(!this.data.isEmtpy){
      totalmovies=this.data.movies.concat(movies);

    }
    else{
      totalmovies=movies;
      this.data.isEmtpy=true;
    }
    this.data.nextnum+=20;
    this.setData({ movies: totalmovies});

  },
  onscrolltolower:function(event){
    var nextUrl=this.data.dataUrl+'?start='+this.data.nextnum+'&count=20';
    util.getrequestlist(nextUrl, this.processDouBanData);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navititle,

    })
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