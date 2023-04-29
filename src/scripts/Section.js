export class Section {
	constructor({ items, renderer }, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._renderer = this._renderer.bind(this);
		this._container = document.querySelector(containerSelector);
	}

	// Метод для отрисовки всех элементов
	renderItems() {
		this._items.forEach(item => this._renderer(item));
	}

	// Метод для добавления DOM-элемента в контейнер
	addItem(element) {
		this._container.prepend(element);
	}
}
