/**
 * This class represnts the devices or the components of the topology with all its properties 
 */
class Component {
    /**
     * intializing class
     * @param {string} type the type of the device or component
     * @param {string} id the id of the device or component
     * @param {string} parameters any parameters such as values and the limits
     * @param {string} netlist the netlist of the device -nodes-
     */
    constructor(type, id, parameters, netlist) {
            this.id = id;
            this.type = type;
            this.parameters = parameters;
            this.netlist = netlist;
            console.log("\nnew " + this.type + " device is created");
        }
        /**
         * display the data for the sake of testing and debugging
         */
    displayData() {
            console.log('type: ' + this.type);
            console.log('id: ' + this.id);
            console.log('parameters: ' + this.parameters);
            console.log('netlist: ' + this.netlist);
        }
        /**
         * check if the device is connected to a specific netlist node
         * @param {string} NetlistNodeID node to be checked
         * @returns connected or not connected
         */
    isConnectedWithNetlistNode(NetlistNodeID) {
        let keys = Object.keys(this.netlist); // get the keys of the netlist
        for (var key of keys) {
            if (this.netlist[key] == NetlistNodeID) {
                return true;
            }
        }
        return false;
    }
}
//============
/**
 * the topology class that holds the circuit
 */
class Topology {
    /**
     * intializing class
     * @param {class} id of the topology
     * @param {class} JSONcomponents the devices and components of the circuit
     */
    constructor(id, JSONcomponents) {
            console.log("\nnew topology: " + id + " is created");
            this.id = id;
            this.components = []
            this.setComponents(JSONcomponents);
        }
        /**
         * display the data for the sake of testing and debugging
         */
    displayData() {
            console.log('id: ' + this.id + "\nComponents:");
            for (var device of this.components) {
                device.displayData();
                console.log("\n");
            }
            console.log("===========");
        }
        /**
         * setting the devices from the JSON file
         * @param {string} JSONcomponents 
         */
    setComponents(JSONcomponents) {
            for (var device of JSONcomponents) {
                let keys = Object.keys(device);
                this.components.push(new Component(
                    device['type'],
                    device['id'],
                    device[keys.filter(key => key != 'type' && key != 'id' && key != 'netlist')],
                    device['netlist']))
            }
        }
        /**
         * 
         * @returns all the devices of the topology
         */
    queryDevices() {
        return this.components;
    }

}
//============
/**
 * The API Class
 */
class API {
    /**
     * just a constructor 
     */
    constructor() {
            console.log("API CREATED\n");
            this.topologies = [];
        }
        /**
         * read JSON file and extract toplogy from it
         * @param {string} filePath path of the JSON file
         * @returns 
         */
    readJSON(filePath) {
            try {
                var fs = require('fs'); // The fs module enables interacting with the file system
                let inputJSON = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                // create the topology
                this.topologies.push(new Topology(inputJSON['id'], inputJSON['components']));
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }

        }
        /**
         * 
         * @returns all the topologies read by the  API
         */
    getToplogyByID(TopologyID) {
            try {
                let requiredToplogy = this.topologies.filter(topology => topology['id'] == TopologyID);
                if (requiredToplogy.length == 0) {
                    console.log("Topology " + TopologyID + " not found, ");
                    return null;
                } else {
                    return requiredToplogy;
                }
            } catch (err) {
                console.log(err);
                return null;
            }

        }
        /**
         * 
         * @returns all the topologies read by the API
         */
    queryTopologies() {
            return this.topologies
        }
        /**
         * return all the devices in the topologies read by the API
         * @param {string} TopologyID the ID of the required toplogy
         * @returns list of devices in that topology and an empty one if the toplogy wasn't found
         */
    queryDevices(TopologyID) {
            var requiredToplogy;
            try {
                requiredToplogy = this.topologies.filter(topology => topology['id'] == TopologyID)[0]; // as the filter method return an array
                if (requiredToplogy.length == 0) {
                    console.log("Topology " + TopologyID + " not found, ");
                    return [];
                }
            } catch (err) {
                console.log(err);
                return [];
            } finally {
                return requiredToplogy.queryDevices();
            }
        }
        /**
         * write the topology to a JSON file
         * @param {*} TopologyID 
         * @returns whether it managed to write it or failed to do so
         */
    writeJSON(TopologyID) {
            try {
                // check for the topology existence
                let requiredToplogy = this.getToplogyByID(TopologyID);
                if (requiredToplogy == null) {
                    return false;
                }
                // stringify the topology
                let topologyString = JSON.stringify(requiredToplogy[0]);
                var fs = require('fs');
                fs.writeFileSync(TopologyID + '.json', topologyString);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
        /**
         * delete the passes topology 
         * @param {*} TopologyID 
         * @returns whether it managed to delete it or failed to do so
         */
    deleteTopology(TopologyID) {
            try {
                this.topologies = this.topologies.filter(topology => topology['id'] != TopologyID);
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }

        }
        /**
         * return all the devices connecte with the passed NetlistNodeID
         * @param {string} TopologyID 
         * @param {string} NetlistNodeID 
         * @returns array of the connected devices to this node
         */
    queryDevicesWithNetlistNode(TopologyID, NetlistNodeID) {
        let requiredDevices = [];
        try {
            // get the required topology
            let requiredToplogy = this.getToplogyByID(TopologyID);
            if (requiredToplogy == null) {
                return requiredDevices;
            }
            // get the devices in this topology
            let devices = this.queryDevices(requiredToplogy[0]['id']);
            // iterate over the devices 
            for (var device of devices) {
                if (device.isConnectedWithNetlistNode(NetlistNodeID) == true) {
                    requiredDevices.push(device);
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            return requiredDevices;

        }
    }
}
//=========================================================================
/**
 * utility function to displayData
 * @param {array} obj to be displayed
 */
function displayData(obj) {
    for (var element of obj)
        element.displayData();
}
//=========================================================================
//! create API
api = new API();
//! read JSON files
console.log(api.readJSON('topology1.json'));
console.log(api.readJSON('topology2.json'));
//! queryTopologies
var topos = api.queryTopologies();
displayData(topos);
//! queryDevices
var devices1 = api.queryDevices('top1');
displayData(devices1);
console.log("===");
var devices2 = api.queryDevices('top2');
displayData(devices2);
//! deleteTopology
console.log(api.deleteTopology('top1'));
console.log(api.deleteTopology('top2'));
//! write JSON
console.log(api.writeJSON('top1'));
console.log(api.writeJSON('top2'));
//! queryDevicesWithNetlistNode
console.log(api.queryDevicesWithNetlistNode('top1', 'n1').length == 2);
console.log(api.queryDevicesWithNetlistNode('top2', 'n2').length == 2);
console.log(api.queryDevicesWithNetlistNode('top2', 'vin').length == 1);
console.log("\n================================================\n")