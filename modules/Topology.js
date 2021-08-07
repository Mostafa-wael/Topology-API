var moduleComponent = require("./Component.js");

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
            // console.log("\nnew topology named " + id + " is created");
            this.id = id;
            this.components = []
            this.setComponents(JSONcomponents);
        }
        /**
         * setting the devices from the JSON file
         * @param {string} JSONcomponents 
         */
    setComponents(JSONcomponents) {
            this.components = [];
            for (var device of JSONcomponents) {
                try {

                    // get the keys of the netlist then, extract the parametersName
                    let parametersName = Object.keys(device).filter(key => key != 'type' && key != 'id' && key != 'netlist');
                    this.components.push(new moduleComponent.Component(
                        device['type'],
                        device['id'],
                        device[parametersName],
                        device['netlist'],
                        parametersName
                    ))
                } catch (e) {
                    console.log(e);
                    throw "missing keys in the device";
                }
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

module.exports = {
    Topology: Topology
};