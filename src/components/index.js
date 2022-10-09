import "../pages/index.css"

import {
    postsList,
    formEditElement,
    formAddElement,
    editNameInput,
    editAboutInput,
    postNameInput,
    postLinkInput,
    profileName,
    profileAbout,
    userAvatar,
    avatarLinkInput,
    formAvatarElement,
    popupAddPost,
    popupEditor,
    popupAvatar,
    popupAddPostCloseButton,
    popupEditProfileOpenButton,
    popupEditProfileCloseButton,
    popupZoomPostCloseButton,
    popupPatchAvatarOpenButton,
    popupPatchAvatarCloseButton,
    popupAddPostOpenButton,
    imageZoom,
    captionZoom,
    popupZoom,
} from "./utils.js"

import {
    getInformationAbout,
    getInitialCards,
    postCard,
    postUserAvatar,
    postUserInformation,
} from "./api.js"

import {
    createNewPost,
} from './card.js'

import { enableValidation, resetForm, disableButton } from "./validate.js"

import {
    openPopup,
    closePopup,
} from "./modal.js"

let myId

Promise.all([getInformationAbout(), getInitialCards()])
    .then((data) => {
        editNameInput.textContent = data[0].name
        editAboutInput.textContent = data[0].about
        profileName.textContent = data[0].name
        profileAbout.textContent = data[0].about
        userAvatar.src = data[0].avatar
        avatarLinkInput.value = ''
        myId = data[0]._id
        data[1].forEach((item) => {
            const post = createNewPost(item.name, item.link, item.owner._id, myId, item._id, item.likes)
            postsList.append(post)
        })
    })

enableValidation({
    formSelector: '.popup__person-information',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button-save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
});

function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение..."
    }
    else {
        button.textContent = "Сохранить"
    }
}

function AddCardHandler(evt) {
    evt.preventDefault()
    const button = popupAddPost.querySelector('.button-save');
    renderLoading(true, button)
    const cardName = postNameInput.value
    const cardLink = postLinkInput.value
    postCard(cardName, cardLink)
        .then((res) => {
            const post = createNewPost(res.name, res.link, res.owner._id, myId, res._id, res.likes)
            postsList.prepend(post)
            closeAddPopup()
        })
        .finally(() => {
            renderLoading(false, button);
        });
}

function EditProfileHandler(evt) {
    evt.preventDefault()
    const button = popupEditor.querySelector('.button-save');
    renderLoading(true, button)
    const editName = editNameInput.value;
    const editAbout = editAboutInput.value;
    postUserInformation(editName, editAbout)
        .then((res) => {
            profileName.textContent = res.name
            profileAbout.textContent = res.about
            closeEditPopup()
        })
        .finally(() => {
            renderLoading(false, button);
        });
}


function PatchAvatarHandler(evt) {
    evt.preventDefault()
    const button = popupAvatar.querySelector('.button-save');
    renderLoading(true, button)
    const avatarLink = avatarLinkInput.value
    postUserAvatar(avatarLink)
        .then((res) => {
            userAvatar.src = avatarLink;
            closeAvatarPopup()
        })
        .finally(() => {
            renderLoading(false, button);
        });
}


function openAvatarPopup() {
    disableButton(popupAvatar.querySelector('.button-save'))
    
    resetForm(popupAvatar, {
        inputSelector: '.popup__input',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active',
        errorSpanSelector: '.popup__input-error'
    })

    avatarLinkInput.value = null
    openPopup(popupAvatar)
}

function closeAvatarPopup() {
    closePopup(popupAvatar)
}

function openPostPopup() {
    disableButton(popupAddPost.querySelector('.button-save'))
    

    resetForm(popupAddPost, {
        inputSelector: '.popup__input',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active',
        errorSpanSelector: '.popup__input-error'
    })

    postNameInput.value = null
    postLinkInput.value = null
    openPopup(popupAddPost)
}

function closeAddPopup() {
    closePopup(popupAddPost)
}

function openZoomPopup(evt) {
    imageZoom.src = evt.target.src
    imageZoom.alt = evt.target.alt
    captionZoom.textContent = evt.target.alt
    openPopup(popupZoom)
}

function closeZoomPopup() {
    closePopup(popupZoom)
}

function openEditorPopup() {
    editNameInput.value = profileName.textContent
    editAboutInput.value = profileAbout.textContent
    openPopup(popupEditor)
}

function closeEditPopup() {
    closePopup(popupEditor)
}



popupAddPostOpenButton.addEventListener("click", openPostPopup)
popupAddPostCloseButton.addEventListener("click", closeAddPopup)

popupEditProfileOpenButton.addEventListener("click", openEditorPopup)
popupEditProfileCloseButton.addEventListener("click", closeEditPopup)

popupZoomPostCloseButton.addEventListener("click", closeZoomPopup)

popupPatchAvatarOpenButton.addEventListener("click", openAvatarPopup)
popupPatchAvatarCloseButton.addEventListener("click", closeAvatarPopup)



formEditElement.addEventListener("submit", EditProfileHandler)
formAddElement.addEventListener("submit", AddCardHandler)
formAvatarElement.addEventListener("submit", PatchAvatarHandler)

export { openZoomPopup }