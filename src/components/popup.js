class Popup {
    constructor(popup) {
        this.popup = popup
    }

    open() {
        this.popup.classList.add("popup_opened")
        document.addEventListener("keydown", this._handleEscClose)
        document.addEventListener("click", this._handleOutClose)
    }
    
    close() {
        this.popup.classList.remove("popup_opened")
        // document.removeEventListener("keydown", this._handleEscClose)
        // document.removeEventListener("click", this._handleOutClose)
    }

    // закрытие открытого попапа на esc
    _handleEscClose() {
        if (evt.key === "Escape") {
            if (document.querySelector('.popup_opened')) {
                document.querySelector('.popup_opened').classList.remove("popup_opened")
            }
        }
    }

    // закрытие открытого попапа на overlay
    _handleOutClose(evt) {
        if (evt.target.classList.contains("popup") && !evt.target.classList.contains("popup__container")) {
            evt.target.classList.remove("popup_opened")
        }
    }

    setEventListeners() {
        document.removeEventListener("keydown", this._handleEscClose)
        document.removeEventListener("click", this._handleOutClose)
    }

}