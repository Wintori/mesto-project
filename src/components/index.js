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
    profile,
    userAvatar,
    avatarLinkInput,
    formAvatarElement,
    popupAddPost,
    popupEditor,
    popupAvatar,
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

import { enableValidation } from "./validate.js"

import {
    closeAddPopup,
    closeEditPopup,
    closeAvatarPopup,
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

function formSubmitAddHandler(evt) {
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

function formSubmitEditHandler(evt) {
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


function formSubmitAvatarHandler(evt) {
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


formEditElement.addEventListener("submit", formSubmitEditHandler)
formAddElement.addEventListener("submit", formSubmitAddHandler)
formAvatarElement.addEventListener("submit", formSubmitAvatarHandler)