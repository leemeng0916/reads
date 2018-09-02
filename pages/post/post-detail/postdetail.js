 var require_data = require('../../../data/posts-data')
 //  创建一个全局变量，全局变量取自app.js中，使用getApp()方法
 var app = getApp();
 Page({

   /**
    * 页面的初始数据
    */
   data: {},

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {

     var post_id = options.id;
     this.data.currentdata = post_id;
     // 此处的postList中的post_id一定是0开始，每一个 {}递增。如果Post_id是随意取的，将不能和view中传递过来的匹配。
     this.data.postdata = require_data.postList[post_id];

     this.setData({
       postdata: this.data.postdata
     });
     // 先查看console中的问题，无误后在进行调试
     var postscollected = wx.getStorageSync('post_collected');
     if (postscollected) {
       var postcollected = postscollected[post_id];    
       if (postcollected){
         this.setData({
           collected: postcollected
         });
       }
       
     } else {
       postscollected = {};
       postscollected[post_id] = false;
      //  此处之前发现一个问题，将value值传入的是postscollected[post_id]，在点击收藏按钮是，程序报错，原因是这里传入的类型是个string，与后面传入的缓存类型不符，编译器提示报错
       wx.setStorageSync('post_collected', postscollected);
       
     }
     //  加载Onload中函数时，判断全局变量的值，如果为真，将播放图标依然为播放
     if (app.globalData.g_isPlayingMusic & app.globalData.g_currentMusicPostId == post_id) {
       //  正在播放音乐并且是符合当前界面播放的音乐
       this.setData({
         isplayingmusic: true
       })
     };

     this.setmusicmonitor();
   },
   //  setmusicmonitor: function() {
   //    var that = this;
   //   //  监听函数用于监听音乐播放，如是播放中，将播放图标为播放
   //    wx.onBackgroundAudioPlay(function() {
   //        that.setData({
   //          isplayingmusic: true
   //        });
   //      app.globalData.g_isPlayingMusic=true;
   //      app.globalData.g_currentMusicPostId=that.data.currentdata;
   //      }),
   //      wx.onBackgroundAudioPause(function() {
   //        that.setData({
   //          isplayingmusic: false

   //        });
   //      app.globalData.g_isPlayingMusic=false;
   //      app.globalData.g_currentMusicPostId = null;

   //      })
   //  },

   setmusicmonitor: function() {
     var that = this;
     wx.onBackgroundAudioPlay(function() {
       that.setData({
         isplayingmusic: true
       });
       // app.globalData.g_currentMusicPostId = that.data.currentdata;
       // app.globalData.g_isPlayingMusic=true;
       app.globalData.g_currentMusicPostId = post_id;
       app.globalData.g_isPlayingMusic = true;
     });
     wx.onBackgroundAudioPause(function() {
       that.setData({
         isplayingmusic: false
       });
       app.globalData.g_currentMusicPostId = null;
       app.globalData.g_isPlayingMusic = false;
       // app.globalData.g_currentMusicPostId = null;
       // app.globalData.g_isPlayingMusic=false;


     });
   },
   musicTap: function(event) {
     //  var post_id = this.data.currentdata;
     //  var postdata = require_data.postList[post_id];
     //  var isplayingmusic = this.data.isplayingmusic;
     //  if (isplayingmusic) {
     //    wx.pauseBackgroundAudio();
     //    this.setData({
     //      isplayingmusic: false
     //    });
     //  } else {
     //    wx.playBackgroundAudio({
     //      dataUrl: postdata.music.url,
     //      title: postdata.music.title,
     //      coverImgUrl: postdata.music.coverImgUrl,

     //    });
     //    this.setData({
     //      isplayingmusic: true
     //    });
     //  }
     var post_id = this.data.currentdata;
     var postdata = require_data.postList[post_id];
     var isplayingmusic = this.data.isplayingmusic;
     var that = this;
     if (isplayingmusic) {
       wx.pauseBackgroundAudio();
       this.setData({
         isplayingmusic: false
       });

     } else {
       wx.playBackgroundAudio({
         dataUrl: postdata.music.url,
         title: postdata.music.title,
         coverImgUrl: postdata.music.coverImgUrl,
         success: function(res) {
           that.setData({
             isplayingmusic: true
           })
         }
       });

     }




   },
   oncollectionTap: function(event) {

     //  wx.showToast({
     //    title: postcollected?'收藏成功':'取消收藏',
     //    duration:1000
     //  })
     this.getstoragesyc();
   },
   getstoragesyc: function() {
     
     var postscollected = wx.getStorageSync('post_collected');
     var postcollected = postscollected[this.data.currentdata];
     postcollected =!postcollected;
     postscollected[this.data.currentdata] = postcollected;
     this.showTost(postcollected, postscollected);

   },
   //  同步和异步存储缓存的区别:同步会同时去加载，异步会等待找到缓存后，才会执行下面的程序
   getstorageayc: function() {
     var that = this;
     wx.getStorage({
       key: 'post_collected',
       success: function(res) {
         //  res.data为缓存值
         var postscollected = res.data;
         var postcollected = postscollected[that.data.currentdata];
         postcollected = !postcollected;
         that.showTost(postcollected, postscollected);

       },
       fail: function(res) {},
       complete: function(res) {},
     })
   },
   showModal: function(postcollected, postscollected) {
     //  需要定义that变量，this变量是属于外层函数showModal的
     var that = this;

     wx.showModal({
       title: 'hahah',
       content: '确定是否收藏',
       showCancel: true,
       cancelText: '取消',
       cancelColor: '',
       confirmText: '确定',
       confirmColor: '',
       success: function(res) {
         if (res.confirm) {
           postscollected[that.data.currentdata] = postcollected;
           wx.setStorageSync('post_collected', postscollected);
           that.setData({
             collected: postcollected
           })
         }
       },
       fail: function(res) {},
       complete: function(res) {},
     })


   },
   showTost: function(postcollected, postscollected) {
    
    
    
     wx.setStorageSync('post_collected', postscollected);
     this.setData({
       collected: postcollected
     });
     wx.showToast({
       title: postcollected ? '收藏成功' : '取消收藏',
       icon: '',
       image: '',
       duration: 1000,
       mask: true,
     })
   },
   onshareTap: function(event) {
     var itemList = [
       '分享到微信好友',
       '分享到朋友圈',
       '分享到QQ'

     ]
     wx.showActionSheet({
       itemList: itemList,
       itemColor: '',
       success: function(res) {
         wx.showModal({
           title: '用户' + itemList[res.tapIndex],
           content: '',
           showCancel: true,
           cancelText: '取消',
           cancelColor: '',
           confirmText: '确定',
           confirmColor: '',
           success: function(res) {},
           fail: function(res) {},
           complete: function(res) {},
         })
       },
       //  fail: function(res) {},
       //  complete: function(res) {},
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