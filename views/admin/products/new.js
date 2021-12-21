const layout = require('../layout');
const { getErrors } = require('../../helpers');

module.exports = ({ errors }) => {
	return layout({
		content: `
        <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST" enctype="multipart/form-data">
              <h1 class="title">Add New Product</h1>
              <div class="field">
                <label class="label">Item</label>
                <input required class="input" placeholder="Item Name" name="item" />
                <p class="help is-danger">${getError(errors, 'item')}</p>
              </div>
              <div class="field">
                <label class="label">Price</label>
                <input required class="input" placeholder="$10.99" name="price" />
                <p class="help is-danger">${getError(errors, 'price')}</p>
              </div>
              <div class="field">
                <label class="label">Image</label>
                <input required type="file" class="input" name="image" />
                <p class="help is-danger">${getError(errors, 'image')}</p>
              </div>
              <button class="button is-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
        `
	});
};
