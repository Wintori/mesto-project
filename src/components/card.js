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
    putLike,
    deleteLike,
} from "./api.js"

function createNewPost(postName, imageLink, ownerId, myId, cardId, likes) {
    const post = postTemplate.cloneNode(true)
    const postImage = post.querySelector(".posts__image")

    const buttonTrash = post.querySelector(".button-trash")
    const likeCount = post.querySelector(".posts__like-count")
    const likeContainer = post.querySelector(".posts__like-container")
    const buttonLike = post.querySelector(".button-like")


    // Тут же нужно проверять, поставлен ли уже мною лайк
    likes.forEach(element => {
        if (myId == element._id) {
            buttonLike.classList.add("button-like_active")
        }
    });



    if (myId !== ownerId) {
        buttonTrash.classList.add("button-trash_disabled")
    }

    postImage.src = imageLink
    post.querySelector(".posts__title").textContent = postName

    postImage.alt = postName

    if (likes.length !== 0) {
        likeCount.textContent = likes.length
    }
    else {
        likeCount.style.display = "none"
        likeContainer.style.padding = "30px 0 0 0"
    }


    buttonLike.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("button-like_active")) {
            evt.target.classList.remove("button-like_active")
            deleteLike(cardId)
                .then((res) => {
                    if (res.likes.length == 0) {
                        likeCount.style.display = "none"
                        likeContainer.style.padding = "30px 0 0 0"
                    } else {
                        likeCount.textContent = res.likes.length
                    }
                })
        } else {
            evt.target.classList.add("button-like_active")
            putLike(cardId)
                .then((res) => {
                    if (res.likes.length == 1) {
                        likeCount.style.display = "block"
                        likeContainer.style.padding = "22px 0 0 0"
                        likeCount.textContent = res.likes.length;
                    } else {
                        likeCount.textContent = res.likes.length
                    }

                })
        }
    })

    buttonTrash.addEventListener("click", (evt) => {
        deleteCard(cardId)
        evt.target.closest(".posts__post").remove()
    })
    postImage.addEventListener("click", openZoomPopup)
    return post
}


export { createNewPost }