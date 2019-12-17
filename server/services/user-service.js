const User = require('../models/user');

class UserService{

    static async Signup(user) {
        console.log("Got All the way here");
        const userRecord = await User.create(user);
        //const userRecord = {nome:"Jacob"};

        return { user: userRecord };
    }


};


module.exports = UserService;
