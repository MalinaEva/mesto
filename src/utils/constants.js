const profile = document.querySelector('.profile');
const blocks = {
	popupName: document.querySelector('.popup__input_type_name'),
	popupDescription: document.querySelector('.popup__input_type_description'),
	popupAvatar: document.querySelector('.popup__input_type_avatar'),
	popupFormEdit: document.querySelector('.popup__form_edit'),
	popupFormAdd: document.querySelector('.popup__form_add'),
	popupFormAvatar: document.querySelector('.popup__form_avatar'),
	editBtn: profile.querySelector('.profile__edit-button'),
	addBtn: profile.querySelector('.profile__add-button'),
	avatar: profile.querySelector('.profile__avatar'),
	logo: document.querySelector('.header__logo'),
	avatarEditButtonIcon: document.querySelector('.profile__avatar-edit-icon'),
};

const apiAccess = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
	token: 'fb7daca6-4f37-4c2d-a3f6-7b751f5241b9',
};

const validateConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button-submit',
	inactiveButtonClass: 'popup__button-submit_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-message_active'
};

export { apiAccess, blocks, validateConfig };
