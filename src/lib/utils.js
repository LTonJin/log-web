






export function timeFormat(date) {
  var Y = date.getFullYear();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var H = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();

  return Y + '-' + (M < 10 ? '0' + M : M) + '-' + (D < 10 ? '0' + D : D) + ' ' + H + ':' + m + ':' + s;
}
export function downFlie(data) {
  // 创建a标签
  var elementA = document.createElement('a');

  //文件的名称为时间戳加文件名后缀
  elementA.download = 'write_log_' + timeFormat(new Date()) + '_' + Number(new Date()) + ".txt";
  elementA.style.display = 'none';

  //生成一个blob二进制数据，内容为json数据
  var blob = new Blob([data]);

  //生成一个指向blob的URL地址，并赋值给a标签的href属性
  elementA.href = URL.createObjectURL(blob);
  document.body.appendChild(elementA);
  elementA.click();
  document.body.removeChild(elementA);
}
export default {
  timeFormat: timeFormat,
  downFlie: downFlie,
}