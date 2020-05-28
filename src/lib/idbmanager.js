import {
  idbIsSupported,
  CustomDB,
  deleteDB
} from 'idb-managed';
import { timeFormat, downFlie } from "./utils";
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
export function WebLog(appid) {
  if (!idbIsSupported()) {
    console.log('IndexedDB is supported: false');
    return;
  }
  this.appid = appid;
  this.db = new CustomDB({
    dbName: appid,
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
 * @param { content } 写入内容
 */
// 写入日志
WebLog.prototype.log = async function (content) {
  if (!this.db) {
    console.log('IndexedDB is supported: false');
    return;
  }
  if (!content) {
    return;
  }
  await this.db.addItems([{
    tableName: 'log_detail_table',
    item: {
      logCreateTime: timeFormat(new Date()),
      type: 'log',
      logString: content
    }
  }])
}
WebLog.prototype.info = async function (content) {
  if (!this.db) {
    console.log('IndexedDB is supported: false');
    return;
  }
  if (!content) {
    return;
  }
  await this.db.addItems([{
    tableName: 'log_detail_table',
    item: {
      logCreateTime: timeFormat(new Date()),
      type: 'info',
      logString: content
    }
  }])
}
WebLog.prototype.warn = async function (content) {
  if (!this.db) {
    console.log('IndexedDB is supported: false');
    return;
  }
  if (!content) {
    return;
  }
  await this.db.addItems([{
    tableName: 'log_detail_table',
    item: {
      logCreateTime: timeFormat(new Date()),
      type: 'warn',
      logString: content
    }
  }])
}
WebLog.prototype.error = async function (content) {
  if (!this.db) {
    console.log('IndexedDB is supported: false');
    return;
  }
  if (!content) {
    return;
  }
  await this.db.addItems([{
    tableName: 'log_detail_table',
    item: {
      logCreateTime: timeFormat(new Date()),
      type: 'error',
      logString: content
    }
  }])
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
  var starTime = starTime || new Date();
  var endTime = endTime || new Date() - sevenDay;
  await this.db.getItemsInRange({
    tableName: 'log_detail_table',
    indexRange: {
      indexName: 'updateTime',
      upperIndex: starTime,
      upperExclusive: true,
      lowerIndex: endTime,
      lowerExclusive: true
    }
  }).then(res => {
    var str = '';
    res.forEach(el => {
      str += `【${el.logCreateTime}】 ${el.type}日志 ${JSON.stringify(el.logString)}\n`;
    });
    downFlie(str);
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