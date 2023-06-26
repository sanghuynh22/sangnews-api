const newsModel = require("../models/newsModel");
const userModel = require("../models/userModel");

exports.getAllNews = async (req, res) => {
	try {
		const news = await newsModel.getAllNews();
		res.status(200).json(news);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

exports.getNewsById = async (req, res) => {
	const { id } = req.params;
	try {
		const news = await newsModel.getNewsById(id);
		if (!news) {
			return res.status(404).send("News not found");
		}
		res.status(200).json(news);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

exports.createNews = async (req, res) => {
	const { title, image, content, id_user } = req.body;
	try {
		const rowCount = await newsModel.createNews(title, image, content, id_user);
		res.status(201).send("News created successfully");
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

exports.countViews = async (req, res) => {
	const { id_user, id } = req.body;
	try {
		console.log("id_user: ", id_user);
		const rowCount = await newsModel.countViews(id);
		if (rowCount > 0) {
			if (id_user) {
				const views = await userModel.getViewsOfUser(id_user);
				console.log("users of views_id: ", views);
				const viewIds = views[0].views_id;
				console.log("user[0] of views_id: ", viewIds);

				if (viewIds.indexOf(parseInt(id)) === -1) {
					await userModel.addViews(parseInt(id), id_user);
				}
			}
		}
		res.status(201).send("countViews successs!");
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};
