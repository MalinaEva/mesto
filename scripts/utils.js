
// выключить/выключить кнопку submit
export const disableSubmit = (config, buttonElement, isDisabled) => {
	if (isDisabled) {
		buttonElement.classList.add(config.inactiveButtonClass);
		buttonElement.disabled = true;
	} else {
		buttonElement.classList.remove(config.inactiveButtonClass);
		buttonElement.disabled = false;
	}
}
