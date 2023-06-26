const fastNewsModel = require("../models/fastNewsModel");

exports.getAllFastNews = async (req, res) => {
	try {
		const news = await fastNewsModel.getAllFastNews();
		res.status(200).json(news);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

exports.getFastNewsById = async (req, res) => {
	const { id } = req.params;
	try {
		const news = await fastNewsModel.getFastNewsById(id);
		if (!news) {
			return res.status(404).send("News not found");
		}
		res.status(200).json(news);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

exports.createFastNews = async (req, res) => {
	const { content, id_user } = req.body;
	try {
		const rowCount = await fastNewsModel.createFastNews(content, id_user);
		res.status(201).send("News created successfully");
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};
