// показываем сообщение об ошибке для указанного инпута
const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-message`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// скрываем сообщение об ошибке для указанного инпута
const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-message`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

// если есть ошибки - показываем сообщение, иначе скрываем
const checkInputValidity = (config, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(config, formElement, inputElement);
    }
};

// есть ли в указанных инпутах хотя бы одна ошибка валидации
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// если в форме есть ошибки, выключаем submit, иначе включаем
const toggleButtonState = (config, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        disableSubmit(config, buttonElement, true);
    } else {
        disableSubmit(config, buttonElement, false);
    }
};

// выключить/выключить кнопку submit
const disableSubmit = (config, buttonElement, isDisabled) => {
    if (isDisabled) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

// валидация указанной формы
const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(config, inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(config, formElement, inputElement);
            toggleButtonState(config, inputList, buttonElement);
        });
    });
};

// включить валидацию всех форм
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(config, formElement);
    });
};