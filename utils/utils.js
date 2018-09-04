function convertstar(stars) {
  var star = [];
  var num = stars.toString().substring(0, 1);
  console.log(num);
  for (var i=1; i <= 5; i++) {
    if (i <= num) {
      star.push(1);
    } else {
      star.push(0);
    }
    
  }
  return star;
}
module.exports = {
  convertstar1: convertstar
}