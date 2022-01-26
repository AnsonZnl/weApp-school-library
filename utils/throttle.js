/**
 * 函数节流
 * @param fn 需要进行节流操作的事件函数
 * @param interval 间隔时间
 * @returns {Function}
 */
module.exports = function throttle(fn, interval) {
  var enterTime = 0; //触发的时间
  var gapTime = interval || 500; //间隔时间，如果interval不传，则默认300ms
  return function () {
    var context = this;
    var backTime = +new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}
