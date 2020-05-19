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
var db;
export function InitDb(dbConfig) {
  dbConfig = dbConfig || {};
  dbConfig.dbName = dbConfig.dbName;
  dbConfig.dbVersion = dbConfig.dbVersion || 1;
  dbConfig.duration = dbConfig.duration || 7 * 24 * 1000 * 3600; // 7天
  dbConfig.tableName = dbConfig.tableName; // 7天
  this.dbConfig = dbConfig;

  if (!idbIsSupported()) {
    console.log('IndexedDB is supported: false');
    return;
  }
  if (!dbConfig.tableName) {
    console.log('表名为空');
    return;
  }
  db = new CustomDB({
    dbName: dbConfig.dbName,
    dbVersion: dbConfig.dbVersion,
    itemDuration: dbConfig.duration,
    tables: {
      [dbConfig.tableName]: {
        indexList: [{
          indexName: 'logCreateTime',
          unique: false
        }, {
          indexName: 'logString',
          unique: false
        }],
        itemDuration: dbConfig.duration
      }
    }
  });
}
/**
 * @param { content } 写入内容
 */
// 写入日志
InitDb.prototype.log = function log(content) {
  db.addItems([{
    tableName: this.dbConfig.tableName,
    item: {
      logCreateTime: timeFormat(new Date()),
      logString: content + '\n'
    }
  }])
}
// 将日志下载到本地存为txt文件
/**
 * @param { starTime } 要取日志的开始时间 单位是ms
 * @param { endTime } 要取日志的结束时间 单位是ms
 */
InitDb.prototype.downloadLog = function downloadLog(starTime, endTime) {
  db.getItemsInRange({
    tableName: this.dbConfig.tableName,
    indexRange: {
      indexName: 'updateTime',
      upperIndex: starTime,
      upperExclusive: true,
      lowerIndex: endTime,
      lowerExclusive: true
    }
  }).then(res => {
    downFlie(res);
  })
}
InitDb.prototype.delDB = function delDB(dbName) {
  deleteDB(dbName);
}

export function delDB(dbName) {
  deleteDB(dbName);
}
export default {
  isSupportedDB: isSupportedDB,
  InitDb: InitDb,
  delDB: delDB,
};