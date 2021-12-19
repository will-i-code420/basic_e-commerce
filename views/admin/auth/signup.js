const layout = require('../layout');

const getErrors = (errors, prop) => {
	try {
		return errors.mapped()[prop].msg;
	} catch (e) {
		return '';
	}
};

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
