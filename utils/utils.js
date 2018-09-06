function convertstar(stars) {
  var star = [];
  var num = stars.toString().substring(0, 1);
  // console.log(num);
  for (var i=1; i <= 5; i++) {
    if (i <= num) {
      star.push(1);
    } else {
      star.push(0);
    }
    
  }
  return star;
}
function getrequestlist(url,callback) {
  
  wx.request({
    // 豆瓣API需要使用http://t.yushu.im代替之前的https://api.douban.com
    url: url,
    header: {
      'content-type': ''
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
     callback(res.data);
    },

  })

}
module.exports = {
  convertstar1: convertstar,
  getrequestlist: getrequestlist
}