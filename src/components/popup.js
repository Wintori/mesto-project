export default class Popup {
    constructor(popupSelector) {
        this._popup = document.getElementById(popupSelector).parentNode
        this.close = this.close.bind(this)
    }

    open () {
        this._popup.classList.add("popup_opened")
        document.addEventListener("keydown", this._handleEscClose)
    }
    
    close ()  {
        this._popup.classList.remove("popup_opened")
        document.removeEventListener("keydown", this._handleEscClose)
    }

    // закрытие открытого попапа на esc
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            if (document.querySelector('.popup_opened')) {
                document.querySelector('.popup_opened').classList.remove("popup_opened")
            }
        }
    }

    // закрытие открытого попапа на overlay
    _handleOutClose = (evt) => {
        if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("button-close")) {
            this.close()
        }
    }

    setEventListeners () {
        this._popup.addEventListener("click", (evt) => this._handleOutClose(evt))
    }

}