// настройки по умолчанию
let validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-message_active'
};

// показываем сообщение об ошибке для указанного инпута
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-message`);
    inputElement.classList.add(validateConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validateConfig.errorClass);
};

// скрываем сообщение об ошибке для указанного инпута
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-message`);
    inputElement.classList.remove(validateConfig.inputErrorClass);
    errorElement.classList.remove(validateConfig.errorClass);
    errorElement.textContent = '';
};

// если есть ошибки - показываем сообщение, иначе скрываем
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

// есть ли в указанных инпутах хотя бы одна ошибка валидации
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// если в форме есть ошибки, выключаем submit, иначе включаем
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        disableSubmit(buttonElement, true);
    } else {
        disableSubmit(buttonElement, false);
    }
};

// выключить/выключить кнопку submit
const disableSubmit = (buttonElement, isDisabled) => {
    if (isDisabled) {
        buttonElement.classList.add(validateConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validateConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

// валидация указанной формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
    const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

// включить валидацию всех форм
const enableValidation = (config) => {
    validateConfig = Object.assign(validateConfig, config);
    const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};