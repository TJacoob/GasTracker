const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService{

    static async generateToken(user){
        // Create JWT Payload
        const payload = {
            id: user.id,
            username: user.username,
        };

        // Sign token
        let token = await jwt.sign( payload, process.env.HASH_KEY, { expiresIn: 31556926 });
        //console.log('Token: ' + token);

        return token;
    }

    static async hashPassword(password){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        //console.log('Hash: '+hash);

        return hash;
    }

    static async Signup(userRequest) {
        try {

            // TODO: Better Error Proof this

            // Generate Hashed Password
            const hashedPassword = await this.hashPassword(userRequest.password);

            // Build User Object
            const newUser = await new User({
                username: userRequest.username.toLowerCase(),
                email: userRequest.email,
                //password: userRequest.password,
                password: hashedPassword,
                date: new Date(),
            });

            // Save user Object
            const user = await newUser.save();

            // Create JWT Token to send back as reply
            const token = await this.generateToken(user);

            return { 'username': user.username, 'email':user.email, 'token': token };

        } catch (err) { console.log(err) }
    }
};


module.exports = UserService;
