//const UserService =require("../services/user-service") ;
const ProfileService =require("../services/profile-service") ;
const VehicleService =require("../services/vehicle-service") ;
const { Router } = require('express');
const { profileValidationRules, getProfile } = require('../validations/profile');
const { authRequest } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = Router();

// @route GET api/profiles/own/
// @params [auth-token]
// @desc Get Logged User Profile
// @access Logged Users
router.get("/own",
    authRequest,
    async (req, res) => {

        const reply = await ProfileService.GetProfile(req.username);
        if (reply.success)
            return res.json(reply);
        else
            return res.status(404);

    }
);

// @route POST api/profiles/edit/
// @params [Editable fields from the Profile Model + auth-token]
// @desc Edit Logged User Profile
// @access Logged Users
router.post("/edit",
    authRequest,
    getProfile,
    profileValidationRules(),
    validate,
    async (req, res) => {
        const reply = await ProfileService.EditProfile(req.body, req.property);
        return res.json(reply);
    }
);

// @route POST api/profiles/favorite/_:license
// @params [auth-token + Vehicle License Plate]
// @desc Set a vehicle as Favorite
// @access Logged Users
router.post("/favorite/_:license",
	authRequest,
	getProfile,
	validate,
	async (req, res) => {

		const vehicle = await VehicleService.GetUserVehicle(req.username,req.params.license);
		if ( !vehicle.success)
			return res.json(vehicle);

		const reply = await ProfileService.SetFavoriteVehicle(req.property, vehicle.vehicle);
		return res.json(reply);
	}
);

// @route GET api/profiles/favorite/
// @params [auth-token]
// @desc Retuns the user favorite vehicle
// @access Logged Users
router.get("/favorite/",
	authRequest,
	getProfile,
	validate,
	async (req, res) => {

		const vehicle = await VehicleService.GetUserVehicle(req.username,req.property.favorite_vehicle);
		return res.json(vehicle);

	}
);

module.exports = router;


