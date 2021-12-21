const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const port = 8080;
const authRouter = require('./routes/admin/auth');
const authProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products/products');

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(
	cookieSession({
		keys: [ 'masjhrisdhru46dhds899u65' ]
	})
);

app.use(authRouter);
app.use(authProductsRouter);
app.use(productsRouter);

app.listen(port, () => {
	console.log(`Server started on Port ${port}`);
});
