class Component {
    constructor(type, id, parameters, netlist) {
        this.id = id;
        this.type = type;
        this.parameters = parameters;
        this.netlist = netlist;
        console.log("\nnew " + this.type + " device is created");
        // this.displayData();
    }
    displayData() {
        console.log('type: ' + this.type);
        console.log('id: ' + this.id);
        console.log('parameters: ' + this.parameters);
        console.log('netlist: ' + this.netlist);
    }
}
//============
class Topology {
    constructor(id, JSONcomponents) {
        console.log("\nnew topology: " + id + " is created");
        this.id = id;
        this.components = []
        this.setComponents(JSONcomponents);
        // this.displayData();
    }

    setComponents(JSONcomponents) {
        for (var i = 0; i < JSONcomponents.length; i++) {
            let keys = Object.keys(JSONcomponents[i]);
            this.components[i] = new Component(
                JSONcomponents[i]['type'],
                JSONcomponents[i]['id'],
                JSONcomponents[i][keys.filter(key => key != 'type' && key != 'id' && key != 'netlist')],
                JSONcomponents[i]['netlist'])
        }
    }
    getComponents() {
        return this.components;
    }

    displayData() {
        console.log('id: ' + this.id + "\nComponents:");
        for (var i = 0; i < this.components.length; i++) {
            this.components[i].displayData();
            console.log("\n");
        }
        console.log("===========");
    }


}
//============
class API {
    constructor() {
        console.log("API CREATED\n");
        this.topologies = [];
    }
    readJSON(filePath) {
        try {
            var fs = require('fs');
            let inputJSON = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            this.topologies.push(new Topology(inputJSON['id'], inputJSON['components']));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    }
    queryTopologies() {
        return this.topologies
    }
    queryDevices(TopologyID) {
        let top = this.topologies.filter(topology => topology['id'] == TopologyID);
        // console.log(top)
        if (top.length == 0) {
            console.log("Topology " + TopologyID + " not found, ");
            return [];
        }
        return top[0].getComponents();
    }
    writeJSON(TopologyID) {
        var fs = require('fs');
        let top = this.topologies.filter(topology => topology['id'] == TopologyID);
        console.log(top)
        if (top.length == 0) {
            console.log("Topology " + TopologyID + " not found, ");
            return false;
        }
        console.log(top[0]['id']);
        let topString = JSON.stringify(top[0]);
        console.log(topString);
        fs.writeFileSync(tTopologyID + '.json', topString);
        return true;

    }
}
//=========================================================================
function displayData(obj) {
    for (var i = 0; i < obj.length; i++)
        obj[i].displayData();
}
//=========================================================================
// create API
api = new API();
// read JSON files
console.log(api.readJSON('topology1.json'));
console.log(api.readJSON('topology2.json'));
// queryTopologies
var topos = api.queryTopologies();
displayData(topos);
// queryDevices
var devices1 = api.queryDevices('top1');
displayData(devices1);
console.log("===");
var devices2 = api.queryDevices('top2');
displayData(devices2);



// api.writeJSON('top1');
// api.writeJSON('top2');
console.log("\n================================================\n")