const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const deepClone = function(initalObj) {
  var obj = {};
  obj = JSON.parse(JSON.stringify(initalObj));
  return obj;
}
// 点击时间限制
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 5000//这是设置的时间间隔
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
var redis= "redis"

function put(k, v, t) {
  wx.setStorageSync(k, v)
  var seconds = parseInt(t)
  if (seconds > 0) {
    var newtime = Date.parse(new Date())
    newtime = newtime / 1000 + seconds;
    wx.setStorageSync(k + redis, newtime + "")
  } else {
    wx.removeStorageSync(k + redis)
  }
}
/**
 * 获取
 * k 键key
 */
function get(k) {
  var deadtime = parseInt(wx.getStorageSync(k + redis))
  if (deadtime) {
    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
      wx.removeStorageSync(k);
      // console.log("过期了")
      return null
    }
  }
  var res=wx.getStorageSync(k)
  if(res){
    return res
  }else{
    return null
  }
}
 
/**
 * 删除
 */
function remove(k) {
  wx.removeStorageSync(k);
  wx.removeStorageSync(k + redis);
}
 
/**
 * 清除所有key
 */
function clear() {
  wx.clearStorageSync();
}
module.exports = {
  formatTime,
  deepClone,
  throttle: throttle,
  put: put,
  get: get,
  remove: remove,
  clear: clear,
}
