const fs = require('fs');
class UserRepository {
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
	async create(attrs) {
		const data = await this.getAll();
		data.push(attrs);
		await this.writeAll(data);
	}
	async writeAll(info) {
		await fs.promises.writeFile(this.filename, JSON.stringify(info, null, 2));
	}
}
