import './index.css';
import logo from '../images/logo.svg';
import editButton from '../images/editButton.svg';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit';
import { apiAccess, blocks, validateConfig } from '../utils/constants.js';

const ApiClient = new Api(apiAccess);
let userId;

// Инициализация компонентов
const cardsSection = new Section(
	{
		renderer: (card, prepend) => {
			const cardElement = createCard(card, userId);
			cardsSection.addItem(cardElement, prepend);
		},
	},
	'.elements'
);
const userInfo = initializeUserInfo();
const popupWithImage = new PopupWithImage('.popup_type_img');
const popupWithSubmit = new PopupWithSubmit('.popup_type_submit');
const addFormPopup = initializeaddFormPopup();
const editProfilePopup = initializeEditProfilePopup();
const popupAvatarEdit = initializePopupAvatarEdit();
const formValidatorEdit = new FormValidator(validateConfig, blocks.popupFormEdit);
const formValidatorAdd = new FormValidator(validateConfig, blocks.popupFormAdd);
const formValidatorAvatar = new FormValidator(validateConfig, blocks.popupFormAvatar);

// Установка исходных изображений
blocks.logo.src = logo;
blocks.avatarEditButtonIcon.src = editButton;

// Включение обработчиков событий
setEventListeners();

// Загрузка данных с сервера и инициализация приложения
ApiClient.getInitialData()
.then(([userData, cardsData]) => {
	userId = userData._id;
	cardsSection.renderItems(cardsData, false);
	userInfo.setUserInfo(userData.name, userData.about);
	userInfo.setAvatar(userData.avatar);
})
.catch((err) => console.error(err))
.finally(() => {
	enableValidation();
});

// Функции для инициализации компонентов
function initializeUserInfo () {
	return new UserInfo({
		userNameElementSelector: '.profile__title',
		userAboutElementSelector: '.profile__text',
		avatarSelector: '.profile__avatar-image',
	});
}

function initializeaddFormPopup () {
	return new PopupWithForm('.popup_type_add', (item) => {
		ApiClient.addNewCard(item.title, item.url)
		.then(res => {
			cardsSection.renderItems([res], true);
			addFormPopup.close();
		})
		.catch((err) => console.error(err))
		.finally(() => addFormPopup.renderLoading(false));
	});
}

function initializeEditProfilePopup () {
	const popup = new PopupWithForm('.popup_type_edit', (data) => {
		ApiClient.updateProfile(data.name, data.about)
		.then((userData) => {
			userInfo.setUserInfo(userData.name, userData.about);
			popup.close();
		})
		.catch((err) => console.error(err))
		.finally(() => {
			popup.renderLoading(false);
		});
	});
	return popup;
}

function initializePopupAvatarEdit () {
	const popup = new PopupWithForm('.popup_type_avatar-edit', (data) => {
		ApiClient.updateAvatar(data.avatar)
		.then((userData) => {
			userInfo.setAvatar(userData.avatar);
			popup.close();
		})
		.catch((err) => console.error(err))
		.finally(() => {
			popup.renderLoading(false);
		});
	});
	return popup;
}

// Функция для установки обработчиков событий
function setEventListeners () {
	addFormPopup.setEventListeners();
	popupWithImage.setEventListeners();
	popupAvatarEdit.setEventListeners();
	popupWithSubmit.setEventListeners();
	editProfilePopup.setEventListeners();
	blocks.editBtn.addEventListener('click', () => openEditProfilePopup());
	blocks.avatar.addEventListener('click', () => {
		formValidatorAvatar.resetValidation();
		formValidatorAvatar.toggleSubmitButton(true);
		popupAvatarEdit.open();
	});
	blocks.addBtn.addEventListener('click', () => {
		formValidatorAdd.toggleSubmitButton(true);
		formValidatorAdd.resetValidation();
		addFormPopup.open();
	});
}

// Функция создания карточки и установки слушателей
function createCard (item, userId) {
	return new Card({
		data: {
			id: item._id,
			name: item.name,
			link: item.link,
			likes: item.likes,
			ownerId: item.owner._id,
			userId,
		},
		callbacks: {
			handleCardClick: () => {
				popupWithImage.open({ src: item.link, alt: item.name });
			},
			handleDeleteButtonClick: function () {
				popupWithSubmit.setSubmitAction(_ => {
					ApiClient.deleteCard(this._id)
					.then(_ => {
						this._cardElement.remove();
						popupWithSubmit.close();
					})
					.catch((err) => console.error(err));
				});
				popupWithSubmit.open();
			},
			handleLikeClick: function () {
				ApiClient.toggleLike(this._id, !this.isLiked())
				.then(res => {
					this.setLikes(res.likes);
				})
				.catch((err) => console.error(err));
			},
		},
	}, '#element-template').make();
}

function openEditProfilePopup () {
	formValidatorEdit.resetValidation();
	const currentUserInfo = userInfo.getUserInfo();
	blocks.popupName.value = currentUserInfo.name;
	blocks.popupDescription.value = currentUserInfo.about;
	editProfilePopup.open();
}

// Включить валидацию всех форм
function enableValidation () {
	formValidatorEdit.enableValidation();
	formValidatorAdd.enableValidation();
	formValidatorAvatar.enableValidation();
}
