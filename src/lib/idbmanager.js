import {
  idbIsSupported,
  CustomDB,
  deleteDB
} from 'idb-managed';
import {
  timeFormat,
  downFlie,
  splitStr
} from "./utils";
/**
 * 
 * @param {*dbName 数据库名称[可选] *dbVersion 数据库版本[可选] *duration 数据库有效期[可选] } dbConfig
 */

export function isSupportedDB() {
  return idbIsSupported()
}

/**
 * 
 * @param {*String} appid 项目标识符
 */
var sevenDay = 7 * 24 * 1000 * 3600; // ms
var strLength = 2000000;
export function WebLog(appid) {
  if (!idbIsSupported()) {
    console.log('IndexedDB is supported: false');
    return;
  }
  var appID = 'BUTEL_LOG_' + appid;
  this.appid = appID;
  this.db = new CustomDB({
    dbName: appID,
    dbVersion: 1,
    itemDuration: sevenDay,
    tables: {
      'log_detail_table': {
        indexList: [{
          indexName: 'logCreateTime',
          unique: false
        }, {
          indexName: 'logString',
          unique: false
        }, {
          indexName: 'type',
          unique: false
        }],
        itemDuration: sevenDay
      }
    }
  });
}

/**
 * @param { any } args 写入内容
 */
async function _writeLog(args, type) {
  var argsArr = Array.prototype.slice.call(args, 0)
  if (!this.db) {
    console.log('IndexedDB is supported: false');
    return;
  }
  var message = '';
  for (let msg of argsArr) {
    message += typeof msg === 'object' ? JSON.stringify(msg) : msg;
  }
  await this.db.addItems([{
    tableName: 'log_detail_table',
    item: {
      logCreateTime: timeFormat(new Date()),
      type: type,
      logString: message
    }
  }])
}
// 写入日志
WebLog.prototype.log = async function () {
  await _writeLog.call(this, arguments, 'log');
}
WebLog.prototype.info = async function () {
  await _writeLog.call(this, arguments, 'info');
}
WebLog.prototype.warn = async function () {
  await _writeLog.call(this, arguments, 'warn');
}
WebLog.prototype.error = async function () {
  await _writeLog.call(this, arguments, 'error');
}
// 将日志下载到本地存为txt文件
/**
 * @param { starTime } 要取日志的开始时间 单位是ms
 * @param { endTime } 要取日志的结束时间 单位是ms
 */
WebLog.prototype.downloadLog = async function downloadLog(starTime, endTime) {
  if (!this.db) {
    console.log('IndexedDB is supported: false');
    return;
  }
  var starTime = starTime || new Date() - sevenDay;
  var endTime = endTime || new Date();
  await this.db.getItemsInRange({
    tableName: 'log_detail_table',
    indexRange: {
      indexName: 'updateTime',
      upperIndex: endTime,
      upperExclusive: true,
      lowerIndex: starTime,
      lowerExclusive: true
    }
  }).then(res => {
    var str = '';
    var strArr = [];
    res.forEach(el => {
      str += `【${el.logCreateTime}】 ${el.type}日志  <--->  ${el.logString}\n`;
    });
    splitStr(str, strLength).forEach( item => {
      downFlie( item );
    })

  })
}
WebLog.prototype.deleteLog = async function deleteLog() {
  if (!this.db) {
    console.log('IndexedDB is supported: false');
    return;
  }
  await deleteDB(this.appid);
}

export default WebLog;