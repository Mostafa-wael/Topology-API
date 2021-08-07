var moduleComponent = require("../modules/Component.js");
console.time();
//================================================================
var device = {
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
};
//================================================================
let parametersName = Object.keys(device).filter(key => key != 'type' && key != 'id' && key != 'netlist');
component = new moduleComponent.Component(
    device['type'],
    device['id'],
    device[parametersName],
    device['netlist'],
    parametersName
);
var testSuccesseded = 0;
var testFailed = 0;

function test_setDevices() {
    if (Object.keys(component).length == 4)
        testSuccesseded++;
    else {
        console.warn("Failed to set the device keys properly");
        testFailed++;
    }
    //===
    if (JSON.stringify(device) == JSON.stringify(component))
        testSuccesseded++;
    else {
        console.warn("Failed to set devices correctly");
        testFailed++;
    }
}

function test_isConnectedWithNetlistNode() {
    if (component.isConnectedWithNetlistNode('n1'))
        testSuccesseded++;
    else {
        console.warn("Failed to detect connections n1");
        testFailed++;
    }
    //===
    if (component.isConnectedWithNetlistNode('vin'))
        testSuccesseded++;
    else {
        console.warn("Failed to detect connections vin");
        testFailed++;
    }
    //===
    if (component.isConnectedWithNetlistNode('vss'))
        testSuccesseded++;
    else {
        console.warn("can't detect connections");
        testFailed++;
    }

}

console.log("\n===================TESTING COMPONENT===================\n")
console.error = function() {}
test_setDevices();
test_isConnectedWithNetlistNode();
console.timeEnd(); // prints time taken since the timer started
console.log(testSuccesseded + " test cases sucesseded out of " + (testSuccesseded + testFailed));
console.assert(testFailed == 0, testFailed + " test cases has FAILED!!! ");