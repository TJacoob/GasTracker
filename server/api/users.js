const UserService =require("../services/user-service") ;
const ProfileService =require("../services/profile-service") ;
const { Router } = require('express');
const { userValidationRules, userExists, emailInUse } = require('../validations/user');
const { validate } = require('../middleware/validation');

const router = Router();

// @route GET api/users/all
// @desc Login user
// @access Public
router.get("/all", async (req, res) => {
    // Return a response to the client
    return res.json(users);
});


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
        const profile = await ProfileService.CreateProfile(userData);



        // Return a response to the client
        return res.json(user);
    }
);

module.exports = router;


