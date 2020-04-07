const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService{

    static async Signup(userRequest) {

        let reply = {};
        //const userRecord = await User.create(user);
        //const userRecord = {nome:"Jacob"};

        const newUser = new User({
            username: userRequest.username.toLowerCase(),
            email: userRequest.email,
            password: userRequest.password,
            date: new Date(),
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(
                        //user => res.json(user)
                        function (user) {
                            // User created
                            // Create JWT Payload
                            const payload = {
                                id: user.id,
                                username: user.username,
                            };
                            // Sign token
                            jwt.sign(
                                payload,
                                process.env.HASH_KEY,
                                {
                                    expiresIn: 31556926 // 1 year in seconds
                                },
                                (err, token) => {
                                    reply = { status:'success', user: user, token:token };
                                    console.log(reply);
                                }
                            );
                            // Send Confirmation Email
                            //emails.sendEmail(emails.createdAccount({username:user.username}), req.username);
                        }
                    )
                    .catch(err => console.log(err));
            });
        });

        return reply;

    }


};


module.exports = UserService;
