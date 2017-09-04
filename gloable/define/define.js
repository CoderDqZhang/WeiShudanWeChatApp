function imageUrlType(url) {
  var strs = url.split("/")
  var imags = strs[2].split(".")
  if (imags[1] == 'ddimg') {
    return 'dandan'
  } else {
    return 'douban'
  }
}

//时间戳转换时间  
function toDate(number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
} 

module.exports.toDate = toDate
module.exports.imageUrlType = imageUrlType