const layout = require('../layout');
const { getErrors } = require('../../helpers.js');

module.exports = ({ errors }) => {
	return layout({
		content: `
    <div>
    <form method="POST">
    <input type="email" name="email" placeholder="email"/>
    <input type="password" name="password" placeholder="password"/>
    ${getErrors(errors, 'email')}
    ${getErrors(errors, 'password')}
    <button>Sign In</button>
    </form>
    </div>
    `
	});
};
