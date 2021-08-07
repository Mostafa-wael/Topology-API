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
                this.components.push(new moduleComponent.Component(
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

module.exports = {
    Topology: Topology
};

console.log("I'm a Topology");