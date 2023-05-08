export class Card {
	constructor ({ data, callbacks }, templateSelector) {
		this._id = data.id;
		this._name = data.name;
		this._link = data.link;
		this._ownerId = data.ownerId;
		this._userId = data.userId;

		this._handleCardClick = callbacks.handleCardClick.bind(this);
		this._handleDeleteButtonClick = callbacks.handleDeleteButtonClick.bind(this);
		this._handleLikeClick = callbacks.handleLikeClick.bind(this);

		this._cardElement = document.querySelector(templateSelector)
		.content
		.querySelector('.element')
		.cloneNode(true);

		this._elementName = this._cardElement.querySelector('.element__title');
		this._likeButton = this._cardElement.querySelector('.element__like-button');
		this._likeCounter = this._cardElement.querySelector('.element__like-counter');
		this._elementImage = this._cardElement.querySelector('.element__img');
		this._deleteButton = this._cardElement.querySelector('.element__button-del');
		this.setLikes(data.likes);
	}

	make () {
		this._checkPermissions();
		this._setEventListener();
		this._elementName.textContent = this._name;
		this._elementImage.alt = this._name;
		this._elementImage.src = this._link;
		return this._cardElement;
	}

	setLikes (likes) {
		this._likes = likes;
		this._likeCounter.textContent = this._likes.length;
		if (this.isLiked()) {
			this._likeButton.classList.add('element__like-button_active');
		} else {
			this._likeButton.classList.remove('element__like-button_active');
		}
	}

	_setEventListener () {
		if (this._isOwner()) {
			this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick());
		}
		this._likeButton.addEventListener('click', () => this._handleLikeClick());
		this._elementImage.addEventListener('click', () => this._handleCardClick());
	}

	_checkPermissions () {
		if (!this._isOwner()) {
			this._deleteButton.remove();
		}
	}

	isLiked () {
		return this._likes.some(like => like._id === this._userId);
	}

	_isOwner () {
		return this._ownerId === this._userId;
	}
}
