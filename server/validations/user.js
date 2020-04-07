// From https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
    return [
        // username must not be empty
        body('username').not().isEmpty().withMessage("Username cannot be empty"),
        body('email').not().isEmpty().withMessage("Email cannot be empty"),
        // password must be at least 6 chars long
        body('password').isLength({ min: 6 }).withMessage("Password must have at least 6 characters"),
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    })
};

const userExists = (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }).then(user => {
        if (user) {
            return res.status(422).json({status: 'error', code: 422, message: 'Username already exists'});
        }
        else return next();
    });
};

const emailInUse = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(422).json({status: 'error', code: 422, message: 'Email already in use'});
        } else return next();
    });
};

module.exports = {
    userValidationRules,
    validate,
    userExists,
    emailInUse,
};
