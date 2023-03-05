const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__button-close');

const profileTitle = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__text');

const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');
const popupForm = document.querySelector('.popup__form');

// const likeButtons = document.querySelectorAll('.element__button-like');

editBtn.addEventListener('click', function () {
    popupName.value = profileTitle.textContent;
    popupDescription.value = profileText.textContent;
    popup.classList.add('popup_opened');
});

closeBtn.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

popupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    profileTitle.textContent = popupName.value;
    profileText.textContent = popupDescription.value;
    popup.classList.remove('popup_opened');
});

// likeButtons.forEach(function (like) {
//     like.addEventListener('click', function () {
//         like.classList.toggle('element__button-like_active');
//     });
// })