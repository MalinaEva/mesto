import { Popup } from './Popup.js'
export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImgImage = this._popup.querySelector('.popup__image');
		this._popupImgTitle = this._popup.querySelector('.popup__title');
	}

	// Метод для открытия попапа с изображением
	open({ src, alt }) {
		this._popupImgImage.src = src;
		this._popupImgImage.alt = alt;
		this._popupImgTitle.textContent = alt;
		super.open();
	}
}
