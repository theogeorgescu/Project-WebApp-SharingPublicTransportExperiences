const { User } = require("../models/user");

const sendmail = require('sendmail')();


const user = {
    create: async(user) => {
        try {
            const result = await User.create(user);

            return result;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },
    authUser: async(user, pass) => {
        try {
            const result = await User.findOne({
                where: {
                    username: user,
                    password: pass
                }
            });

            return result;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },
    getById: async(id) => {
        try {
            const result = await User.findByPk(id);

            return result;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },
    disable: async(userName) => {
        try {
            let user = await User.findOne({ where: { 'username': userName } });
            user.isEnabled = false;
            await user.save();

            return user;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },
    enable: async(userName) => {
        try {
            let user = await User.findOne({ where: { 'username': userName } });
            user.isEnabled = true;
            await user.save();

            return user;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },
    update: async(user) => {

        try {
            let mUser = await User.findByPk(user.id);

            if (user.email) {
                mUser.email = user.email;

                await mUser.save();
            }
            else {
                throw new Error('Email field is empty');
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    },
    reset: async(email) => {
        try {
            var randomCode = Math.floor(Math.random() * 1000000);

            // sendmail({
            //     from: 'webabes1090@gmail.com',
            //     to: email,
            //     subject: 'WEBabes Feedback Recovery Code',
            //     html: 'Your recovery code: ' + randomCode,
            // }, function(err, reply) {
            //     console.log(err && err.stack);
            //     console.dir(reply);
            // });

            const send = require('gmail-send')({
                user: 'webabes1090@gmail.com',
                pass: 'webTech123',
                to: email,
                subject: 'WEBabes Feedback Recovery Code',
            });

            send({
                text: 'Your recovery code: ' + randomCode,
            }, (error, result, fullResult) => {
                if (error) console.error(error);
                console.log(result);
            })

            return randomCode;
        }
        catch (err) {
            throw new Error(err.message);
        }
    },
    updatePassword: async(userEmail, newPassword) => {
        try {
            let user = await User.findOne({
                where: {
                    email: userEmail
                }
            });

            if (user) {
                user.password = newPassword;

                await user.save();
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = user;