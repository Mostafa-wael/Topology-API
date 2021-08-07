var topologyAPI = require("./modules/API.js");
console.error = function() {}
    //================================================================
var top1 = {
    "id": "top1",
    "components": [{
            "type": "resistor",
            "id": "res1",
            "resistance": {
                "default": 100,
                "min": 10,
                "max": 1000
            },
            "netlist": {
                "t1": "vdd",
                "t2": "n1"
            }
        },
        {
            "type": "nmos",
            "id": "m1",
            "m(l)": {
                "deafult": 1.5,
                "min": 1,
                "max": 2
            },
            "netlist": {
                "drain": "n1",
                "gate": "vin",
                "source": "vss"
            }
        }
    ]
};
//================================================================
//! create API
api = new topologyAPI.API()
console.assert(api, "Can't Create API");
//! read JSON files
console.assert(api.readJSON('topology5.json') == null, "Read non-existing file");
console.assert(api.readJSON('topology1.json') != null, "Can't Read JSON Files");
console.assert(api.readJSON('topology1.json') != null, "Failed to read ths same file twice");
//! queryTopologies
var topologies = api.queryTopologies();
console.assert(topologies.length == 2, "Can't Query Topologies"); // topology was read twice
console.assert(
    JSON.stringify(topologies[0]) === JSON.stringify(top1),
    "Topology wasn't parsed correctly");
//! queryDevices
var devices = api.queryDevices('top1');
console.assert(devices.length == 2, "Can't Query Devices");
console.assert(
    devices[0]['type'] == "resistor" &&
    devices[1]['type'] == "nmos",
    "Devices wasn't parsed correctly");
//! write JSON
console.assert(api.writeJSON('top1') == true, "Failed to write Topology");
console.assert(JSON.stringify(api.readJSON('top1.json')) === JSON.stringify(top1), "JSON file was written incorrectly");
//! queryDevicesWithNetlistNode
console.assert(api.queryDevicesWithNetlistNode('top1', 'n1').length == 2, "Failed to queryDevicesWithNetlistNode");
//! deleteTopology
console.assert(api.deleteTopology('top1') == true, "Failed to delete Topology");
console.assert(api.queryTopologies().length == 0, "Failed to delete Topology");
console.log("\n================================================\n")