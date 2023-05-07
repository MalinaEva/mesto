import './index.css';
import logo from '../images/logo.svg';
import editButton from '../images/editButton.svg';
import { Section } from '../scripts/Section.js';
import { Card } from '../scripts/Card.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { PopupWithImage } from '../scripts/PopupWithImage.js';
import { PopupWithForm } from '../scripts/PopupWithForm.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Api } from '../scripts/Api.js';
import { apiAccess, blocks, validateConfig } from '../scripts/constants.js';
import { PopupWithSubmit } from '../scripts/PopupWithSubmit';

const ApiClient = new Api(apiAccess);
const userInfo = new UserInfo({
	userNameElementSelector: '.profile__title',
	userAboutElementSelector: '.profile__text',
	avatarSelector: '.profile__avatar-image',
});
const popupWithImage = new PopupWithImage('.popup_type_img');
const popupWithSubmit = new PopupWithSubmit('.popup_type_submit');
const editProfilePopup = new PopupWithForm('.popup_type_edit', (data) => {
	ApiClient.updateProfile(data.name, data.about)
	.then(res => {
		userInfo.setUserInfo(res.name, res.about);
	})
	.catch((err) => console.error(err))
	.finally(() => editProfilePopup.renderLoading(false));
});
const popupAvatarEdit = new PopupWithForm('.popup_type_avatar-edit', (data) => {
	ApiClient.updateAvatar(data.avatar)
	.then(res => {
		userInfo.setAvatar(res.avatar);
	})
	.catch((err) => console.error(err))
	.finally(() => popupAvatarEdit.renderLoading(false));
});
const formValidatorEdit = new FormValidator(validateConfig, blocks.popupFormEdit);
const formValidatorAdd = new FormValidator(validateConfig, blocks.popupFormAdd);
const formValidatorAvatar = new FormValidator(validateConfig, blocks.popupFormAvatar);

blocks.logo.src = logo;
blocks.avatarEditButtonIcon.src = editButton;

popupWithImage.setEventListeners();
editProfilePopup.setEventListeners();
popupWithSubmit.setEventListeners();
popupAvatarEdit.setEventListeners();
blocks.editBtn.addEventListener('click', () => openEditProfilePopup());

blocks.avatar.addEventListener('click', () => {
	const { avatar } = userInfo.getUserInfo();
	blocks.popupAvatar.value = avatar;
	formValidatorAvatar.toggleSubmitButton(false);
	popupAvatarEdit.open();
});

// создание карточки и установка слушателей
const createCard = (item, userId) => {
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
				popupWithSubmit.setSubmitAction(() => {
					ApiClient.deleteCard(this._id)
					.then(_ => {
						this._cardElement.remove();
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
};

const openEditProfilePopup = () => {
	const currentUserInfo = userInfo.getUserInfo();
	blocks.popupName.value = currentUserInfo.name;
	blocks.popupDescription.value = currentUserInfo.about;
	editProfilePopup.open();
};

// включить валидацию всех форм
const enableValidation = () => {
	formValidatorEdit.enableValidation();
	formValidatorAdd.enableValidation();
	formValidatorAvatar.enableValidation();
};

ApiClient.getInitialData()
.then(([userData, cardsData]) => {
	const cardsSection = new Section(
		{
			renderer: (card, prepend) => {
				const cardElement = createCard(card, userData._id);
				cardsSection.addItem(cardElement, prepend);
			},
		},
		'.elements'
	);
	userInfo.setUserInfo(userData.name, userData.about);
	userInfo.setAvatar(userData.avatar);

	return [cardsSection, cardsData];
})
.then(([cardsSection, cardsData]) => {
	cardsSection.renderItems(cardsData, false);

	// отправка формы добавления карточки
	const submitAddCard = (item) => {
		ApiClient.addNewCard(item.title, item.url)
		.then(res => {
			cardsSection.renderItems([res], true);
		})
		.catch((err) => console.error(err))
		.finally(() => addFormPopup.renderLoading(false));
	};
	const addFormPopup = new PopupWithForm('.popup_type_add', (item) => submitAddCard(item));
	addFormPopup.setEventListeners();
	blocks.addBtn.addEventListener('click', () => {
		formValidatorAdd.toggleSubmitButton(true);
		addFormPopup.open();
	});
})
.catch((err) => console.error(err))
.finally(() => {
	enableValidation();
});
