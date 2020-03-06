// Common helpers
const convertCsvToJson = require("convert-csv-to-json");
const fs = require("fs");
const path = require("path");

const csvToJson = filePath => {
  try {
    return convertCsvToJson.fieldDelimiter(",").getJsonFromCsv(filePath);
  } catch (error) {
    throw Error("Problem with csvToJson", error);
  }
};

const storeData = (data, filename) => {
  try {
    fs.writeFileSync(path.join(process.cwd(), filename), JSON.stringify(data));
  } catch (error) {
    throw Error("Problem with storeData", error);
  }
};

module.exports = { csvToJson, storeData };
