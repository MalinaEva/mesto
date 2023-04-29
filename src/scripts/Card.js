// import { openImgPopup } from './index.js';

export class Card {
	constructor ({ name, link, handleCardClick }, templateSelector) {
		this._name = name;
		this._link = link;
		this._handleCardClick = handleCardClick;
		this._handleCardClick = this._handleCardClick.bind(this);


		this._cardElement = document.querySelector(templateSelector)
			.content
			.querySelector('.element')
			.cloneNode(true);

		this._elementName = this._cardElement.querySelector('.element__title');
		this._likeButton = this._cardElement.querySelector('.element__button-like');
		this._elementImage = this._cardElement.querySelector('.element__img');
		this._deleteButton = this._cardElement.querySelector('.element__button-del');

		this._elementName.textContent = this._name;
		this._elementImage.alt = this._name;
		this._elementImage.src = this._link;
	}

	make () {
		this._setEventListener();
		return this._cardElement;
	}

	_setEventListener () {
		this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick());
		this._likeButton.addEventListener('click', () => this._handleLikeClick());
		this._elementImage.addEventListener('click', () => this._handleCardClick());
	}

	// слушатель для удаления карточки
	_handleDeleteButtonClick () {
		this._cardElement.remove();
	}

	// слушатель для лайка
	_handleLikeClick () {
		this._likeButton.classList.toggle('element__button-like_active');
	}
}
