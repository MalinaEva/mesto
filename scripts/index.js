import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { disableSubmit } from './utils.js';
import { blocks, initialCards, validateConfig } from './constants.js';

// открыть попап
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleModalEsc);
}

// открыть попап редактирования профиля
const editPopupOpen = () => {
    blocks.popupName.value = blocks.profileTitle.textContent;
    blocks.popupDescription.value = blocks.profileText.textContent;
    openPopup(blocks.popupEdit);
}

// открыть попап добавления
const addPopupOpen = () => {
    openPopup(blocks.popupAdd);
}

// слушатель для закрытия попапов при клике на оверлей
const listenerPopupOverlay = () => {
    blocks.popups.forEach(popup => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(evt.target);
            }
        });
    });
}

// слушатель для открытия попапа с фото
export const listenerPopupImage = (card) => {
	const elementImage = card.querySelector('.element__img');

	elementImage.addEventListener('click', event => {
		openImgPopup(event);
	});
}

// открыть попап с фото
const openImgPopup = (event) => {
	openPopup(blocks.popupImg);

	const title = event.target.closest('.element').querySelector('.element__title').textContent;
	const url = event.target.src;
	blocks.popupImgTitle.textContent = title;
	blocks.popupImgImage.src = url;
	blocks.popupImgImage.alt = title;
}


// закрыть все попапы
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleModalEsc);
}

// вставка карточки
const addCard = item => {
    const cardElement = new Card(item, '#element-template').make();
    blocks.elements.prepend(cardElement);
}

// добавление стартовых карточек
const initCards = () => {
    initialCards.forEach(card => {
        addCard(card);
    });
}

// отправка формы редактирования профиля
const submitEditProfile = (event) => {
    event.preventDefault();
    blocks.profileTitle.textContent = blocks.popupName.value;
    blocks.profileText.textContent = blocks.popupDescription.value;
    closePopup(blocks.popupEdit);
}

// отправка формы добавления карточки
const submitAddCard = (event) => {
    event.preventDefault();
    addCard({ name: blocks.popupTitle.value, link: blocks.popupUrl.value });
    disableSubmit(validateConfig, event.submitter, true);
    event.target.reset();
    closePopup(blocks.popupAdd);
}

// обработчик для события нажатия Esc в модалках
const handleModalEsc = (event) => {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup.popup_opened');
        closePopup(openedPopup);
    }
}

// слушатель для открытия попапа редактирования профиля
blocks.editBtn.addEventListener('click', () => { editPopupOpen() });

// слушатель для закрытия попапов
blocks.closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', (event) => {
        const openedPopup = event.target.closest('.popup');
        closePopup(openedPopup);
    });
});

// слушатель для сохранения редактирования профиля
blocks.popupFormEdit.addEventListener('submit', submitEditProfile);

// слушатель для открытия попапа редактирования профиля
blocks.addBtn.addEventListener('click', () => {
    addPopupOpen();
});

// слушатель для добавления новой карточки
blocks.popupFormAdd.addEventListener('submit', submitAddCard);

// включить валидацию всех форм
const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
	formList.forEach((formElement) => {
		new FormValidator(validateConfig, formElement).enableValidation();
	});
};

document.addEventListener('DOMContentLoaded', () => {
    initCards();
    listenerPopupOverlay();
    
    // включение валидации форм
    enableValidation();
});
