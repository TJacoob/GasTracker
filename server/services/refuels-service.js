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
            let refuels = await Refuel.find({ vehicle:vehicle.id }).then(refuels => {
                if (refuels) {
                    return { 'success':true, 'refuels': refuels }
                }
                else return { 'success':false, 'error': 'Could not find the refuel for the vehicle you requested' }
            });

            return refuels;

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async GetLatestRefuel(vehicle) {
        try{
            let refuel = await Refuel.find({ vehicle:vehicle.id }).sort({_id:-1}).limit(1).then(refuel => {
                if (refuel[0]) {
                    return { 'success':true, 'refuel': refuel[0] }
                }
                else return { 'success':false, 'error': 'Could not find the refuel for the vehicle you requested' }
            });

            console.log(refuel);
            return refuel;

        } catch (err) { return { 'success':false, 'error': err } }
    }


};


module.exports = RefuelService;
