import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        super(popupSelector)
        this._callback = callback
        this._inputList = this._popup.querySelectorAll(".popup__input")
        this._button = this._popup.querySelector(".button-save")
        this._formPopup = this._popup.querySelector(".popup__person-information")
    }

    _getInputValues () {
        const inputValuesList = []
        this._inputList.forEach((item) => {
            inputValuesList.push(item.value)
        })

        return inputValuesList
    }

    setEventListeners () {
        super.setEventListeners()
        // обработчик сабмита форм
        this._formPopup.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._callback(this._getInputValues())
          });
    }

    close ()  {
        super.close()
        // при закрытии попапа форма должна ещё и сбрасываться. resetForm
        this._formPopup.reset()
    }
}