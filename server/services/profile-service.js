const Profile = require('../models/profile');

class ProfileService{

    static async CreateProfile(userdata) {

        try{
            let profile = await new Profile({
                username: userdata.username,
                name: userdata.username,
                age:null,
                //vehicles: [],
            });

            return await profile
                .save()
                .then(function () {
                    return { success:true, profile: profile };
                });


        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async GetProfile(username) {
        try{
            let profile = await Profile.findOne({ username: username }).then(profile => {
                if (profile) {
                    return { 'success':true, 'profile': profile }
                }
            });

            return profile;

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async EditProfile(formData, profile) {
        try{

            // Clean uneditable fields submitted in the Form
            for ( let field in formData ){ if (Profile.allowEdit[field] === undefined) delete formData[field]; }

            let newProfile = profile;
            Object.assign(newProfile, formData );

            return await newProfile.save()
                .then( profile => { return { success: true, profile: profile} } )
                .catch( err => { return { success: false, error: err} } )

        } catch (err) { return { 'success':false, 'error': err } }
    }

	static async SetFavoriteVehicle(profile, vehicle) {
		try{
			const newProfile = profile;
			console.log(vehicle);
			newProfile.favorite_vehicle = vehicle.license;

			return await newProfile.save()
				.then( profile => { console.log(profile); return { success: true, profile: profile} } )
				.catch( err => { return { success: false, error: err} } )

		} catch (err) { return { 'success':false, 'error': err } }
	}

};


module.exports = ProfileService;
