const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//生成从minNum到maxNum的随机数
const randomNum = (lower, upper)=> {
  return Math.floor(Math.random() * (upper - lower)) + lower;
} 

module.exports = {
  formatTime: formatTime,
  randomNum: randomNum
}
