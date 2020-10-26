const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        unique: true,
    },
    name:{
        type: String,
    },
    age:{
        type: Number,
    },
	email:{
		type: String,
	},
	favorite_vehicle:{
    	type: String,
	},
    /*
    vehicles: {
        type: [String]
    }
    */
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);

Profile.allowEdit = {
    //username:0,
    name:1,
    //age:1,
    //email:1,
    //vehicles:0,
};
