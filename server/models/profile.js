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
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);

Profile.allowEdit = {
    //username:0,
    name:1,
    age:1,
};