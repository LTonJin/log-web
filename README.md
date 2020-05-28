```
// 使用示例
import { LogWeb } from "log-web";

// 初始化logweb  appid可随意命名，用于区分不同项目
var logan = new LogWeb('appid');

// 写入日志
logan.log('Hello World')
// 删除数据库
// db.deleteLog()
// 下载日志
// db.downloadLog();
```
| 方法                             | 说明                |  类型  |                   参数                   |     默认     |
| -------------------------------- | ------------------- | :----: | :--------------------------------------: | :----------: |
| log('content')                   | 写入日志类型为log   | String |                 写入内容                 |      _       |
| info('content')                  | 写入日志类型为info  | String |                 写入内容                 |      _       |
| warn('content')                  | 写入日志类型为warn  | String |                 写入内容                 |      _       |
| error('content')                 | 写入日志类型为error | String |                 写入内容                 |      _       |
| downloadLog( startTime, endTime) | 下载日志            | Number | 开始时间，和结束时间，传入为时间戳单位ms | 下载全部日志 |
| deleteLog()                      | 删去全部日志        |   -    |                    _                     |      _       |