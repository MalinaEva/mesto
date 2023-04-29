import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
	constructor(popupSelector, submitCallback) {
		super(popupSelector);
		this._submitCallback = submitCallback;
		this._form = this._popup.querySelector('form');
		this._inputList = this._form.querySelectorAll('input');
	}

	// Приватный метод для сбора данных всех полей формы
	_getInputValues() {
		const inputValues = {};

		this._inputList.forEach(input => {
			inputValues[input.name] = input.value;
		});

		return inputValues;
	}

	// Метод для добавления слушателей событий
	setEventListeners() {
		super.setEventListeners();

		this._form.addEventListener('submit', (event) => {
			event.preventDefault();
			this._submitCallback(this._getInputValues());
			this.close();
		});
	}

	// Метод для закрытия попапа и сброса формы
	close() {
		super.close();
		this._form.reset();
	}
}
