const blocks = {
	editBtn: document.querySelector('.profile__edit-button'),
	addBtn: document.querySelector('.profile__add-button'),
	closeBtns: document.querySelectorAll('.popup__button-close'),
	popups: document.querySelectorAll('.popup'),
	popupEdit: document.querySelector('.popup_type_edit'),
	popupName: document.querySelector('.popup__input_type_name'),
	popupDescription: document.querySelector('.popup__input_type_description'),
	popupFormEdit: document.querySelector('.popup__form_edit'),
	popupAdd: document.querySelector('.popup_type_add'),
	popupTitle: document.querySelector('.popup__input_type_title'),
	popupUrl: document.querySelector('.popup__input_type_url'),
	popupFormAdd: document.querySelector('.popup__form_add'),
	popupImg: document.querySelector('.popup_type_img'),
	popupImgTitle: popupImg.querySelector('.popup__title'),
	popupImgImage: popupImg.querySelector('.popup__image'),
	profileTitle: document.querySelector('.profile__title'),
	profileText: document.querySelector('.profile__text'),
	elements: document.querySelector('.elements'),
}

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

const validateConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button-submit',
	inactiveButtonClass: 'popup__button-submit_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-message_active'
};

export { blocks, initialCards, validateConfig };
