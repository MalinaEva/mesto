export class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEscClose = this._handleEscClose.bind(this);
		this._handleClosePopup = this._handleClosePopup.bind(this);
	}

	// Метод для открытия попапа
	open() {
		this._popup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	}

	// Метод для закрытия попапа
	close() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}

	// Приватный метод для закрытия попапа клавишей Esc
	_handleEscClose(event) {
		if (event.key === 'Escape') {
			this.close();
		}
	}

	_handleClosePopup(event) {
		if (event.target.classList.contains('popup__button-close') || event.target.classList.contains('popup_opened')) {
			this.close();
		}
	}

	// Метод для добавления слушателей событий
	setEventListeners() {
		this._popup.addEventListener('click', this._handleClosePopup);
	}
}
