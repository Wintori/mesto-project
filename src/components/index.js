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

import Api from "./Api.js"
import Card from './Card.js'
import FormValidator from "./FormValidator.js"
import UserInfo from "./UserInfo.js"
import Section from "./Section.js"
import PopupWithForm from "./PopupWithForm.js"
import PopupWithImage from "./PopupWithImage.js"

let myId

// создание профиля нашего пользователя
const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
    headers: {
        authorization: '175227b7-8396-4cce-a64b-f428eae8eca2',
        'Content-Type': 'application/json; charset=UTF-8'
    }
});

const userInfo = new UserInfo(profileName, profileAbout);
const popupImage = new PopupWithImage("popup__imageZoom-container");


// добавление лайка в DOM
function addDomLike(obj, likeCount, likeContainer) {
    if (obj.likes.length == 1) {
        likeCount.style.display = "block"
        likeContainer.style.padding = "22px 0 0 0"
        likeCount.textContent = obj.likes.length;
    } else {
        likeCount.textContent = obj.likes.length
    }
}

// удаление лайка из DOM
function delDomLike(obj, likeCount, likeContainer) {
    if (obj.likes.length == 0) {
        likeCount.style.display = "none"
        likeContainer.style.padding = "30px 0 0 0"
    } else {
        likeCount.textContent = obj.likes.length
    }
}

// удаление карточки из DOM
function delDomCard(evt) {
    evt.target.closest(".posts__post").remove()
}


// удаление лайка с сервера и из DOM
function delLikeHandler(cardId, evt, likeCount, likeContainer) {
    api.deleteLike(cardId)
        .then((res) => {
            evt.target.classList.remove("button-like_active")
            delDomLike(res, likeCount, likeContainer)
        })
        .catch((error) => {
            console.log(error);
        })
}

// добавление лайка на сервер и в DOM
function putLikeHandler(cardId, evt, likeCount, likeContainer) {
    api.putLike(cardId)
        .then((res) => {
            evt.target.classList.add("button-like_active")
            addDomLike(res, likeCount, likeContainer)
        })
        .catch((error) => {
            console.log(error);
        })
}

// удаление карточки с сервера и из DOM
function delCardHandler(cardId, evt) {
    api.deleteCard(cardId)
        .then(() => {
            delDomCard(evt)
        })
        .catch((error) => {
            console.log(error);
        })
}

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

function render(item) {
    postsList.append(item)
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
        const items = []
        data[1].forEach((item) => {
            const post = new Card(item.name, item.link, item.owner._id, myId, item._id, item.likes, '.posts__post', {
                delLikeHandler, putLikeHandler, delCardHandler,

                openZoomHandler: (name, link) => {
                    popupImage.open(name, link)

                }
            })
            items.push(post.createNewPost())
        })
        const section = new Section({ items: items, renderer: render }, postsList)
        section.renderAll()
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
function addCardHandler(obj) {
    const button = popupAddPost.querySelector('.button-save');
    renderLoading(true, button)
    const cardName = postNameInput.value
    const cardLink = postLinkInput.value

    api.postCard(cardName, cardLink)
        .then((res) => {
            const post = new Card(res.name, res.link, res.owner._id, myId, res._id, res.likes, '.posts__post', {
                delLikeHandler, putLikeHandler, delCardHandler, openZoomHandler: (name, link) => {
                    popupImage.open(name, link)
                }
            })
            const section = new Section({}, postsList)
            section.addItem(post.createNewPost(), false)
            popupPostForm.close()
            popupPostFormValidate.resetForm()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, button);
        });
}

// изменение информации профиля
function editProfileHandler() {
    const button = popupEditor.querySelector('.button-save');
    renderLoading(true, button)
    const editName = editNameInput.value;
    const editAbout = editAboutInput.value;

    api.postUserInformation(editName, editAbout)
        .then((res) => {
            userInfo.setUserInfo(res)
            popupEditForm.close()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, button);
        });
}


// смена аватара профиля
function patchAvatarHandler() {
    const button = popupAvatar.querySelector('.button-save');
    renderLoading(true, button)
    const avatarLink = avatarLinkInput.value
    api.postUserAvatar(avatarLink)
        .then(() => {
            userAvatar.src = avatarLink;
            popupAvatarForm.close()
            popupAvatarFormValidate.resetForm()
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            renderLoading(false, button);
        });
}

const popupEditForm = new PopupWithForm("popup__profileEdit-container", editProfileHandler);
const popupAvatarForm = new PopupWithForm("popup__patchAvatar-container", patchAvatarHandler);
const popupPostForm = new PopupWithForm("popup__addPost-container", addCardHandler);

const popupEditFormValidate = new FormValidator(validObj, popupEditor)
const popupAvatarFormValidate = new FormValidator(validObj, popupAvatar)
const popupPostFormValidate = new FormValidator(validObj, popupAddPost)


popupAddPostOpenButton.addEventListener("click", () => {
    popupPostForm.open()
    popupPostFormValidate.resetForm()
})

popupEditProfileOpenButton.addEventListener("click", () => {
    popupEditForm.open()
    const obj = userInfo.getUserInfo()
    editNameInput.value = obj.name
    editAboutInput.value = obj.about
    popupEditFormValidate.resetForm()
})

popupPatchAvatarOpenButton.addEventListener("click", () => {
    popupAvatarForm.open()
    popupAvatarFormValidate.resetForm()
})

popupImage.setEventListeners();
popupAvatarForm.setEventListeners();
popupPostForm.setEventListeners();
popupEditForm.setEventListeners();