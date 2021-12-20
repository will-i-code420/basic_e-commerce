const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./Repository');

const scrypt = util.promisify(crypto.scrypt);

class UserRepository extends Repository {
	async create(attrs) {
		const data = await this.getAll();
		attrs.id = this.createRandomId();
		const salt = crypto.randomBytes(8).toString('hex');
		const buff = await scrypt(attrs.password, salt, 64);
		const info = {
			...attrs,
			password: `${buff.toString('hex')}.${salt}`
		};
		data.push(info);
		await this.writeAll(data);
		return info;
	}
	async comparePassword(password, inputPassword) {
		const [ hash, salt ] = password.split('.');
		const inputHash = await scrypt(inputPassword, salt, 64);
		return hash === inputHash.toString('hex');
	}
}

module.exports = new UserRepository('users.json');
