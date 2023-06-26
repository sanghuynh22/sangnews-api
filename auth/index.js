const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorize = async (req, res, next) => {
	try {
		const { action } = await req.body;
		const token = await req.cookies.token;
		console.log("token: ", token);
		const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
		const userId = await decodedToken.id;
		const userRole = await decodedToken.role;

		if (userRole === "admin") {
			next();
		} else if (userRole === "editor" && action === "create_news") {
			next();
		} else {
			res.status(401).json({ message: "Unauthorized" });
		}
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Unauthorized" });
	}
};

module.exports = { authorize };
