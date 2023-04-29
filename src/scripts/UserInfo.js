export class UserInfo {
	constructor({ userNameElementSelector, userAboutElementSelector }) {
		this._userNameElement = document.querySelector(userNameElementSelector);
		this._userAboutElement = document.querySelector(userAboutElementSelector);
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
