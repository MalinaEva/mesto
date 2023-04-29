export class Section {
	constructor({ renderer }, containerSelector) {
		this._renderer = renderer;
		this._renderer = this._renderer.bind(this);
		this._container = document.querySelector(containerSelector);
	}

	// Метод для отрисовки всех элементов
	renderItems(items) {
		items.forEach(item => this._renderer(item));
	}

	// Метод для добавления DOM-элемента в контейнер
	addItem(element) {
		this._container.prepend(element);
	}
}
