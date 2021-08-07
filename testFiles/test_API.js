var topologyAPI = require("../modules/API.js");
console.time();
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
var testSuccesseded = 0;
var testFailed = 0;

//! read JSON files
function test_readJSON() {
    if (api.readJSON('topology5.json') == null)
        testSuccesseded++;
    else {
        console.warn("Read non-existing file");
        testFailed++;
    }
    //===
    if (api.readJSON('topology1.json') != null)
        testSuccesseded++;
    else {
        console.warn("Can't Read JSON Files");
        testFailed++;
    }
    //===
    if (api.readJSON('topology1.json') != null)
        testSuccesseded++;
    else {
        console.warn("Failed to read ths same file twice");
        testFailed++;
    }
    //===
    if (api.readJSON('topology2.json') != null)
        testSuccesseded++;
    else {
        console.warn("Can't Read more than one file");
        testFailed++;
    }
}
//! queryTopologies
function test_queryTopologies() {
    var topologies = api.queryTopologies();
    if (topologies.length == 3)
        testSuccesseded++;
    else {
        console.warn("Can't Query Topologies");
        testFailed++;
    }
    //===
    if (JSON.stringify(topologies[0]) === JSON.stringify(top1))
        testSuccesseded++;
    else {
        console.warn("Topology wasn't parsed correctly");
        testFailed++;
    }
}
//! queryDevices
function test_queryDevices() {
    var devices = api.queryDevices('top2');
    if (devices.length == 3)
        testSuccesseded++;
    else {
        console.warn("Can't Query Devices");
        testFailed++;
    }
    //===
    if (devices[0]['type'] == "resistor" &&
        devices[1]['type'] == "resistor" &&
        devices[2]['type'] == "nmos"
    )
        testSuccesseded++;
    else {
        console.warn("Devices wasn't parsed correctly");
        testFailed++;
    }
}
//! write JSON
function test_writeJSON() {
    if (api.writeJSON('top1') == true)
        testSuccesseded++;
    else {
        console.warn("Failed to write Topology");
        testFailed++;
    }
    //===
    if (JSON.stringify(api.readJSON('top1.json')) === JSON.stringify(top1))
        testSuccesseded++;
    else {
        console.warn("JSON file was written incorrectly");
        testFailed++;
    }
}
//! queryDevicesWithNetlistNode
function test_queryDevicesWithNetlistNode() {
    if (api.queryDevicesWithNetlistNode('top1', 'n1').length == 2)
        testSuccesseded++;
    else {
        console.warn("Failed to queryDevicesWithNetlistNode");
        testFailed++;
    }
    //===
    if (api.queryDevicesWithNetlistNode('top2', 'vin').length == 1)
        testSuccesseded++;
    else {
        console.warn("Failed to queryDevicesWithNetlistNode");
        testFailed++;
    }
}
//! deleteTopology
function test_deleteTopology() {
    if (api.deleteTopology('top1') == true)
        testSuccesseded++;
    else {
        console.warn("Failed to delete Topology");
        testFailed++;
    }
    //===
    if (api.deleteTopology('top1') == true)
        testSuccesseded++;
    else {
        console.warn("Failed to delete Topology");
        testFailed++;
    }
}
console.log("\n===================TESTING API===================\n")
console.error = function() {}
test_readJSON();
test_queryTopologies();
test_queryDevices();
test_writeJSON();
test_queryDevicesWithNetlistNode();
test_deleteTopology();
console.timeEnd(); // prints time taken since the timer started
console.log(testSuccesseded + " test cases successeded out of " + (testSuccesseded + testFailed));
console.assert(testFailed == 0, testFailed + " test cases has FAILED!!! ");