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
	userNameSelector: '.profile__title',
	userAboutElement: '.profile__text',
});
const formValidatorEdit = new FormValidator(validateConfig, blocks.popupFormEdit);
const formValidatorAdd = new FormValidator(validateConfig, blocks.popupFormAdd);

// создание и вставка карточек
const renderCards = (cardsData, containerSelector) => {
	const cards = new Section(
		{
			items: cardsData,
			renderer: (card) => {
				const cardElement = createCard(card);
				cards.addItem(cardElement);
			},
		},
		containerSelector
	);
	cards.renderItems();
}

// создание карточки и установка слушателей
const createCard = (item) => {
	return new Card({
		name: item.name,
		link: item.link,
		handleCardClick: () => {
			const popup = new PopupWithImage('.popup_type_img');
			popup.setEventListeners();
			popup.open({ src: item.link, alt: item.name });
		}
	},'#element-template').make();
};

// отправка формы добавления карточки
const submitAddCard = (item) => {
	renderCards([{name: item.title, link: item.url}], '.elements');
	formValidatorAdd.toggleSubmitButton(true);
};

const openEditProfilePopup = (editProfilePopup) => {
	const currentUserInfo = userInfo.getUserInfo();
	blocks.popupName.value = currentUserInfo.name;
	blocks.popupDescription.value = currentUserInfo.about;
	editProfilePopup.open();
}

const initForms = () => {
	const addFormPopup = new PopupWithForm('.popup_type_add', submitAddCard);
	addFormPopup.setEventListeners();
	blocks.addBtn.addEventListener('click', () => addFormPopup.open());


	const editProfilePopup = new PopupWithForm('.popup_type_edit', (data) => userInfo.setUserInfo(data));
	editProfilePopup.setEventListeners();
	blocks.editBtn.addEventListener('click', () => openEditProfilePopup(editProfilePopup));
}

// включить валидацию всех форм
const enableValidation = () => {
	formValidatorEdit.enableValidation();
	formValidatorAdd.enableValidation();
};

renderCards(initialCards, '.elements');
initForms();
enableValidation();
