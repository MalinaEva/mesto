export class Section {
	constructor ({ renderer }, containerSelector) {
		this._renderer = renderer.bind(this);
		this._container = document.querySelector(containerSelector);
	}

	// Метод для отрисовки всех элементов
	renderItems (items, prepend = true) {
		items.forEach(item => this._renderer(item, prepend));
	}

	// Метод для добавления DOM-элемента в контейнер
	addItem (element, prepend = true) {
		(prepend) ? this._container.prepend(element) : this._container.append(element);
	}
}
