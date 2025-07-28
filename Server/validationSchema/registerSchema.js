const zod = require("zod");

const registerUser = zod.object({
    username: zod.string()
        .min(6, {
            message: "username must be atleast 6 characters long"
        })
        .max(20, {
            message: "username must be 20 characters or less"
        })
        .trim(),

    email: zod.string()
        .email({
            message: "Invalid Email Address"
        }),

    password: zod.string()
        .min(6, {
            message: "password must be atleast 6 characters long"
        })
        .max(100, {
            message: "Password must be 100 characters or less"
        })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter"
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter"
        })
        .regex(/[0-9]/, {
            message: "Password must contain at least one number"
        })
        .regex(/[^A-Za-z0-9]/, {
            message: "Password must contain at least one special character"
        }),

}) ; 
module.exports = registerUser;