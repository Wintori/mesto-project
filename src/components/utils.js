const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
]

const popupAddPost = document.querySelector("#popup__addPost-container").parentNode
const popupEditor = document.querySelector("#popup__profileEdit-container").parentNode
const popupZoom = document.querySelector("#popup__imageZoom-container").parentNode
const popups = document.querySelectorAll(".popup")

const page = document.querySelector(".page")
const content = document.querySelector(".content")
const profile = content.querySelector(".profile")

//находим куда добавлять посты и заготовку поста
const postsList = document.querySelector(".posts__list")
const postTemplate = document.querySelector(".post-template").content

// Находим форму редактирования профиля в DOM
const formEditElement = popupEditor.querySelector(".popup__person-information")
const formAddElement = popupAddPost.querySelector(".popup__person-information")
// Находим поля для редактирования в DOM
const profileName = profile.querySelector(".profile__name")
const profileAbout = profile.querySelector(".profile__status")

// Находим инпуты для редактирования профиля
const editNameInput = popupEditor.querySelector(".popup__input_type_name") //поле ввод имя
const editAboutInput = popupEditor.querySelector(".popup__input_type_about") //поле ввод работа
const postNameInput = popupAddPost.querySelector(".popup__input_type_name") //поле ввод места
const postLinkInput = popupAddPost.querySelector(".popup__input_type_image") //поле ввод ссылка

const imageZoom = popupZoom.querySelector(".popup__zoom-image")
const captionZoom = popupZoom.querySelector(".popup__zoom-caption")

const userName = document.querySelector(".profile__name")
const userAbout = document.querySelector(".profile__status")
const userAvatar = document.querySelector(".profile__avatar")

const popupAddPostOpenButton = profile.querySelector(".button-add")
const popupAddPostCloseButton = popupAddPost.querySelector(".button-close")

const popupEditProfileOpenButton = profile.querySelector(".button-edit")
const popupEditProfileCloseButton = popupEditor.querySelector(".button-close")

const popupZoomPostCloseButton = popupZoom.querySelector(".button-close")


export {
    initialCards,
    postsList,
    postTemplate,
    formEditElement,
    formAddElement,
    profileName,
    profileAbout,
    editNameInput,
    editAboutInput,
    postNameInput,
    postLinkInput,
    imageZoom,
    captionZoom,
    userName,
    userAbout,
    userAvatar,
    page,
    content,
    profile,
    popupAddPost,
    popupEditor,
    popupZoom,
    popups,
    popupAddPostOpenButton,
    popupAddPostCloseButton,
    popupEditProfileOpenButton,
    popupEditProfileCloseButton,
    popupZoomPostCloseButton,
}
