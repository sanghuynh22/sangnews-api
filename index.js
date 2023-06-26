const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const fastNewsRoutes = require("./routes/fastNewsRoutes");
const PORT = process.env.PORT || 5000
// Middlewares
app.use(
	cors({
		origin: process.env.WEB_API,
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
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
