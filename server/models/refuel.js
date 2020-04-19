const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefuelSchema = new Schema({
    vehicle: {
        type: String,
        required: true,
        immutable: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
        immutable: true,
    },
    brand:{
        type: String,
        allowedValues: ["Galp", "BP", "Repsol", "Pingo Doce", "Jumbo", "Other"],
        required: true,
    },
    variety:{
        type: String,
        allowedValues: ["Regular", "Additive"],
        required: true,
    },
    price:{
        type: Number,
    },
    kilometers:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    }
});

module.exports = Refuel = mongoose.model("refuels", RefuelSchema);

Refuel.allowEdit = {
    //vehicle:0,
    //date:0,
    //license:0,
    //brand:0,
    //variety:0,
    //price:0,
    //kilometers:0,
    //quantity:0,
};
