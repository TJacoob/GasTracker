// From https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
const { body } = require('express-validator');
const userValidationRules = () => {
    return [
        // username must not be empty and have at least 6 characters
        body('username').not().isEmpty().withMessage("Username cannot be empty"),
        body('username').isLength({ min: 4, max:128 }).withMessage("Username must have at least 4 characters"),
        // email can't be empty
        body('email').not().isEmpty().withMessage("Email cannot be empty"),
        // password must be at least 6 chars long
        body('password').isLength({ min: 6, max:128 }).withMessage("Password must have at least 6 characters"),
        // Passwords must match
        body('password_confirm')
            .custom( (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password Confirmation must match the password');
                } return true;
            }),
    ]
};

const userExists = (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }).then(user => {
        if (user) {
            return res.status(422).json({success: false, code: 422, error: 'Username already exists'});
        }
        else return next();
    });
};

const emailInUse = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(422).json({success: false, code: 422, error: 'Email already in use'});
        } else return next();
    });
};

const newPasswordValidationRules = () => {
    return [
        // password must be at least 6 chars long
        body('password').not().isEmpty().withMessage("Old password cannot be empty"),
        body('new_password').not().isEmpty().withMessage("New Password cannot be empty"),
        body('new_password').isLength({ min: 6, max: 128 }).withMessage("New password must have at least 6 characters"),
        body('new_password_confirm')
            .custom( (value, { req }) => {
                if (value !== req.body.new_password) {
                    throw new Error('Password Confirmation must match the new password');
                } return true;
            }),
    ]
};

const loginValidationRules = () => {
    return [
        // login element can't be empty
        body('login').not().isEmpty().withMessage("Username/Email cannot be empty"),
        // password can't be empty
        body('password').not().isEmpty().withMessage("Email cannot be empty"),
    ]
};

module.exports = {
    userValidationRules,
    userExists,
    emailInUse,
    newPasswordValidationRules,
    loginValidationRules
};
