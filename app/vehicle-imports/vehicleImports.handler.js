const { csvToJson, storeData } = require("../common/helpers");
const VehicleImports = require("./vehicleImports.model");

const uploadProviderInventory = async (provider, filePath) => {
  try {
    const formatProvider = provider.replace(/\W+/g, "-").toLowerCase();

    const json = csvToJson(filePath);
    const filteredJson = new VehicleImports(json).vehicleImportsModel();
    const filename = `/conversion/${formatProvider}_${Date.now()}.json`;

    storeData(filteredJson, filename);
  } catch (error) {
    throw Error("Problem with uploadProviderInventory handler", error);
  }
};

module.exports = { uploadProviderInventory };
