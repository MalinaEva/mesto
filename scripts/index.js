import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { blocks, initialCards, validateConfig } from './constants.js';

const formValidatorEdit = new FormValidator(validateConfig, blocks.popupFormEdit);
const formValidatorAdd = new FormValidator(validateConfig, blocks.popupFormAdd);

// открыть попап
const openPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleModalEsc);
};

// открыть попап редактирования профиля
const openEditPopup = () => {
	blocks.popupName.value = blocks.profileTitle.textContent;
	blocks.popupDescription.value = blocks.profileText.textContent;
	openPopup(blocks.popupEdit);
};

// открыть попап добавления
const openAddPopup = () => {
	openPopup(blocks.popupAdd);
};

// слушатель для закрытия попапов при клике на оверлей
const addPopupOverlayListener = () => {
	blocks.popups.forEach(popup => {
		popup.addEventListener('click', handlePopupOverlayClick);
	});
};

const handlePopupOverlayClick = (event) => {
	if (event.target.classList.contains('popup_opened')) {
		closePopup(event.target);
	}
}

// открыть попап с фото
export const openImgPopup = (title, url) => {
	openPopup(blocks.popupImg);
	blocks.popupImgTitle.textContent = title;
	blocks.popupImgImage.src = url;
	blocks.popupImgImage.alt = title;
};

// закрыть все попапы
const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleModalEsc);
};

// вставка карточки
const addCard = cardElement => {
	blocks.elements.prepend(cardElement);
};

const createCard = (item) => {
	return new Card(item, '#element-template').make();
};

// добавление стартовых карточек
const initCards = () => {
	initialCards.forEach(card => {
		const cardElement = createCard(card);
		addCard(cardElement);
	});
};

// отправка формы редактирования профиля
const submitEditProfile = (event) => {
	event.preventDefault();
	blocks.profileTitle.textContent = blocks.popupName.value;
	blocks.profileText.textContent = blocks.popupDescription.value;
	closePopup(blocks.popupEdit);
};

// отправка формы добавления карточки
const submitAddCard = (event) => {
	event.preventDefault();
	const cardElement = createCard({ name: blocks.popupTitle.value, link: blocks.popupUrl.value });
	addCard(cardElement);
	formValidatorAdd.toggleSubmitButton(true);
	event.target.reset();
	closePopup(blocks.popupAdd);
};

// обработчик для события нажатия Esc в модалках
const handleModalEsc = (event) => {
	if (event.key === 'Escape') {
		const openedPopup = document.querySelector('.popup.popup_opened');
		closePopup(openedPopup);
	}
};

const initForms = () => {
	// слушатель для открытия попапа редактирования профиля
	blocks.editBtn.addEventListener('click', openEditPopup);

	// слушатель для закрытия попапов
	blocks.closeBtns.forEach(closeBtn => {
		closeBtn.addEventListener('click', handleClosePopup);
	});

	// слушатель для сохранения редактирования профиля
	blocks.popupFormEdit.addEventListener('submit', submitEditProfile);

	// слушатель для открытия попапа редактирования профиля
	blocks.addBtn.addEventListener('click', openAddPopup);

	// слушатель для добавления новой карточки
	blocks.popupFormAdd.addEventListener('submit', submitAddCard);
}

const handleClosePopup = (event) => {
	const openedPopup = event.target.closest('.popup');
	closePopup(openedPopup);
}

// включить валидацию всех форм
const enableValidation = () => {
	formValidatorEdit.enableValidation();
	formValidatorAdd.enableValidation();
};

initCards();
addPopupOverlayListener();
initForms();
enableValidation();
