var moduleTopology = require("./Topology.js");

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
         * read JSON file, extract toplogy from it and save it to the memory
         * in case the topology name exists, it adds a new one, it doesn't overwrite it to avoid any loss of data and delation depends on the usre prefernces
         * @param {string} filePath path of the JSON file
         * @returns 
         */
    readJSON(filePath) {
            let inputJSON;
            try {
                var fs = require('fs'); // The fs module enables interacting with the file system
                inputJSON = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            } catch (err) { // error in reading the file or parsing the file
                console.error(err);
                return null;
            }
            // create the topology
            try {
                this.topologies.push(new moduleTopology.Topology(inputJSON['id'], inputJSON['components']));
                return inputJSON;
            } catch (err) {
                console.error(err);
                return null;
            }
        }
        /**
         * 
         * @returns all the topologies read by the  API with the passed ID, in case of many topologies, it return the first topology
         */
    getToplogyByID(TopologyID) {
            try {
                let requiredToplogy = this.topologies.filter(topology => topology['id'] == TopologyID);
                if (requiredToplogy.length == 0) {
                    console.log("Topology " + TopologyID + " not found, ");
                    return null;
                } else {
                    return requiredToplogy[0];
                }
            } catch (err) {
                console.error(err);
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
                requiredToplogy = this.topologies.filter(topology => topology['id'] == TopologyID); // as the filter method return an array
                if (requiredToplogy.length == 0) {
                    console.log("Topology " + TopologyID + " not found, ");
                    return [];
                } else {

                    return requiredToplogy[0].queryDevices();
                }
            } catch (err) {
                console.error(err);
                return [];
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
                let topologyString = JSON.stringify(requiredToplogy);
                var fs = require('fs');
                fs.writeFileSync(TopologyID + '.json', topologyString);
                return true;
            } catch (err) {
                console.error(err);
                return false;
            }
        }
        /**
         * delete the passed topology and all its copies, if the topology doesn't exist, it do nothing
         * @param {*} TopologyID 
         * @returns whether it managed to delete it or failed to do so
         */
    deleteTopology(TopologyID) {
            try {
                this.topologies = this.topologies.filter(topology => topology['id'] != TopologyID);
                return true;
            } catch (err) {
                console.error(err);
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
            let devices = this.queryDevices(requiredToplogy['id']);
            // iterate over the devices 
            for (var device of devices) {
                if (device.isConnectedWithNetlistNode(NetlistNodeID) == true) {
                    requiredDevices.push(device);
                }
            }
        } catch (err) {
            console.error(err);
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
    // check if obj is iterable -> checks for null, undefined and iterablity
    if (obj == null || typeof obj[Symbol.iterator] != 'function')
        return;
    // display data
    for (var element of obj)
        console.log(element);
}

module.exports = {
    API: API,
    displayData
};