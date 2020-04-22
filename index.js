/*
 * @Descritption: 入口文件
 * @Author: wucf
 * @Date: 2020-04-21 22:01:46
 * @LastEditors: wucf
 * @LastEditTime: 2020-04-22 14:13:42
 */

const xlsx = require("node-xlsx");
const fs = require("fs");
const sheets = xlsx.parse("./AMap_adcode_citycode_2020_4_10 2.xlsx");

let areas = sheets[0].data;
let currentCode = "";

// 去掉前两行和最后一行
areas.shift();
areas.shift();
areas.pop();

let result = "[";
while ((currentArea = areas.shift())) {
  if (currentArea[2] !== currentCode) {
    currentCode = currentArea[2];
    let lineStart = result === "[" ? "\r\n" : ",\r\n";
    result =
      result +
      `${lineStart} { "cityname" : "${currentArea[0]}", "adcode": "${currentArea[1]}", "citycode": "${currentArea[2]}"}`;
  }
}
result = result + "\r\n]";

fs.writeFile("./assets/city.json", result, function (err) {
  console.log(err);
});
