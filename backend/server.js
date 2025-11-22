// Load required modules
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

// Initialize Express app
const app = express();

// Swagger setup
const setupSwagger = require("./swagger/swagger");
setupSwagger(app);

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware (required for OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
require("./middleware/passport"); // Google strategy config
app.use(passport.initialize());
app.use(passport.session());

// Error handler (after JSON parsing, before routes)
app.use(errorHandler);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve homepage explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Routes
const dataRoutes = require("./routes/dataRoutes");
const contactRoutes = require("./routes/contactRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/professional", dataRoutes);
app.use("/contacts", contactRoutes);
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes); // OAuth login/logout

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
