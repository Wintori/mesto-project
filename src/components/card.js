import {
    postTemplate,
} from "./utils.js"

import {
    deleteCard,
    putLike,
    deleteLike,
} from "./api.js"

function addDomLike(obj, likeCount, likeContainer) {
    if (obj.likes.length == 1) {
        likeCount.style.display = "block"
        likeContainer.style.padding = "22px 0 0 0"
        likeCount.textContent = obj.likes.length;
    } else {
        likeCount.textContent = obj.likes.length
    }
}

function delDomLike(obj, likeCount, likeContainer) {
    if (obj.likes.length == 0) {
        likeCount.style.display = "none"
        likeContainer.style.padding = "30px 0 0 0"
    } else {
        likeCount.textContent = obj.likes.length
    }
}

function delLikeHandler(cardId, evt, likeCount, likeContainer) {
    deleteLike(cardId)
        .then((res) => {
            evt.target.classList.remove("button-like_active")
            delDomLike(res, likeCount, likeContainer)
        })
        .catch((error) => {
            console.log(error);
        })
}

function putLikeHandler(cardId, evt,  likeCount, likeContainer) {
    putLike(cardId)
        .then((res) => {
            evt.target.classList.add("button-like_active")
            addDomLike(res, likeCount, likeContainer)
        })
        .catch((error) => {
            console.log(error);
        })
}

function delCardHandler(cardId, evt) {
    deleteCard(cardId)
        .then(() => {
            evt.target.closest(".posts__post").remove()
        })
        .catch((error) => {
            console.log(error);
        })
}

function createNewPost(postName, imageLink, ownerId, myId, cardId, likes, openZoomPopup) {
    const post = postTemplate.querySelector('.posts__post').cloneNode(true)
    const postImage = post.querySelector(".posts__image")
    const buttonTrash = post.querySelector(".button-trash")
    const likeCount = post.querySelector(".posts__like-count")
    const likeContainer = post.querySelector(".posts__like-container")
    const buttonLike = post.querySelector(".button-like")


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
            delLikeHandler(cardId, evt, likeCount, likeContainer)
        } else {
            putLikeHandler(cardId, evt, likeCount, likeContainer)
        }
    })

    buttonTrash.addEventListener("click", (evt) => {
        delCardHandler(cardId, evt)
    })
    postImage.addEventListener("click", openZoomPopup)
    return post
}


export { createNewPost }