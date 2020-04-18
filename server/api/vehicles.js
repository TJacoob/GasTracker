//const UserService =require("../services/user-service") ;
const VehicleService =require("../services/vehicle-service") ;
const { Router } = require('express');
const { vehicleValidationRules, vehicleExists } = require('../validations/vehicle');
const { authRequest } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = Router();

// @route GET api/vehicles/own/
// @params [auth-token]
// @desc Get Logged User Vehicles
// @access Logged Users
router.get("/own",
    authRequest,
    async (req, res) => {
        const reply = await VehicleService.GetUserVehicles(req.username);
        return res.json(reply);
    }
);

// @route POST api/vehicles/add/
// @params [auth-token]
// @desc Create Vehicle for the Logged User
// @access Logged Users
router.post("/add",
    authRequest,
    vehicleValidationRules(),
    validate,
    vehicleExists,
    async (req, res) => {

        let formData = req.body;
        formData.username = req.username;
        const reply = await VehicleService.CreateVehicle(formData);
        return res.json(reply);

    }
);

// @route GET api/vehicles/_:license
// @params [auth-token]
// @desc Get the requested vehicle from the logged user
// @access Logged Users
router.get("/_:license",
    authRequest,
    //isOwner,
    async (req, res) => {

        const reply = await VehicleService.GetUserVehicle(req.username,req.params.license);
        return res.json(reply);

    }
);


// @route POST api/vehicles/_:license/edit
// @params [auth-token]
// @desc Edit the vehicle of the logged user
// @access Logged Users
router.post("/_:license/edit",
    authRequest,
    //isOwner,
    async (req, res) => {

        let reply = await VehicleService.GetUserVehicle(req.username,req.params.license);
        console.log(reply);
        if (!reply.success)
            return res.json(reply)

        reply = await VehicleService.EditVehicle(req.body, reply.vehicle);
        console.log(reply);
        return res.json(reply);

    }
);

module.exports = router;
