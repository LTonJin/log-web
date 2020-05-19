```
// 使用示例
import { InitDB } from "log-web";

var dbConfig = {
  dbName: 'LOG_IDB_MANAGER_DB',
  tableName: 'log_detail_table',
};

var db = new InitDB(dbConfig);
db.log('Hello World')
// db.delDB(dbConfig.dbName)
// db.downloadLog(Number(new Date(), new Date() - 24 * 1000 * 3600 ));
```
