const { body } = require('express-validator');
const vehicleValidationRules = () => {
    return [
        // License must be in a valid PORTUGUESE license plate format
        // TODO: Custom function to validate vehicle licenses from other countries
        body('license')
            .not().isEmpty().withMessage("License cannot be empty")
            .matches(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/i).withMessage('Use the following format: XX-XX-XX'),

        body('name')
            .not().isEmpty().withMessage("Name cannot be empty")
            .isLength({ max: 512 }).withMessage("Name is too big."),

        body('brand')
            .not().isEmpty().withMessage("Brand cannot be empty")
            .isLength({ max: 512 }).withMessage("Brand is too big."),

        body('model')
            .not().isEmpty().withMessage("Model cannot be empty")
            .isLength({ max: 512 }).withMessage("Model is too big."),

        // Year must be a not empty integer between 1900 and the current year
        body('year')
            .not().isEmpty().withMessage("Year cannot be empty")
            .isInt({min:1900, max:new Date().getFullYear()}).withMessage('Must be a year'),

        // Kilometers must be a not empty positive integer
        body('kilometers')
            .not().isEmpty().withMessage("Year cannot be empty")
            .isInt({min:0}).withMessage('Must be a number at least zero'),

        // Fuel must be a non empty String matching the allowed values
        body('fuel')
            .not().isEmpty().withMessage("Full cannot be empty")
            .isIn(Vehicle.schema.obj.fuel.allowedValues),

    ]
};

// Check if vehicle with the same license plate for the logged user already exists
const vehicleExists = (req, res, next) => {
    Vehicle.findOne({ $and:[{owner: req.username.toLowerCase()},{license:req.body.license}] }).then(vehicle => {
        if (vehicle) {
            return res.status(422).json({success: false, code: 422, error: 'You already have a vehicle with this license plate.'});
        }
        else return next();
    });
};

module.exports = {
    vehicleValidationRules,
    vehicleExists,
};
