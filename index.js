const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const fastNewsRoutes = require("./routes/fastNewsRoutes");
// Middlewares
app.use(
	cors({
		origin: "http://localhost:3001",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/fastnews", fastNewsRoutes);

// Start server
app.listen(3000, () => {
	console.log("Server started on port 3000");
});
