const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.signUp = (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        if (name == '' || email == '' || phone == '' || password == '') {
            throw new Error("Missing Values Some Values")
        }
        bcrypt.hash(password, saltRounds, async (err, password) => {
            if (err) {
                throw new Error("Password Was not Provided")
            }
            const user = await User.create({
                name,
                email,
                phone,
                password
            });
            if (user) {
                return res.status(201).json(user)
            } else {
                throw new Error("User Was not Created")
            }
        }
        )
    }
    catch (error) {
        res.status(400).json({ success: false, error })
    }

}

exports.generateToken = (id, name) => {
    return jwt.sign({ userId: id, username: name }, process.env.SECRET_KEY)
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (password == '' || email == '') {
        return res.status(400).json({ err: "Bad parameters Something is missing" });
    }

    const user = await User.findOne({ where: { email: email } })
    if (!user) {
        return res.status(404).json({ err: "User Not Found" })
    }
    bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
            return res.status(200).json({ token: this.generateToken(user.id, user.name), success: "User Logged In Successfully!!" })
        }
        else if (error) {
            return res.status(500).json({ err: "hash error" })
        }
        else {
            return res.status(401).json({ err: "Password is incorrect!!" })
        }

    });
}