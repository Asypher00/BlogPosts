const zod = require("zod") ; 

const blogSchema = zod.object({
    title: zod.string()
        .max(100, {message: "Title cannot exceed 100 characters"})
        .trim(),
    
    content: zod.string()
        .min(10, {message: "The content should be atleast 10 characters long"}),

    authorName: zod.string(), 
});

module.exports = blogSchema ; 