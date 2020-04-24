const UserService =require("../services/user-service") ;
const ProfileService =require("../services/profile-service") ;
const { Router } = require('express');
const { userValidationRules, newPasswordValidationRules, loginValidationRules, userExists, emailInUse } = require('../validations/user');
const { validate } = require('../middleware/validation');
const { authRequest } = require('../middleware/auth');

const router = Router();

// @route POST api/users/login
// @params [String:login (can be username or email), String:password]
// @desc Login user
// @access Public
router.post("/login",
    loginValidationRules(),
    validate,
    //userExists,
    //emailInUse,
    async (req, res) => {

        // Data validation is done on the middleware

        const reply = await UserService.Login(req.body);

        // Return a response to the client
        return res.json(reply);
    }
);

// @route GET api/users/own
// @params [auth-token]
// @desc Get Logged User
// @access Public
router.get("/own",
    //loginValidationRules(),
    //validate,
    //userExists,
    //emailInUse,
    async (req, res) => {
        // This exists because the nuxt-auth module on the frontend requires a call to retrieve user info using only
        // the token, as with do not store it, it's not possible to retrieve information just with the token
        // Return a response to the client
        return res.json(200);
    }
);


// @route POST api/users/create
// @params [String:username, String:password, String:email]
// @desc Login user
// @access Public
router.post("/create",
    userValidationRules(),
    validate,
    userExists,
    emailInUse,
    async (req, res) => {
        // Data validation is done on the middleware

        const userData = req.body;
        //const userData = users[0];

        // Call Service to handle business logic
        const user = await UserService.Signup(userData);
        if ( !user.success)
            return res.json(user);

        const profile = await ProfileService.CreateProfile(userData);
        if ( !profile.success)
            return res.json(profile);

        // Return a response to the client
        return res.json(user);
    }
);

// @route POST api/users/change
// @params [String:password, String:newPassword + auth-token]
// @desc Change User's Password, requires old password and new password
// @access Logged Users
router.post("/change",
    authRequest,
    newPasswordValidationRules(),
    validate,
    async (req, res) => {
        // Data validation and user permission check is done on the middleware

        const user = await UserService.ChangePassword(req.username,req.body);

        /*
        const userData = req.body;
        //const userData = users[0];

        // Call Service to handle business logic
        const user = await UserService.Signup(userData);
        const profile = await ProfileService.CreateProfile(userData);

        */

        // Return a response to the client
        return res.json(user);
    }
);

module.exports = router;


