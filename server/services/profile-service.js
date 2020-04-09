const Profile = require('../models/profile');

class ProfileService{

    static async CreateProfile(userdata) {

        let reply = {};

        let profile = await new Profile({
            username: userdata.username,
            name: userdata.username,
            age:null,
        });

        reply = profile
            .save()
            .then(function () {
                console.log("Success on the Profile");
                return { status:'success' };
            });

        return reply;
    }

};


module.exports = ProfileService;
