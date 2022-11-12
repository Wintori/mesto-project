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
    popupAvatar,
} from "./utils.js"

import {
    api
} from "./api.js"

import Card from './card.js'

import { FormValidator } from "./validate.js"

import {
    openPopup,
    closePopup,
} from "./modal.js"

import UserInfo from "./userInfo.js"

import Section from "./section.js"

let myId

const userInfo = new UserInfo({profileName,profileAbout})

function newRender() {

}

const items = {}

const section = new Section({items, newRender}, postsList)

// селекторы попапов
const validObj = {
    formSelector: '.popup__person-information',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button-save',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    errorSpanSelector: '.popup__input-error'
}

Promise.all([api.getInformationAbout(), api.getInitialCards()])
    .then((data) => {
        editNameInput.textContent = data[0].name
        editAboutInput.textContent = data[0].about
        profileName.textContent = data[0].name
        profileAbout.textContent = data[0].about
        userAvatar.src = data[0].avatar
        avatarLinkInput.value = ''
        myId = data[0]._id
        data[1].forEach((item) => {
            const post = new Card(item.name, item.link, item.owner._id, myId, item._id, item.likes, '.posts__post')
            // postsList.append(post.createNewPost())
            section.addItem(post.createNewPost())
        })
    })
    .catch((error) => {
        console.log(error);
    })

const defaultValidate = new FormValidator(validObj)
defaultValidate.enableValidation()

// изменение надписи кнопки при загрузке
function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение..."
    }
    else {
        button.textContent = "Сохранить"
    }
}


// добавление новой карточки
function addCardHandler(evt) {
    evt.preventDefault()
    const button = popupAddPost.querySelector('.button-save');
    renderLoading(true, button)
    const cardName = postNameInput.value
    const cardLink = postLinkInput.value
    api.postCard(cardName, cardLink)
        .then((res) => {
            const post = new Card(res.name, res.link, res.owner._id, myId, res._id, res.likes, '.posts__post')
            // postsList.append(post.createNewPost())
            section.addItem(post.createNewPost(), false)
            closeAddPopup()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, button);
        });
}

// изменение информации профиля
function editProfileHandler(evt) {
    evt.preventDefault()
    const button = popupEditor.querySelector('.button-save');
    renderLoading(true, button)
    const editName = editNameInput.value;
    const editAbout = editAboutInput.value;
    api.postUserInformation(editName, editAbout)
        .then((res) => {
            userInfo.setUserInfo(res)
            closeEditPopup()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, button);
        });
}


// смена аватара профиля
function patchAvatarHandler(evt) {
    evt.preventDefault()
    const button = popupAvatar.querySelector('.button-save');
    renderLoading(true, button)
    const avatarLink = avatarLinkInput.value
    api.postUserAvatar(avatarLink)
        .then(() => {
            userAvatar.src = avatarLink;
            closeAvatarPopup()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, button);
        });
}

// const popupImage = new PopupWithImage(selectorsPopupWindow);
// const popupEditForm = new PopupWithForm(popupEditor, editProfileHandler);
// const popupAvatarForm = new PopupWithForm(popupAvatar, patchAvatarHandler);
// const popupPostForm = new PopupWithForm(popupAddPost, addCardHandler);

// открытие попапа аватар
function openAvatarPopup() {
    let avatarValidate = new FormValidator(validObj, popupAvatar)
    avatarValidate.resetForm()
    avatarLinkInput.value = ""
    openPopup(popupAvatar)
}

// закрытие попапа аватар
function closeAvatarPopup() {
    closePopup(popupAvatar)
}

// открытие попапа добавление поста
function openPostPopup() {
    let postValidate = new FormValidator( {
        inputSelector: '.popup__input',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_active',
        errorSpanSelector: '.popup__input-error'
    }, popupAddPost)
    postValidate.resetForm()

    postNameInput.value = ""
    postLinkInput.value = ""
    openPopup(popupAddPost)
}

// закрытие попапа добавление поста
function closeAddPopup() {
    closePopup(popupAddPost)
}

// закрытие попапа зум
function closeZoomPopup() {
    closePopup(popupZoom)
}

// открытие попапа редактирования профиля
function openEditorPopup() {
    editNameInput.value = profileName.textContent
    editAboutInput.value = profileAbout.textContent
    openPopup(popupEditor)
}

// закрытие попапа редактирования профиля
function closeEditPopup() {
    closePopup(popupEditor)
}

// -----------Слушатели-----------


// ----------popups-------------
popupAddPostOpenButton.addEventListener("click", openPostPopup)
popupAddPostCloseButton.addEventListener("click", closeAddPopup)

popupEditProfileOpenButton.addEventListener("click", openEditorPopup)
popupEditProfileCloseButton.addEventListener("click", closeEditPopup)

popupZoomPostCloseButton.addEventListener("click", closeZoomPopup)

popupPatchAvatarOpenButton.addEventListener("click", openAvatarPopup)
popupPatchAvatarCloseButton.addEventListener("click", closeAvatarPopup)


// ------------buttons------------------ 

// добавление обработчика кнопки редактирование профиля
formEditElement.addEventListener("submit", editProfileHandler)
// добавление обработчика кнопки добавить карточку
formAddElement.addEventListener("submit", addCardHandler)
// добавление обработчика кнопки сменить аватар
formAvatarElement.addEventListener("submit", patchAvatarHandler)





// popupAvatarForm.setEventListeners();
// popupPostForm.setEventListeners();
// popupEditForm.setEventListeners();