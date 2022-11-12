class PopupWithForm extends Popup {
    constructor(popup, callback) {
        super(popup)
        this.callback = callback
        this.inputList = this.popup.querySelectorAll(".popup__input")
        this.button = this.popup.querySelector(".button-save")
        this.formPopup = this.popup.querySelector(".popup__person-information")
    }

    _getInputValues() {
        let inputValuesList = []
        this.inputList.forEach((item) => {
            inputValuesList.push(item.value)
        })

        return inputValuesList
    }

    setEventListeners() {
        super.setEventListeners()
        // обработчик сабмита форм
        this.formPopup.addEventListener("submit", (evt) => {
            evt.preventDefault();
          });
    }

    close() {
        super.close()
        // при закрытии попапа форма должна ещё и сбрасываться. resetForm
        let popupValidate = new FormValidator( {
            formSelector: '.popup__person-information',
            inputSelector: '.popup__input',
            submitButtonSelector: '.button-save',
            inactiveButtonClass: 'button_inactive',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__input-error_active',
            errorSpanSelector: '.popup__input-error'
        }, this.popup)
        popupValidate.resetForm()
    }
}