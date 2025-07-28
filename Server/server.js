const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./utils/connect");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authenticateToken  = require("./middlewares/authMiddleware");

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:4173',  
    'http://localhost:5173',  
    'https://blog-posts-black-nu.vercel.app',
  ],
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running!' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something Went Wrong",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup error:", error);
        process.exit(1);
    }
};

start();