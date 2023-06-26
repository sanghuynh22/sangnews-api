const pool = require("../config/db");

exports.getAllUsers = async () => {
	const query = "SELECT * FROM users";
	const { rows } = await pool.query(query);
	return rows;
};
exports.getUserByLogin = async (name, password) => {
	const query = "SELECT * FROM users WHERE name = $1 and password = $2";
	const values = [name, password];
	const { rows } = await pool.query(query, values);
	return rows[0];
};
exports.getUserById = async (id) => {
	const query = "SELECT * FROM users WHERE id = $1";
	const values = [id];
	const { rows } = await pool.query(query, values);
	return rows[0];
};

exports.createUser = async (name, password) => {
	const query = "INSERT INTO users (name, password) VALUES ($1, $2)";
	const values = [name, password];
	const { rowCount } = await pool.query(query, values);
	return rowCount;
};

exports.addViews = async (views_id, id_user) => {
	const query =
		"UPDATE users SET views_id = array_append(views_id,$1) WHERE id = $2";
	const values = [views_id, id_user];
	const { rowCount } = await pool.query(query, values);
	return rowCount;
};
exports.updateCoin = async (amount, id_user) => {
	const query = "UPDATE users SET coins = $1 WHERE id = $2";
	const values = [amount, id_user];
	const { rowCount } = await pool.query(query, values);
	return rowCount;
};
exports.getViewsOfUser = async (id_user) => {
	const query = "SELECT users.views_id FROM users where id = $1";
	const values = [id_user];
	const { rows } = await pool.query(query, values);
	return rows;
};
