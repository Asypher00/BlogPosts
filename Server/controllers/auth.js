const registerUser = require("../validationSchema/registerSchema");
const loginUser = require("../validationSchema/loginschema");
const User = require("../models/users");

const register = async (req, res) => {
    const parsedPayload = registerUser.safeParse(req.body);

    if (!parsedPayload.success) {
        return res.status(400).json({
            success: false,
            message: "Please Provide Necessary Credentials"
        });
    }

    const {
        username,
        email,
        password
    } = req.body;

    const userExists = await User.findOne({
        $or: [{
            email
        }, {
            username
        }]
    });

    if (userExists) {
        return res.status(409).json({
            success: false,
            message: "user already exists",
        });
    }

    try {
        const user = await User.create({
            ...req.body
        });
        const token = user.createJWT();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: token,
        });
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const parsedPayload = loginUser.safeParse(req.body);
    if (!parsedPayload.success) {
        return res.status(400).json({
            success: false,
            message: "Please Provide Necessary Credentials"
        });
    }

    const {
        username,
        password
    } = req.body;

    const user = await User.findOne({
        username,
    });
    if (!user) {
        res.status(401).json({
            success: false,
            message: "Invalid Username or Password"
        });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: "Invalid Password"
        });
    }

    const token = user.createJWT();
    res.status(201).json({
        success: true,
        message: "Logged In Successfully",
        data: token
    });
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user: user.toJSON()
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = {
    register,
    login,
    getProfile,
}