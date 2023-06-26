const userModel = require("../models/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
	try {
		const users = await userModel.getAllUsers();
		res.json(users);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
exports.getUserById = async (req, res) => {
	const id = req.params.id;
	try {
		const user = await userModel.getUserById(id);
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
exports.login = async (req, res) => {
	const { name, password } = req.body;

	try {
		const user = await userModel.getUserByLogin(name, password);
		if (!user) {
			res.status(401).json({ message: "Invalid username or password" });
			return;
		}
		const payload = {
			userId: user.id,
			name: user.name,
			password: user.password,
			role: user.role || "user",
			views_id: user.views_id,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: "12h",
		});

		res.cookie("token", token, {
			maxAge: 36000000, // thời gian sống cookie là 1 giờ
			path: "/", // cookie áp dụng cho toàn bộ trang web
			httpOnly: false, // cookie chỉ được sử dụng qua HTTP, không thể truy cập bằng JavaScript
			secure: true, // cookie chỉ được gửi qua HTTPS nếu trang web đang chạy dưới giao thức HTTPS
		});
		res.status(200).json(user);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
exports.logout = async (req, res) => {
	try {
		res.clearCookie("token", {
			maxAge: 36000000, // thời gian sống cookie là 1 giờ
			path: "/", // cookie áp dụng cho toàn bộ trang web
			httpOnly: false, // cookie chỉ được sử dụng qua HTTP, không thể truy cập bằng JavaScript
			secure: true,
		});
		res.status(200).send("Logout successful");
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
exports.updateCoins = async (req, res) => {
	const { amount, id_user } = req.body;
	console.log("amount", amount);
	console.log("id_user", id_user);
	try {
		const result = await userModel.updateCoin(amount, id_user);
		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};

exports.createUser = async (req, res) => {
	const { name, password } = req.body;

	try {
		const result = await userModel.createUser(name, password);
		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		res.status(500).send("Internal Server Error");
	}
};
