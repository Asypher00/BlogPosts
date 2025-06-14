const mongoose = require("mongoose") ; 

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"],
    },

    content: {
        type: String,
        required: [true, "Content is required"],
        minlength: [10, "content must be atleast 10 characters long"],    
    },

    authorId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User",
        required: [true, "User ID is required"],
    },

    authorName: {
        type: String,
        required: [true, "Author name is required"],
    },
}, {
    timestamps: true,
});

const blogs = mongoose.model("Blogs", blogSchema)  ; 

module.exports = blogs ; 