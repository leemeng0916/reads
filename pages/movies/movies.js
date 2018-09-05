var app = getApp()
var util = require('../../utils/utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 'inthearter': {},
    // 'top250': {},
    // 'commingsoon': {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var top250url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';
    var incommingsoonurl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
    var inthearterurl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';

    this.getrequestlist(inthearterurl, 'inthearter', '最近上映');

    this.getrequestlist(top250url, 'top250', '全部250名');
    this.getrequestlist(incommingsoonurl, 'commingsoon', '即将上映');

  },

  onmoretap: function() {
    wx.navigateTo({
      url: 'more-movies/more-movies'

    })
  },
  getrequestlist: function(url, setkey, setkey1) {
    var that = this;
    wx.request({
      // 豆瓣API需要使用http://t.yushu.im代替之前的https://api.douban.com
      url: url,
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.processDouBanData(res.data, setkey, setkey1)

      },

    })

  },
  processDouBanData: function(moviedouban, setkey, setkey1) {
    var movies = [];
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
    // 添加JS对象是为了让setkey与movies一一对应上，{ movies: movies}是为了方便模板movieslist直接调用。
    // 不能直接使用将movies: movies传入到data的原因是：1.三行显示无法分辨去对应的movie,只会读取出同一个movies
    //  2.读取完三个获取数据的函数后，Movies被更新为最后一个读取数据的Movies
    var readysetkey = {};
    readysetkey[setkey] = {
      movies: movies,
      setkey: setkey1

    };
    this.setData(readysetkey);


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