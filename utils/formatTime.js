// 日期时间 格式化

function formatTime1(date){
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


// 日期时间 格式化
 function formatTime2(date){
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  return [year, month, day].map(formatNumber).join('-')
}
module.exports={
  formatTime2,
  formatTime1
}
