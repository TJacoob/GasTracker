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

        console.log(reply);

        reply = await RefuelService.GetRefuels(reply.vehicle);
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

        let reply = await VehicleService.GetUserVehicle(req.username,req.params.license);
        if ( !reply.success)
            return reply;

        reply = await RefuelService.AddRefuel(formData,reply.vehicle);
        return res.json(reply);

    }
);


module.exports = router;
