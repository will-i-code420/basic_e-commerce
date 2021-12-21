const layout = require('../layout');
const { getErrors } = require('../../helpers');

module.exports = ({ product }) => {
	return layout({
		content: `
        <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST" enctype="multipart/form-data">
              <h1 class="title">Edit ${product.name}</h1>
              <div class="field">
                <label class="label">Item</label>
                <input required class="input" value="${product.name}" name="item" />
                <p class="help is-danger">${getError(errors, 'item')}</p>
              </div>
              <div class="field">
                <label class="label">Price</label>
                <input required class="input" value="${product.price}" name="price" />
                <p class="help is-danger">${getError(errors, 'price')}</p>
              </div>
              <div class="field">
                <label class="label">Image</label>
                <input required type="file" class="input" name="image" />
                <p class="help is-danger">${getError(errors, 'image')}</p>
              </div>
              <button class="button is-primary">Edit</button>
            </form>
          </div>
        </div>
      </div>
        `
	});
};
