const layout = require('../layout');

module.exports = ({ products }) => {
	const render = products
		.map((product) => {
			return `
        <div>${product.name}</div>
        `;
		})
		.join('');

	return layout({
		content: `
        ${render}
        `
	});
};
