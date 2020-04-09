const UserService =require("../services/user-service") ;
const ProfileService =require("../services/profile-service") ;
const { Router } = require('express');
const { userValidationRules, validate, userExists, emailInUse } = require('../validations/user');

const router = Router();

// Mock Users
const users = [
    {
        username:'lorem',
        email:'tjacob',
        password:'123456',
    }
];

// @route GET api/users/all
// @desc Login user
// @access Public
router.get("/all", async (req, res) => {
    // Return a response to the client
    return res.json(users);
});

// @route POST api/users/create
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
        const result = await UserService.Signup(userData);
        console.log('\nReply from User Service:');
        console.log(result);
        const result2 = await ProfileService.CreateProfile(userData);
        console.log('\nReply from Profile Service:');
        console.log(result2);

        //console.log("Resposta: ");
        //console.log(res.json(result));
        //console.log(res.json(result2));
        // Return a response to the client
        return res.json(result);
    }
);

module.exports = router;


