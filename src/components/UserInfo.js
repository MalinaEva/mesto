export class UserInfo {
	constructor ({ userNameElementSelector, userAboutElementSelector, avatarSelector }) {
		this._userNameElement = document.querySelector(userNameElementSelector);
		this._userAboutElement = document.querySelector(userAboutElementSelector);
		this._avatarElement = document.querySelector(avatarSelector);
	}

	// Метод для получения информации о пользователе
	getUserInfo () {
		return {
			name: this._userNameElement.textContent,
			about: this._userAboutElement.textContent,
			avatar: this._avatarElement.src,
		};
	}

	// Метод для установки новой информации о пользователе
	setUserInfo (name, about) {
		this._userNameElement.textContent = name;
		this._userAboutElement.textContent = about;
	}

	setAvatar (avatar) {
		this._avatarElement.src = avatar;
	}
}
