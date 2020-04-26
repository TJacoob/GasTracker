const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService{

    // TODO: Reset Password

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

    static async Login(formData) {
        try {

            let user ;
            user = await User.findOne({$or: [
                    {username: formData.login},
                    {email: formData.login}
                ]}).then(user => {
                if (user) { return user }
                else throw "No user found";
            });

            let result = await bcrypt.compare(formData.password, user.password);
            if ( !result ){ return { 'success':false, 'error': 'Incorrect Password'} }

            // Create JWT Token, save to user object and send back as reply (allows fetching user with only a token)
            const token = await this.generateToken(user);

            user.token = token;
            user = await user.save();

            return { 'success':true, 'username': user.username, 'email':user.email, 'token': user.token };

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async getUser(formData) {
        try {

            // Não faz verificações de Password (watch out)!!

            let user ;
            user = await User.findOne({$or: [
                    {username: formData.login},
                    {email: formData.login}
                ]}).then(user => {
                if (user) { return user }
                else throw "No user found";
            });

            return { 'success':true, 'username': user.username, 'email':user.email };

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async getUserByToken(token) {
        try {

            let user ;
            user = await User.findOne({token: token})
                .then(user => {
                    if (user) { return user }
                    else throw "No user found";
                });

            return { 'success':true, 'username': user.username, 'email':user.email };

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async logout(token) {
        try {

            console.log(token);

            let user ;
            user = await User.findOne({token: token})
                .then(user => {
                    if (user) { return user }
                    else throw "No user found";
                });

            // Delete user token
            user.token = null;
            await user.save();

            return { 'success':true };

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async Signup(userRequest) {
        try {

            // Generate Hashed Password
            const hashedPassword = await this.hashPassword(userRequest.password);

            // Build User Object
            const newUser = await new User({
                username: userRequest.username.toLowerCase(),
                email: userRequest.email,
                //password: userRequest.password,
                password: hashedPassword,
                date: new Date(),
                token: null,
            });

            // Create JWT Token and store to the user
            const token = await this.generateToken(newUser);
            newUser.token = token;

            // Save user Object
            const user = await newUser.save();


            return { 'success':true, 'username': user.username, 'email':user.email, 'token': user.token };

        } catch (err) { return { 'success':false, 'error': err } }
    }

    static async ChangePassword(username, formData) {
        try {

            let user = await User.findOne({ username: username }).then(user => {
                if (user) { return user }
                else throw 'No User Found';
            });

            // Match Password
            let result = await bcrypt.compare(formData.password, user.password);
            if ( !result ){ return { 'success':false, 'error': 'Incorrect Password'} }

            // Generate new Password Hash
            const hashedPassword = await this.hashPassword(formData.new_password);

            // Change user object
            user.password = hashedPassword;

            // Create JWT Token and store in user
            const token = await this.generateToken(user);
            user.token = token;

            // Save user Object
            const changedUser = await user.save();

            return { 'success':true, 'username': changedUser.username, 'email':changedUser.email, 'token': changedUser.token };

        } catch (err) { return { 'success':false, 'error': err } }
    }

};


module.exports = UserService;
