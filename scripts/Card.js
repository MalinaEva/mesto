import { openImgPopup } from './index.js';

export class Card {
	constructor (data, templateSelector) {
		this._name = data.name;
		this._link = data.link;
		this._elementTemplate = document.querySelector(templateSelector);

		this._cardElement = this._elementTemplate.cloneNode(true).content;
		this._elementName = this._cardElement.querySelector('.element__title');
		this._elementImg = this._cardElement.querySelector('.element__img');
		this._elementName.textContent = this._name;
		this._elementImg.alt = this._name;
		this._elementImg.src = this._link;
		this._likeButton = this._cardElement.querySelector('.element__button-like');
		this._elementImage = this._cardElement.querySelector('.element__img');
		this._deleteButton = this._cardElement.querySelector('.element__button-del');
	}

	make () {
		this._setEventListener();
		return this._cardElement;
	}

	_setEventListener () {
		this._deleteButton.addEventListener('click', this._handleDeleteButtonClick);
		this._likeButton.addEventListener('click', this._handleLikeClick);
		this._elementImage.addEventListener('click', openImgPopup);
	}

	// слушатель для удаления карточки
	_handleDeleteButtonClick (event) {
		event.target.closest('.element').remove();
	}

	// слушатель для лайка
	_handleLikeClick (event) {
		event.target.classList.toggle('element__button-like_active');
	}
}
