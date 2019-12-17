const UserService =require("../services/user-service") ;
const { Router } = require('express')

const router = Router();

// Mock Users
const users = [
    {
        username:'tjacob',
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
router.post("/create", async (req, res) => {
    // Validate Data
    //const userData = req.body;
    const userData = users[0];

    // Call Service to handle business logic
    const user = await UserService.Signup(userData);

    // Return a response to the client
    return res.json(user);
});

module.exports = router;


