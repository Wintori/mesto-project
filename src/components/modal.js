import {
    profileName,
    profileAbout,
    editNameInput,
    editAboutInput,
    postNameInput,
    postLinkInput,
    imageZoom,
    captionZoom,
    popupAddPost,
    popupEditor,
    popupZoom,
    popups,
    popupAddPostOpenButton,
    popupAddPostCloseButton,
    popupEditProfileOpenButton,
    popupEditProfileCloseButton,
    popupZoomPostCloseButton,
    popupAvatar,
    popupPatchAvatarOpenButton,
    popupPatchAvatarCloseButton,
    avatarLinkInput,
} from "./utils.js"

import { disableButton, resetForm } from "./validate.js"

popupAddPostCloseButton.addEventListener("click", () =>
    popupAddPost.classList.remove("popup_opened")
)

popupEditProfileOpenButton.addEventListener("click", openEditorPopup)
popupEditProfileCloseButton.addEventListener("click", () =>
    popupEditor.classList.remove("popup_opened")
)

popupZoomPostCloseButton.addEventListener("click", () =>
    popupZoom.classList.remove("popup_opened")
)

popupPatchAvatarOpenButton.addEventListener("click", openAvatarPopup)
popupPatchAvatarCloseButton.addEventListener("click", () =>
    popupAvatar.classList.remove("popup_opened")
)

function openPopup(popup) {
    popup.classList.add("popup_opened")
}

function closePopup(popup) {
    popup.classList.remove("popup_opened")
}

function closeAddPopup(popup) {
    closePopup(popupAddPost)
}

function closeEditPopup(popup) {
    closePopup(popupEditor)
}

function openEditorPopup() {
    editNameInput.value = profileName.textContent
    editAboutInput.value = profileAbout.textContent
    openPopup(popupEditor)
}

function openZoomPopup(evt) {
    imageZoom.src = evt.target.src
    imageZoom.alt = evt.target.alt
    captionZoom.textContent = evt.target.alt
    openPopup(popupZoom)
}

function openPostPopup() {
    disableButton(popupAddPost.querySelector('.button-save'))
    const errorList = popupAddPost.querySelectorAll('.popup__input-error')
    const inputsList = popupAddPost.querySelectorAll('.popup__input')
    resetForm(errorList, inputsList)
    postNameInput.value = null
    postLinkInput.value = null
    openPopup(popupAddPost)
}


function openAvatarPopup() {
    disableButton(popupAvatar.querySelector('.button-save'))
    const errorList = popupAvatar.querySelectorAll('.popup__input-error')
    const inputsList = popupAvatar.querySelectorAll('.popup__input')
    resetForm(errorList, inputsList)
    avatarLinkInput.value = null
    openPopup(popupAvatar)
}

function closeAvatarPopup() {
    closePopup(popupAvatar)
}

function closeOnEsc(evt) {
    if (evt.keyCode === 27) {
        popups.forEach((popup) => {
            closePopup(popup)
        })
    }
}

function closeOnClick(evt) {
    if (
        evt.target.classList.contains("popup") && !evt.target.classList.contains("popup__container")
    )
        popups.forEach((popup) => {
            closePopup(popup)
        })
}


document.addEventListener("click", closeOnClick)
document.addEventListener("keydown", closeOnEsc)
popupAddPostOpenButton.addEventListener("click", openPostPopup)




export {
    openPopup,
    closePopup,
    openEditorPopup,
    openZoomPopup,
    openPostPopup,
    closeOnEsc,
    closeOnClick,
    closeEditPopup,
    closeAddPopup,
    closeAvatarPopup,
}