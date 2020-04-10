//const UserService =require("../services/user-service") ;
const ProfileService =require("../services/profile-service") ;
const { Router } = require('express');
const { profileValidationRules, getProfile } = require('../validations/profile');
const { authRequest } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = Router();

// @route GET api/profile/own/
// @params [auth-token]
// @desc Get Logged User Profile
// @access Logged Users
router.get("/own",
    authRequest,
    async (req, res) => {

        const reply = await ProfileService.GetProfile(req.username);
        if (reply.success)
            return res.json(reply.profile);
        else
            return res.status(404);

    }
);

// @route POST api/profile/edit/
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

module.exports = router;


