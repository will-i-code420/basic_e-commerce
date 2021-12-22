const layout = require('../layout');

module.exports = ({ items }) => {
	const rendered = items
		.map((item) => {
			return `
        <div>
        ${item.product.name} - ${item.product.price} - ${item.qty}
        </div>
        `;
		})
		.join('');
	return layout({
		content: `
        <h1>Shopping Cart</h1>
        ${rendered}
        `
	});
};
