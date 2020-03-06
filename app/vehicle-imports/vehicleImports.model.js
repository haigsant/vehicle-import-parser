// REQUIRED_FIELDS would be saved and read from a persistent data source
// allowing for upates to required fields without a code deploy
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

// Did not have to create a class for this project, but a class will be good
// especially if inheriting validation from a base model class
class VehicleImportsModel {
  constructor(importFile) {
    this.importFile = importFile;
  }

  vehicleImportsModel() {
    if (!this.importFile || !this.importFile.length) {
      throw Error("No Import File for vehicleImportsModel");
    }
    const returnFile = [];

    // Iterate over each vehicle and each field
    // look up in real time if the field is required
    // return only the required fields
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
