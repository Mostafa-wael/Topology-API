var moduleAPI = require("./modules/API.js");

console.log("I'm app.js");


//! create API
api = new moduleAPI.API();
//! read JSON files
console.log(api.readJSON('topology1.json'));
console.log(api.readJSON('topology2.json'));
//! queryTopologies
var topologies = api.queryTopologies();
moduleAPI.displayData(topologies);
//! queryDevices
var devices1 = api.queryDevices('top1');
moduleAPI.displayData(devices1);
console.log("===");
var devices2 = api.queryDevices('top2');
moduleAPI.displayData(devices2);
//! deleteTopology
// console.log(api.deleteTopology('top1'));
// console.log(api.deleteTopology('top2'));
//! write JSON
console.log(api.writeJSON('top1'));
console.log(api.writeJSON('top2'));
//! queryDevicesWithNetlistNode
console.log(api.queryDevicesWithNetlistNode('top1', 'n1').length == 2);
console.log(api.queryDevicesWithNetlistNode('top2', 'n2').length == 2);
console.log(api.queryDevicesWithNetlistNode('top2', 'vin').length == 1);
console.log("\n================================================\n")