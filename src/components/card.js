import {
    postTemplate,
    popupZoom
} from "./utils.js"

import {
    closePopup,
} from "./modal.js"


import { api } from "./api.js"



class Card {
    constructor(name, link, ownerId, myId, cardId, likes, selector) {
        this.name = name,
        this.link = link,
        this.ownerId = ownerId,
        this.myId = myId,
        this.cardId = cardId,
        this.likes = likes,
        this.selector = selector
    }

    _addDomLike(obj, likeCount, likeContainer) {
        if (obj.likes.length == 1) {
            likeCount.style.display = "block"
            likeContainer.style.padding = "22px 0 0 0"
            likeCount.textContent = obj.likes.length;
        } else {
            likeCount.textContent = obj.likes.length
        }
    }

    _delDomLike(obj, likeCount, likeContainer) {
        if (obj.likes.length == 0) {
            likeCount.style.display = "none"
            likeContainer.style.padding = "30px 0 0 0"
        } else {
            likeCount.textContent = obj.likes.length
        }
    }

    _delDomCard (evt) {
        evt.target.closest(".posts__post").remove()
    }

    _delLikeHandler(cardId, evt, likeCount, likeContainer) {
        api.deleteLike(cardId)
            .then((res) => {
                evt.target.classList.remove("button-like_active")
                this._delDomLike(res, likeCount, likeContainer)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    _putLikeHandler(cardId, evt,  likeCount, likeContainer) {
        api.putLike(cardId)
            .then((res) => {
                evt.target.classList.add("button-like_active")
                this._addDomLike(res, likeCount, likeContainer)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    _delCardHandler(cardId, evt) {
        api.deleteCard(cardId)
            .then(() => {
                this._delDomCard(evt)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    createNewPost() {
        const post = postTemplate.querySelector(this.selector).cloneNode(true)

        const postImage = post.querySelector(".posts__image")
        const buttonTrash = post.querySelector(".button-trash")
        const likeCount = post.querySelector(".posts__like-count")
        const likeContainer = post.querySelector(".posts__like-container")
        const buttonLike = post.querySelector(".button-like")
    
    
        this.likes.forEach(element => {
            if (this.myId == element._id) {
                buttonLike.classList.add("button-like_active")
            }
        });
    
    
    
        if (this.myId !== this.ownerId) {
            buttonTrash.classList.add("button-trash_disabled")
        }

    
        postImage.src = this.link
        post.querySelector(".posts__title").textContent = this.name
    
        postImage.alt = this.name
    
        if (this.likes.length !== 0) {
            likeCount.textContent = this.likes.length
        }
        else {
            likeCount.style.display = "none"
            likeContainer.style.padding = "30px 0 0 0"
        }
    
    
        buttonLike.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("button-like_active")) {
                this._delLikeHandler(this.cardId, evt, likeCount, likeContainer)
            } else {
                this._putLikeHandler(this.cardId, evt, likeCount, likeContainer)
            }
        })
    
        buttonTrash.addEventListener("click", (evt) => {
            this._delCardHandler(this.cardId, evt)
        })
        postImage.addEventListener("click", closePopup(popupZoom))
        return post
    }
}


















export { Card }