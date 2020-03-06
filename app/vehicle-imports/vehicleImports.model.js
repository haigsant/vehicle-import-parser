// const sqlite3 = require("sqlite3");

const REQUIRED_FIELDS = {
  uuid: true,
  vin: true,
  make: true,
  model: true,
  mileage: true,
  year: true,
  price: true,
  zip_code: true,
  create_date: true,
  update_date: true
};

class VehicleImportsModel {
  constructor(importFile) {
    this.importFile = importFile;
  }

  vehicleImportsModel() {
    if (!this.importFile || !this.importFile.length) {
      throw Error("No Import File for vehicleImportsModel");
    }
    const returnFile = [];

    this.importFile.forEach(vehicle => {
      let newVehicle = {};
      for (let field in vehicle) {
        if (REQUIRED_FIELDS[field]) {
          newVehicle[field] = vehicle[field];
        }
      }
      returnFile.push(newVehicle);
    });

    return returnFile;
  }
}

module.exports = VehicleImportsModel;
