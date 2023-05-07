import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
	constructor (popupSelector) {
		super(popupSelector);
		this._form = this._popup.querySelector('form');
	}

	// Метод для установки нового обработчика сабмита
	setSubmitAction (newSubmitCallback) {
		this._submitCallback = newSubmitCallback;
		this._submitCallback = this._submitCallback.bind(this);
	}

	// Метод для добавления слушателей событий
	setEventListeners () {
		super.setEventListeners();

		this._form.addEventListener('submit', (event) => {
			event.preventDefault();
			try {
				this._submitCallback();
				this.close();
			} catch (err) {
				console.error(err);
			}
		});
	}
}
