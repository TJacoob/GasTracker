const Refuel = require('../models/refuel');

class RefuelService{

    static async AddRefuel(formData, vehicle) {

        try{
            let refuel = await new Refuel({
                vehicle: vehicle.id,
                date: new Date(),
                brand: formData.brand,
                variety: formData.variety,
                price: formData.price,
                quantity: formData.quantity,
                kilometers: formData.kilometers,
            });

            return await refuel
                .save()
                .then(function () {
                    return { success:true, refuel: refuel };
                });

            // TODO: Calculate new consumption for the vehicle

        } catch (err) { return { 'success':false, 'error': err } }
    }
    
    static async GetRefuels(vehicle) {
        try{
            console.log(vehicle);
            let refuels = await Refuel.find({ vehicle:vehicle.id }).then(refuels => {
                if (refuels) {
                    console.log(refuels);
                    return { 'success':true, 'refuels': refuels }
                }
                else return { 'success':false, 'error': 'Could not find the refuel for the vehicle you requested' }
            });

            return refuels;

        } catch (err) { return { 'success':false, 'error': err } }
    }

};


module.exports = RefuelService;
