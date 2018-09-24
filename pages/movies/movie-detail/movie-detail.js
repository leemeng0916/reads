var util = require('../../../utils/utils.js')
var app = getApp()
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
    var movieid = options.id;
    //  console.log(movieid)
    var detailUrl = app.globalData.doubanBase + '/v2/movie/subject/' + movieid;
    util.getrequestlist(detailUrl, this.processDouBanData);
  },
  processDouBanData: function(data) {
    // console.log(data);
    var director = {
      avatar: '',
      name: '',
      id: ''
    };
    if (data.directors[0] != null) {
      if (data.directors[0].avatar != null) {
        director.avatar = data.directors[0].avatar;

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;

    }
    var movie = {
      image: data.images ? data.images.large : '',
      originaltitle: data.original_title,
      title:data.title,
      wishCount: data.wish_count,
      year: data.year,
      summary:data.summary,
      rating:data.rating,
      average: data.rating.average,
      countries: data.countries,
      director: director,
      commentscount: data.comments_count,
      cast:util.CasttoString(data.casts),
      genres:data.genres.join('、'),
      castinfo:util.CastInfotoString(data.casts)  
    };
    this.setData({
      movie: movie
    });
    console.log(movie)
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