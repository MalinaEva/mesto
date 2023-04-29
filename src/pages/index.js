import './index.css';
import logo from '../images/logo.svg';
import JakIv from '../images/JakIv.png';
import { Section } from '../scripts/Section.js';
import { Card } from '../scripts/Card.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { blocks, initialCards, validateConfig } from '../scripts/constants.js';

const userInfo = new UserInfo({
	userNameElementSelector: '.profile__title',
	userAboutElementSelector: '.profile__text',
});
const popupWithImage = new PopupWithImage('.popup_type_img');
const addFormPopup = new PopupWithForm('.popup_type_add', (item) => submitAddCard(item));
const editProfilePopup = new PopupWithForm('.popup_type_edit', (data) => userInfo.setUserInfo(data));
const formValidatorEdit = new FormValidator(validateConfig, blocks.popupFormEdit);
const formValidatorAdd = new FormValidator(validateConfig, blocks.popupFormAdd);
const cardsSection = new Section(
	{
		renderer: (card) => {
			const cardElement = createCard(card);
			cardsSection.addItem(cardElement);
		},
	},
	".elements"
);

popupWithImage.setEventListeners();
addFormPopup.setEventListeners();
editProfilePopup.setEventListeners();
blocks.addBtn.addEventListener('click', () => {
	formValidatorAdd.toggleSubmitButton(true);
	addFormPopup.open();
});
blocks.editBtn.addEventListener('click', () => openEditProfilePopup());

// создание карточки и установка слушателей
const createCard = (item) => {
	return new Card({
		name: item.name,
		link: item.link,
		handleCardClick: () => {
			popupWithImage.open({ src: item.link, alt: item.name });
		}
	},'#element-template').make();
};

// отправка формы добавления карточки
const submitAddCard = (item) => {
	cardsSection.renderItems([{ name: item.title, link: item.url }]);
};

const openEditProfilePopup = () => {
	const currentUserInfo = userInfo.getUserInfo();
	blocks.popupName.value = currentUserInfo.name;
	blocks.popupDescription.value = currentUserInfo.about;
	editProfilePopup.open();
}

// включить валидацию всех форм
const enableValidation = () => {
	formValidatorEdit.enableValidation();
	formValidatorAdd.enableValidation();
};

enableValidation();
cardsSection.renderItems(initialCards);
