import { listenerPopupImage } from './index.js'

export class Card {
	constructor (data, templateSelector) {
		this._name = data.name;
		this._link = data.link;
		this._elementTemplate = document.querySelector(templateSelector);
	}

	make() {
			const cardElement = this._elementTemplate.cloneNode(true).content;
			const elementName = cardElement.querySelector('.element__title');
			const elementImg = cardElement.querySelector('.element__img');
			elementName.textContent = this._name;
			elementImg.alt = this._name;
			elementImg.src = this._link;

			this._setEventListener(cardElement);

			return cardElement;
	}

	_setEventListener(cardElement) {
		this._listenerDelButton(cardElement);
		this._listenerLikeButton(cardElement);
		listenerPopupImage(cardElement);
	}

	// слушатель для удаления карточки
	_listenerDelButton(card) {
		const delBtn = card.querySelector('.element__button-del');

		delBtn.addEventListener('click', event => {
			event.target.closest('.element').remove();
		});
	}

	// слушатель для лайка
	_listenerLikeButton(card) {
		const likeButton = card.querySelector('.element__button-like');

		likeButton.addEventListener('click', () => {
			likeButton.classList.toggle('element__button-like_active');
		});
	}
}
