import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
	constructor (popupSelector, submitCallback) {
		super(popupSelector);
		this._submitCallback = submitCallback;
		this._form = this._popup.querySelector('form');
		this._inputList = this._form.querySelectorAll('input');
		this._saveButton = this._form.querySelector('.popup__button-submit');
	}

	// Приватный метод для сбора данных всех полей формы
	_getInputValues () {
		const inputValues = {};

		this._inputList.forEach(input => {
			inputValues[input.name] = input.value;
		});

		return inputValues;
	}

	// Метод для добавления слушателей событий
	setEventListeners () {
		super.setEventListeners();

		this._form.addEventListener('submit', (event) => {
			event.preventDefault();
			this.renderLoading(true);
			this._submitCallback(this._getInputValues());
		});
	}

	// Метод для закрытия попапа и сброса формы
	close () {
		super.close();
		this._form.reset();
	}

	//  уведомите пользователя о процессе загрузки, поменяв текст кнопки на: «Сохранение...», пока данные загружаются:
	renderLoading (isLoading) {
		if (isLoading) {
			this._saveButton.textContent = 'Сохранение...';
		} else {
			this._saveButton.textContent = 'Сохранить';
		}
	}
}
