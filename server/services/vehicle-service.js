const Vehicle = require('../models/vehicle');

class VehicleService{

    static async CreateVehicle(formData) {

        try{
            let vehicle = await new Vehicle({
                owner: formData.username,
                license: formData.license.toLowerCase(),
                name: formData.name,
                brand: formData.brand,
                model: formData.model,
                year: formData.year,
                fuel: formData.fuel,
                kilometers: formData.kilometers,
                consumption: 0,
                //refuels: [],
            });

            return await vehicle
                .save()
                .then(function () {
                    return { success:true, vehicle: vehicle };
                });


        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async EditVehicle(formData, vehicle) {
        try{

            // Clean uneditable fields submitted in the Form
            for ( let field in formData ){ if (Vehicle.allowEdit[field] === undefined) delete formData[field]; }

            let newVehicle = vehicle;
            Object.assign(newVehicle, formData );

            return await newVehicle.save()
                .then( vehicle => { return { success: true, vehicle: vehicle} } )
                .catch( err => { return { success: false, error: err} } )

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async GetUserVehicles(username) {
        try{
            let vehicles = await Vehicle.find({ owner:username }).then(vehicles => {
                if (vehicles) {
                    return { 'success':true, 'vehicles': vehicles }
                }
                else return { 'success':false, 'error': 'Could not vehicles for this user' }
            });

            return vehicles;

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async GetUserVehicle(username, license) {
        try{
            let vehicle = await Vehicle.findOne({ $and:[{owner:username},{license:license}] }).then(vehicle => {
                if (vehicle) {
                    return { 'success':true, 'vehicle': vehicle }
                }
                else return { 'success':false, 'error': 'Could not find the vehicle you requested' }
            });

            return vehicle;

        } catch (err) { return { 'success':false, 'error': err } }
    }

};


module.exports = VehicleService;
