import { disableSubmit } from './utils.js'

export class FormValidator {
	constructor (config, formElement) {
		this._config = config;
		this._formElement = formElement;
		this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
		this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
	}

	enableValidation() {
		this._toggleButtonState();

		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
	}

	// если в форме есть ошибки, выключаем submit, иначе включаем
	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			disableSubmit(this._config, this._buttonElement, true);
		} else {
			disableSubmit(this._config, this._buttonElement, false);
		}
	}

	// есть ли в указанных инпутах хотя бы одна ошибка валидации
	_hasInvalidInput() {
		return this._inputList.some((inputElement) => !inputElement.validity.valid);
	}

	// если есть ошибки - показываем сообщение, иначе скрываем
	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}

	_showInputError(inputElement, errorMessage) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-message`);
		inputElement.classList.add(this._config.inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._config.errorClass);
	}

// скрываем сообщение об ошибке для указанного инпута
	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(`#${inputElement.id}-message`);
		inputElement.classList.remove(this._config.inputErrorClass);
		errorElement.classList.remove(this._config.errorClass);
		errorElement.textContent = '';
	}
}
