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
    constructor(type, id, parameters, netlist, parametereName) {
            this['type'] = type;
            this['id'] = id;
            this[parametereName] = parameters;
            this['netlist'] = netlist;
            // console.log("\nnew " + this['type'] + " device is created");
        }
        /**
         * check if the device is connected to a specific netlist node
         * @param {string} NetlistNodeID node to be checked
         * @returns connected or not connected
         */
    isConnectedWithNetlistNode(NetlistNodeID) {
        let keys = Object.keys(this['netlist']); // get the keys of the netlist
        for (var key of keys) {
            if (this['netlist'][key] == NetlistNodeID) {
                return true;
            }
        }
        return false;
    }
}

module.exports = {
    Component: Component
};