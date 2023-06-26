const pool = require("../config/db");

exports.getAllFastNews = async () => {
	const query = "SELECT * FROM fastnews";
	const { rows } = await pool.query(query);
	return rows;
};
exports.getFastNewsById = async (id) => {
	const query = "SELECT * FROM fastnews WHERE id = $1";
	const values = [id];
	const { rows } = await pool.query(query, values);
	return rows[0];
};

exports.createFastNews = async (content, id_user) => {
	console.log("pool", pool);
	const query = "INSERT INTO fastnews (content,id_user) VALUES ($1, $2)";
	const values = [content, id_user];
	const { rowCount } = await pool.query(query, values);
	return rowCount;
};
