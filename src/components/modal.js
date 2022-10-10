import {
    popups,
} from "./utils.js"

function openPopup(popup) {
    popup.classList.add("popup_opened")
    document.addEventListener("keydown", closeOnEsc)
    document.addEventListener("click", closeOnClick)
}

function closePopup(popup) {
    popup.classList.remove("popup_opened")
    document.removeEventListener("keydown", closeOnEsc)
    document.removeEventListener("click", closeOnClick)
}


function closeOnEsc(evt) {
    if (evt.keyCode === 27) {
        if (document.querySelector('.popup_opened')) {
            document.querySelector('.popup_opened').classList.remove("popup_opened")
        }
    }
}

function closeOnClick(evt) {
    if (evt.target.classList.contains("popup") && !evt.target.classList.contains("popup__container")) {
        evt.target.classList.remove("popup_opened")
    }
}

export {
    openPopup,
    closePopup,
    closeOnEsc,
    closeOnClick,
}