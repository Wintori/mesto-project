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
} from "./utils.js"

import {
    getInformationAbout,
    getInitialCards,
    postCard,
    deleteCard,
    postUserAvatar,
    postUserInformation,
    putLike,
    deleteLike,
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
        console.log(data[1])
        editNameInput.textContent = data[0].name
        editAboutInput.textContent = data[0].about
        userAvatar.src = data[0].avatar
        avatarLinkInput.value = ''
        myId = data[0]._id
        data[1].forEach((item) => {
            const post = createNewPost(item.name, item.link, item.owner._id, myId, item._id, item.likes)
            postsList.append(post)
        })
    })

enableValidation()

function formSubmitAddHandler(evt) {
    evt.preventDefault()
    const cardName = postNameInput.value
    const cardLink = postLinkInput.value
    postCard(cardName, cardLink)
        .then((res) => {
            const post = createNewPost(res.name, res.link, res.owner._id, myId, res._id, res.likes)
            postsList.prepend(post)
            closeAddPopup()
        })
}

function updateUserInfo() {
    getInformationAbout().
        then((result) => {
            profileName.textContent = result.name
            profileAbout.textContent = result.about
        })
}

updateUserInfo()

function formSubmitEditHandler(evt) {
    evt.preventDefault()
    const editName = editNameInput.value;
    const editAbout = editAboutInput.value;
    postUserInformation(editName, editAbout)
        .then((res) => {
            profileName.textContent = res.name
            profileAbout.textContent = res.about
            closeEditPopup()
        })
}

//addCard function formSubmitAddHandler(evt) {
//     evt.preventDefault()
//     const newPost = createNewPost(postNameInput.value, postLinkInput.value)
//     postsList.prepend(newPost)
//     closePopup(popupAddPost)
// }


//addInfo   function formSubmitEditHandler(evt) {
//     evt.preventDefault()
//     profileName.textContent = editNameInput.value
//     profileAbout.textContent = editAboutInput.value
//     closePopup(popupEditor)
// }


function formSubmitAvatarHandler(evt) {
    evt.preventDefault()
    const avatarLink = avatarLinkInput.value
    postUserAvatar(avatarLink)
        .then((res) => {
            userAvatar.src = avatarLink;
            closeAvatarPopup()
        })
}

// function addLike(evt) {
//     evt.preventDefault()
//     const avatarLink = avatarLinkInput.value
//     postUserAvatar(avatarLink)
//         .then((res) => {
//             userAvatar.src = avatarLink;
//             closeAvatarPopup()
//         })
// }

// function deleteLike(evt) {
//     evt.preventDefault()
//     const avatarLink = avatarLinkInput.value
//     postUserAvatar(avatarLink)
//         .then((res) => {
//             userAvatar.src = avatarLink;
//             closeAvatarPopup()
//         })
// }


formEditElement.addEventListener("submit", formSubmitEditHandler)
formAddElement.addEventListener("submit", formSubmitAddHandler)
formAvatarElement.addEventListener("submit", formSubmitAvatarHandler)
