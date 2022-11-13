import {
    postTemplate
} from "./utils.js"

export default class Card {
    constructor(name, link, ownerId, myId, cardId, likes, selector, {delLikeHandler, putLikeHandler, delCardHandler, openZoomHandler}) {
        this.name = name,
        this.link = link,
        this.ownerId = ownerId,
        this.myId = myId,
        this.cardId = cardId,
        this.likes = likes,
        this.selector = selector,
        this._delLikeHandler = delLikeHandler,
        this._putLikeHandler = putLikeHandler,
        this._delCardHandler = delCardHandler,
        this._openZoomHandler = openZoomHandler
        
    }

    

   

    // проверка, стоял ли уже наш лайк у карточки
    _checkActiveLike(buttonLike) {
        this.likes.forEach(element => {
            if (this.myId == element._id) {
                buttonLike.classList.add("button-like_active")
            }
        });
    }

    // проверка, если карточка не наша, убираем иконку удаления карточки
    _checkCardOwner(buttonTrash) {
        if (this.myId !== this.ownerId) {
            buttonTrash.classList.add("button-trash_disabled")
        }
    }

    // добавление данных карточки в DOM
    _addDomCardInfo(post, postImage) {
        postImage.src = this.link
        post.querySelector(".posts__title").textContent = this.name
        postImage.alt = this.name
    }

    _changeLikeVisibility(likeCount, likeContainer) {
        if (this.likes.length !== 0) {
            likeCount.textContent = this.likes.length
        }
        else {
            likeCount.style.display = "none"
            likeContainer.style.padding = "30px 0 0 0"
        }
    }

    // создание новой карточки
    createNewPost() {
        const post = postTemplate.querySelector(this.selector).cloneNode(true)

        const postImage = post.querySelector(".posts__image")
        const buttonTrash = post.querySelector(".button-trash")
        const likeCount = post.querySelector(".posts__like-count")
        const likeContainer = post.querySelector(".posts__like-container")
        const buttonLike = post.querySelector(".button-like")
    
    // функция проверки лайка
        this._checkActiveLike(buttonLike)
    
    
    // функция проверки владельца карточки
        this._checkCardOwner(buttonTrash)

    // добавление данных карточки в DOM
        this._addDomCardInfo(post, postImage)
    
    // изменения вида карточки в DOM, если лайков нет, или больше 0
        this._changeLikeVisibility(likeCount, likeContainer)
    
    // слушатель кнопки лайк (поставить/удалить лайк)
        buttonLike.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("button-like_active")) {
                this._delLikeHandler(this.cardId, evt, likeCount, likeContainer)
            } else {
                this._putLikeHandler(this.cardId, evt, likeCount, likeContainer)
            }
        })
    
    // слушатель кнопки удалить (удаление карточки)
        buttonTrash.addEventListener("click", (evt) => {
            this._delCardHandler(this.cardId, evt)
        })

    // слушатель на фотографию (открытие попап зума при нажатии на картинку)
        postImage.addEventListener("click", () => {this._openZoomHandler(this.name, this.link) })

    // возвращаем готовую карточку
        return post
    }



}