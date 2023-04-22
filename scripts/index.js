import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { blocks, initialCards, validateConfig } from './constants.js';

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
export const openImgPopup = (event) => {
	openPopup(blocks.popupImg);

	const title = event.target.closest('.element').querySelector('.element__title').textContent;
	const url = event.target.src;
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
	new FormValidator(validateConfig, event.target).toggleSubmitButton(true);
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
	document.querySelectorAll(validateConfig.formSelector).forEach((formElement) => {
		new FormValidator(validateConfig, formElement).enableValidation();
	});
};

initCards();
addPopupOverlayListener();
initForms();
enableValidation();
