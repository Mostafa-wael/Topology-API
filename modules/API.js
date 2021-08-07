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
         * read JSON file and extract toplogy from it
         * @param {string} filePath path of the JSON file
         * @returns 
         */
    readJSON(filePath) {
            try {
                var fs = require('fs'); // The fs module enables interacting with the file system
                let inputJSON = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                // create the topology
                this.topologies.push(new moduleTopology.Topology(inputJSON['id'], inputJSON['components']));
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

module.exports = {
    API: API,
    displayData
};

console.log("I'm an API");