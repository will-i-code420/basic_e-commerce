const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
	constructor(filename) {
		if (!filename) throw new Error('Filename required to create repository');
		this.filename = filename;
		try {
			fs.accessSync(this.filename);
		} catch (e) {
			fs.writeFileSync(this.filename, '[]');
		}
	}
	async getAll() {
		return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
	}
	async getOne(id) {
		const users = await this.getAll();
		return users.find((user) => user.id === id);
	}
	async getOneBy(filters) {
		const users = await this.getAll();
		for (let user of users) {
			let found = true;
			for (let key in filters) {
				if (user[key] !== filters[key]) found = false;
			}
			if (found) return user;
		}
	}
	async create(attrs) {
		const data = await this.getAll();
		attrs.id = this.createRandomId();
		data.push(attrs);
		await this.writeAll(data);
		return attrs;
	}
	async update(id, attrs) {
		const users = await this.getAll();
		const user = users.find((user) => user.id === id);
		if (!user) throw new Error(`UserID ${id} not found`);
		Object.assign(user, attrs);
		await this.writeAll(users);
	}
	async delete(id) {
		const users = await this.getAll();
		const filtered = users.filter((user) => user.id !== id);
		await this.writeAll(filtered);
	}
	async writeAll(info) {
		await fs.promises.writeFile(this.filename, JSON.stringify(info, null, 2));
	}
	createRandomId() {
		return crypto.randomBytes(4).toString('hex');
	}
};
