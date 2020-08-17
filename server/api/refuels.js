//const UserService =require("../services/user-service") ;
const VehicleService =require("../services/vehicle-service") ;
const RefuelService =require("../services/refuels-service") ;
const { Router } = require('express');
const { refuelValidationRules } = require('../validations/refuel');
const { authRequest } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = Router();

// @route GET api/refuels/_:license
// @params [auth-token]
// @desc Get Refuels for a Specific Vehicle
// @access Logged Users
router.get("/_:license",
    authRequest,
    async (req, res) => {

        let reply = await VehicleService.GetUserVehicle(req.username,req.params.license);
        if ( !reply.success)
            return reply;

        reply = await RefuelService.GetRefuels(reply.vehicle);
        return res.json(reply);
    }
);


// @route GET api/refuels/_:license/latest
// @params [auth-token]
// @desc Get Latest Refuel for a specific vehicle
// @access Logged Users
router.get("/_:license/latest",
    authRequest,
    async (req, res) => {

        let reply = await VehicleService.GetUserVehicle(req.username,req.params.license);
        if ( !reply.success)
            return reply;

        //console.log(reply);

        reply = await RefuelService.GetLatestRefuel(reply.vehicle);
        return res.json(reply);
    }
);

// @route POST api/refuels/_:license/add
// @params [auth-token]
// @desc Add Refuel for a Specific Vehicle
// @access Logged Users
router.post("/_:license/add",
    authRequest,
    refuelValidationRules(),
    validate,
    async (req, res) => {

        let formData = req.body;
        formData.username = req.username;

        let vehicle = await VehicleService.GetUserVehicle(req.username,req.params.license);
        if ( !vehicle.success)
            return vehicle;

        let refuel = await RefuelService.AddRefuel(formData,vehicle.vehicle);
        if (!refuel.success)
            return refuel;

        let refuelsHistory = await RefuelService.GetRefuels(vehicle.vehicle);
        if ( !refuelsHistory.success)
            return refuelsHistory;

        let consumption = await VehicleService.AddRefuel(vehicle.vehicle,refuel.refuel, refuelsHistory.refuels);
        if ( !consumption.success)
            return consumption;

        return res.json(consumption);

    }
);


module.exports = router;
