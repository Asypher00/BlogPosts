const mongoose = require("mongoose") ; 
require("dotenv").config() ; 
const bcrypt = require("bcrypt") ; 
const jwt = require("jsonwebtoken") ; 

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: [6,"username can not be less than 6 characters"],
        maxlength: [20, "username can not be more than 20 characters"],
        required: [true, "Please Enter Your username"],
        unique: true,
    },

    email: {
        type: String,
        required: [true, "Please Enter Your Name"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },

    password: {
        type: String,
        minlength: [6,"password can not be less than 6 characters"],
        maxlength: [100,"password can not be more than 100 characters"],
        required: true,
    },
}, {
    timestamps: true,
});

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
});

userSchema.methods.createJWT = function(){
    return jwt.sign({
        userId: this._id,
        username: this.username,
        email: this.email,
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch ;
}

const User = mongoose.model("User", userSchema);

module.exports = User ; 