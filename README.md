```
// 使用示例
import { InitDB } from "log-web";

var dbConfig = {
  dbName: 'LOG_IDB_MANAGER_DB',
  tableName: 'log_detail_table',
};

// 初始化数据库
var db = new InitDB(dbConfig);
// 写入日志
db.log('Hello World')
// 删除数据库
// db.delDB(dbConfig.dbName)
// 下载日志
// db.downloadLog(Number(new Date(), new Date() - 24 * 1000 * 3600 ));
```
