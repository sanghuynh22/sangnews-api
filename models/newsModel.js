const pool = require("../config/db");

exports.getAllNews = async () => {
	const query = "SELECT * FROM news";
	const { rows } = await pool.query(query);
	return rows;
};
exports.getNewsById = async (id) => {
	const query = "SELECT * FROM news WHERE id = $1";
	const values = [id];
	const { rows } = await pool.query(query, values);
	return rows[0];
};

exports.createNews = async (title, image, content, id_user) => {
	const query =
		"INSERT INTO news (title, image,content,id_user) VALUES ($1, $2, $3, $4)";
	const values = [title, image, content, id_user];
	const { rowCount } = await pool.query(query, values);
	return rowCount;
};
exports.countViews = async (id) => {
	const query = "UPDATE news SET views = views + 1 WHERE id = $1";
	const values = [id];
	const { rowCount } = await pool.query(query, values);
	return rowCount;
};
