const layout = require('../layout');
const { getErrors } = require('../../helpers.js');

module.exports = ({ req, errors }) => {
	return layout({
		content: `
    <div>
    <form method="POST">
    <input type="email" name="email" placeholder="email"/>
    ${getErrors(errors, 'email')}
    <input type="password" name="password" placeholder="password"/>
    ${getErrors(errors, 'password')}
    <input type="password" name="confirm" placeholder="confirm password"/>
    ${getErrors(errors, 'confirm')}
    <button>Sign Up</button>
    </form>
    </div>
    `
	});
};
