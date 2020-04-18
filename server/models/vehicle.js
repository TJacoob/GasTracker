const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    owner: {
        type: String,
        required: true,
        immutable: true,
    },
    license: {
        type: String,
        required: true,
        immutable: true,
        // unique: true,
    },
    name:{
        type: String,
    },
    brand:{
        type: String,
    },
    model:{
        type: String,
    },
    year:{
        type: Number,
    },
    kilometers: {
        type: Number,
    },
    fuel:{
        type: String,
        allowedValues: ["Gasoline 95", "Gasoline 98", "Diesel"],
    },
    consumption:{
        type: Number,
    },
    /*
    refuels: {
        type: [String]
    }
    */
});

module.exports = Vehicle = mongoose.model("vehicles", VehicleSchema);

Vehicle.allowEdit = {
    //owner:0,
    //license:0,
    name:1,
    brand:1,
    model:1,
    year:1,
    //kilometers:0,
    //fuel:0,
    //consumption:0,
    //refuels:0;
};
