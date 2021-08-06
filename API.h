Result readJSON(FileName);
Result writeJSON(TopologyID);
TopologyList queryTopologies();
Result deleteTopology(TopologyID);
DeviceList queryDevices(TopologyID);
DeviceList queryDevicesWithNetlistNode(TopologyID, NetlistNodeID);