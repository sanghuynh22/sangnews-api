require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
	connectionString:
		"postgres://sanghuynh:6iZMtSdT9xKwKCoTzUjuirEP0pgZXw82@dpg-cicluidph6eoptncnm8g-a.singapore-postgres.render.com/sangnews",
	ssl: {
		rejectUnauthorized: false,
	},
});

pool.on("connect", () => {
	console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
	console.error("Unexpected error on idle client", err);
	process.exit(-1);
});
module.exports = pool;

// Sử dụng pool ở đây để thực hiện các truy vấn cơ sở dữ liệu
