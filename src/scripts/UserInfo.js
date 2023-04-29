export class UserInfo {
	constructor({ userNameSelector, userAboutElement }) {
		this._userNameElement = document.querySelector(userNameSelector);
		this._userAboutElement = document.querySelector(userAboutElement);
	}

	// Метод для получения информации о пользователе
	getUserInfo() {
		return {
			name: this._userNameElement.textContent,
			about: this._userAboutElement.textContent
		};
	}

	// Метод для установки новой информации о пользователе
	setUserInfo({ name, about }) {
		this._userNameElement.textContent = name;
		this._userAboutElement.textContent = about;
	}
}
