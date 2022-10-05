import {
    closePopup,
    openZoomPopup,
    closeAddPopup,
    closeEditPopup,
} from './modal.js'

import {
    postsList,
    postTemplate,
    profileName,
    profileAbout,
    editNameInput,
    editAboutInput,
    postNameInput,
    postLinkInput,
    popupAddPost,
    popupEditor,
} from "./utils.js"

import {
    deleteCard,
} from "./api.js"

function createNewPost(postName, imageLink, ownerId, myId, cardId) {
    const post = postTemplate.cloneNode(true)
    const postImage = post.querySelector(".posts__image")

    const buttonTrash = post.querySelector(".button-trash")

    if (myId !== ownerId) {
        buttonTrash.classList.add("button-trash_disabled")
    }

    postImage.src = imageLink
    post.querySelector(".posts__title").textContent = postName

    postImage.alt = postName
    post
        .querySelector(".button-like")
        .addEventListener("click", (evt) =>
            evt.target.classList.toggle("button-like_active")
        )

    buttonTrash.addEventListener("click", (evt) => {
        deleteCard(cardId)
        evt.target.closest(".posts__post").remove()
    }
    )
    postImage.addEventListener("click", openZoomPopup)
    return post
}





export { createNewPost}
