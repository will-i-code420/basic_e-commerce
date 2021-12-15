const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
	res.send(`
    <div>
    <form method="POST">
    <input type="email" name="email" placeholder="email"/>
    <input type="password" name="password" placeholder="password"/>
    <input type="password" name="confirm" placeholder="confirm password"/>
    <button>Register</button>
    </form>
    </div>
    `);
});

app.post('/', (req, res) => {
	const { email, password, confirm } = req.body;
});

app.listen(port, () => {
	console.log(`Server started on Port ${port}`);
});
