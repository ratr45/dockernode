const mariadb = require('mariadb');
const options = require('./config');
const cors = require('cors');
const pool = mariadb.createPool(options);

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/feedback', (req, res) => {
	const { name, email, opinion, color } = req.body;
	const query = "INSERT INTO `user_feedback` (name, email, opinion, color) VALUES (?, ?, ?, ?)";
	const data = [ name, email, opinion, color ];
	pool.getConnection()
	.then(conn => {

		conn.query(query,data)
		.then(row => {
			conn.release();
			return res.send({ "feedback_id": row.insertId })
		})
		.catch(err => {
			conn.release();
			return res.send({ "error": err })
		})
	}).catch(err => {
		return res.send({ "error": err })
	});
});

app.get('/feedback', (req, res) => {
	const { id } = req.query;
	const query = "SELECT * FROM user_feedback WHERE id=?";
	const data = [ id ];
	pool.getConnection()
		.then(conn => {

		conn.query(query,data)
		.then(row => {
			conn.release();
			if (row.length == 0) return res.status(404).send({"message": "not found"})
			return res.send({ "result": row[0] })
		})
		.catch(err => {
			conn.release();
			return res.send({ "error": err })
		})

	}).catch(err => {
		return res.send({ "error": err })
	});
});

app.listen(3000, () => console.log("Listening on post 3000"));
