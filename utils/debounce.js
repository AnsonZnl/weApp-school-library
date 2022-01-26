/**
 * 函数防抖
 * @param fn 需要进行防抖操作的事件函数
 * @param interval 间隔时间
 * @returns {Function}
 */
module.exports = function debounce(fn, interval = 500) {
  var timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, args[0]);
    }, interval);
  };
}