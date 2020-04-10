const { body  } = require('express-validator');
const profileValidationRules = () => {
    return [
        // if not empty, name must be string
        body('name').if(body('name').not().isEmpty()).isString().withMessage("Name must be a string with words"),
        // if not empty, age must be number
        body('age').if(body('age').not().isEmpty()).isNumeric().withMessage("Age must be a number"),
    ]
};

// This middleware checks for the profile and adds it to the request to avoid double requesting to the db
const getProfile = (req, res, next) => {
    Profile.findOne({ username: req.username.toLowerCase() }).then(profile => {
        if (!profile) {
            return res.status(422).json({success: false, code: 422, message: 'Could not find a Profile for this User'});
        }
        else{
            req.property = profile;
            return next();
        }
    });
};


module.exports = {
    profileValidationRules,
    getProfile,
};
