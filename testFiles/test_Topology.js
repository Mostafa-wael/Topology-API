var moduleTopology = require("../modules/Topology.js");
console.time();
//================================================================
var top = {
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
topology = new moduleTopology.Topology(top['id'], top['components'])
var testSuccesseded = 0;
var testFailed = 0;

function test_setTopology() {
    if (Object.keys(topology).length == 2)
        testSuccesseded++;
    else {
        console.warn("Failed to set the topology keys properly");
        testFailed++;
    }
    //===
    if (JSON.stringify(topology) == JSON.stringify(top))
        testSuccesseded++;
    else {
        console.warn("Failed to set the topology data properly");
        testFailed++;
    }
}

console.log("\n===================TESTING Topology===================\n")
console.error = function() {}
test_setTopology();
console.timeEnd(); // prints time taken since the timer started
console.log(testSuccesseded + " test cases sucesseded out of " + (testSuccesseded + testFailed));
console.assert(testFailed == 0, testFailed + " test cases has FAILED!!! ");