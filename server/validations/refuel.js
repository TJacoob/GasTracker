const { body } = require('express-validator');
const Refuel = require('../models/refuel');

const refuelValidationRules = () => {
    return [
        body('brand')
            .not().isEmpty().withMessage("Choose a brand")
            .isIn(Refuel.schema.obj.brand.allowedValues),

        body('variety')
            .not().isEmpty().withMessage("Choose a variety")
            .isIn(Refuel.schema.obj.variety.allowedValues),

        body('price')
            .not().isEmpty().withMessage("Price cannot be empty")
            .isCurrency({symbol:'€',allow_negatives:false,digits_after_decimal:[1,2,3]}).withMessage('Should be a valid Price'),

        body('kilometers')
            .not().isEmpty().withMessage("Kilometers cannot be empty")
            .isInt({min:0,max:9999}).withMessage('Must be bigger than zero'),

        body('quantity')
            .not().isEmpty().withMessage("Kilometers cannot be empty")
            .isFloat({min:0,max:350}).withMessage('Must be bigger than zero'),

    ]
};

module.exports = {
    refuelValidationRules,
};
