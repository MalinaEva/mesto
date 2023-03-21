const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const closeBtns = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const popupFormEdit = document.querySelector('.popup__form_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupTitle = document.querySelector('.popup__input_type_title');
const popupUrl = document.querySelector('.popup__input_type_url');
const popupFormAdd = document.querySelector('.popup__form_add');
const popupImg = document.querySelector('.popup_type_img');
const popupImgTitle = popupImg.querySelector('.popup__title');
const popupImgImage = popupImg.querySelector('.popup__image');
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const elementTemplate = document.getElementById('element-template');
const elements = document.querySelector('.elements');
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

// открыть попап
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleModalEsc);
}

// открыть попап редактирования профиля
const editPopupOpen = () => {
    popupName.value = profileTitle.textContent;
    popupDescription.value = profileText.textContent;
    openPopup(popupEdit);
}

// открыть попап добавления
const addPopupOpen = () => {
    openPopup(popupAdd);
}

// открыть попап с фото
const openImgPopup = event => {
    openPopup(popupImg);

    const title = event.target.closest('.element').querySelector('.element__title').textContent;
    const url = event.target.src;
    popupImgTitle.textContent = title;
    popupImgImage.src = url;
    popupImgImage.alt = title;
}

// слушатель для удаления карточки
const listenerDelButton = card => {
    const delBtn = card.querySelector('.element__button-del');
    
    delBtn.addEventListener('click', event => {
        event.target.closest('.element').remove();
    });
}

// слушатель для открытия попапа с фото
const listenerPopupImage = card => {
    const elementImage = card.querySelector('.element__img');

    elementImage.addEventListener('click', event => {
        openImgPopup(event);
    });
}

// слушатель для лайка
const listenerLikeButton = (card) => {
    const likeButton = card.querySelector('.element__button-like');
    
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__button-like_active');
    });
}

// слушатель для закрытия попапов при клике на оверлей
const listenerPopupOverlay = () => {
    popups.forEach(popup => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup();
            }
        });
    });
}

// закрыть все попапы
const closePopup = () => {
    popups.forEach(popup => {
        popup.classList.remove('popup_opened');
    });
    document.removeEventListener('keydown', handleModalEsc);
}

// создание карточки
const createCard = item => {
    const cardElement = elementTemplate.cloneNode(true).content;
    const elementName = cardElement.querySelector('.element__title');
    const elementImg = cardElement.querySelector('.element__img');
    elementName.textContent = item.name;
    elementImg.alt = item.name;
    elementImg.src = item.link;

    listenerDelButton(cardElement);
    listenerPopupImage(cardElement);
    listenerLikeButton(cardElement);

    return cardElement;
}

// вставка карточки
const addCard = item => {
    const cardElement = createCard(item);
    elements.prepend(cardElement);
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
    profileTitle.textContent = popupName.value;
    profileText.textContent = popupDescription.value;
    closePopup();
}

// отправка формы добавления карточки
const submitAddCard = (event) => {
    event.preventDefault();
    addCard({ name: popupTitle.value, link: popupUrl.value });
    const submitBtn = event.target.querySelector('.popup__button-submit');
    disableSubmit(submitBtn, true);
    event.target.reset();
    closePopup();
}

// обработчик для события нажатия Esc в модалках
const handleModalEsc = (event) => {
    if (event.key === 'Escape') {
        closePopup();
    }
}

// слушатель для открытия попапа редактирования профиля
editBtn.addEventListener('click', () => { editPopupOpen() });

// слушатель для закрытия попапов
closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => { closePopup() });
});

// слушатель для сохранения редактирования профиля
popupFormEdit.addEventListener('submit', submitEditProfile);


// слушатель для открытия попапа редактирования профиля
addBtn.addEventListener('click', () => {
    addPopupOpen();
});

// слушатель для добавления новой карточки
popupFormAdd.addEventListener('submit', submitAddCard);

document.addEventListener('DOMContentLoaded', () => {
    initCards();
    listenerPopupOverlay();
    
    // включение валидации форм
    enableValidation({
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button-submit',
        inactiveButtonClass: 'popup__button-submit_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-message_active'
    });
});