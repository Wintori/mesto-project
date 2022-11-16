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

        this.post = postTemplate.querySelector(this.selector).cloneNode(true)
        this.postImage = this.post.querySelector(".posts__image")
        this.buttonTrash = this.post.querySelector(".button-trash")
        this.likeCount = this.post.querySelector(".posts__like-count")
        this.likeContainer = this.post.querySelector(".posts__like-container")
        this.buttonLike = this.post.querySelector(".button-like")
    }

   

    // проверка, стоял ли уже наш лайк у карточки
    _checkActiveLike() {
        this.likes.forEach(element => {
            if (this.myId == element._id) {
                this.buttonLike.classList.add("button-like_active")
            }
        });
    }

    // проверка, если карточка не наша, убираем иконку удаления карточки
    _checkCardOwner() {
        if (this.myId !== this.ownerId) {
            this.buttonTrash.classList.add("button-trash_disabled")
        }
    }

    // добавление данных карточки в DOM
    _addDomCardInfo() {
        this.postImage.src = this.link
        this.post.querySelector(".posts__title").textContent = this.name
        this.postImage.alt = this.name
    }

    _changeLikeVisibility() {
        if (this.likes.length !== 0) {
            this.likeCount.textContent = this.likes.length
        }
        else {
            this.likeCount.style.display = "none"
            this.likeContainer.style.padding = "30px 0 0 0"
        }
    }

    // создание новой карточки
    createNewPost() {
        
    
    // функция проверки лайка
        this._checkActiveLike()
    
    
    // функция проверки владельца карточки
        this._checkCardOwner()

    // добавление данных карточки в DOM
        this._addDomCardInfo()
    
    // изменения вида карточки в DOM, если лайков нет, или больше 0
        this._changeLikeVisibility()
    
    // слушатель кнопки лайк (поставить/удалить лайк)
        this.buttonLike.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("button-like_active")) {
                this._delLikeHandler(this.cardId, evt, this.likeCount, this.likeContainer)
            } else {
                this._putLikeHandler(this.cardId, evt, this.likeCount, this.likeContainer)
            }
        })
    
    // слушатель кнопки удалить (удаление карточки)
        this.buttonTrash.addEventListener("click", (evt) => {
            this._delCardHandler(this.cardId, evt)
        })

    // слушатель на фотографию (открытие попап зума при нажатии на картинку)
        this.postImage.addEventListener("click", () => {this._openZoomHandler(this.name, this.link) })

    // возвращаем готовую карточку
        return this.post
    }
}