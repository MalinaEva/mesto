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
const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');
const elementTemplate = document.getElementById('element-template');
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

// открыть попап редактирования профиля
const editPopupOpen = () => {
    popupName.value = profileTitle.textContent;
    popupDescription.value = profileText.textContent;
    popupEdit.classList.add('popup_opened');
}

// открыть попап добавления
const addPopupOpen = () => {
    popupAdd.classList.add('popup_opened');
}

// открыть попап с фото
const imgPopupOpen = event => {
    popupImg.classList.add('popup_opened');

    const title = event.target.parentNode.querySelector('.element__title').textContent;
    const url = event.target.src;
    document.querySelector('.popup_type_img .popup__title').textContent = title;
    document.querySelector('.popup_type_img .popup__image').src = url;
}

// слушатель для удаления карточки
const delButtonListener = () => {
    const delBtn = document.querySelector('.element__button-del');
    
    delBtn.addEventListener('click', event => {
        event.target.parentNode.remove();
    });
}

// слушатель для открытия попапа с фото
const popupImageListener = () => {
    const elementImage = document.querySelector('.element__img');

    elementImage.addEventListener('click', event => {
        imgPopupOpen(event);
    });
}

// слушатель для лайка
const likeButtonListener = () => {
    const likeButton = document.querySelector('.element__button-like');
    
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__button-like_active');
    });
}

// закрыть все попапы
const popupClose = () => {
    popups.forEach(popup => {
        popup.classList.remove('popup_opened');
    });
}

// добавление карточки
const addCard = (name, url) => {
    let template = elementTemplate.cloneNode(true).content;
    const elementName = template.querySelector('.element__title');
    const elementImg = template.querySelector('.element__img');
    elementName.textContent = name;
    elementImg.alt = name;
    elementImg.src = url;
    document.querySelector('.elements').prepend(template);

    delButtonListener();
    popupImageListener();
    likeButtonListener();
}

// добавление стартовых карточек
const initCards = () => {
    initialCards.forEach(card => {
        addCard(card.name, card.link);
    });
}

// слушатель для открытия попапа редактирования профиля
editBtn.addEventListener('click', () => { editPopupOpen() });

// слушатель для закрытия попапов
closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => { popupClose() });
});

// слушатель для сохранения редактирования профиля
popupFormEdit.addEventListener('submit', event => {
    event.preventDefault();
    profileTitle.textContent = popupName.value;
    profileText.textContent = popupDescription.value;
    popupClose();
});

// слушатель для открытия попапа редактирования профиля
addBtn.addEventListener('click', () => {
    addPopupOpen();
});

// слушатель для добавления новой карточки
popupFormAdd.addEventListener('submit', event => {
    event.preventDefault();
    addCard(popupTitle.value, popupUrl.value);
    popupClose();
});

document.addEventListener('DOMContentLoaded', () => {
    initCards();
});