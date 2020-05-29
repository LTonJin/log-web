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
| 方法          | 说明                |  类型  | 参数                                     |                    默认                     |
| ------------- | ------------------- | :----: | :--------------------------------------- | :-----------------------------------------: |
| log()         | 写入日志类型为log   | any | ('content') 可传多个参数                             |                      _                      |
| info()        | 写入日志类型为info  | any | ('content') 可传多个参数                               |                      _                      |
| warn()        | 写入日志类型为warn  | any | ('content') 可传多个参数                               |                      _                      |
| error()       | 写入日志类型为error | any | ('content') 可传多个参数                               |                      _                      |
| downloadLog() | 下载日志            | number | (startTime?, endTime?)传入为时间戳单位ms | startTime默认为7天前，endTime默认为当前时间 |
| deleteLog()   | 删去全部日志        |   -    | _                                        |                      _                      |