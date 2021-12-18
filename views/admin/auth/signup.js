module.exports = ({ req }) => {
	return `
    <div>
    <form method="POST">
    <input type="email" name="email" placeholder="email"/>
    <input type="password" name="password" placeholder="password"/>
    <input type="password" name="confirm" placeholder="confirm password"/>
    <button>Sign Up</button>
    </form>
    </div>
    `;
};
