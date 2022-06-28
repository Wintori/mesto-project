const content = document.querySelector('.content');
const profile = content.querySelector('.profile');

//------------------(поиск попапов)------------------------------
const popupAddPost = document.querySelector('#popup__addPost-container').parentNode;
const popupEditor = document.querySelector('#popup__profileEdit-container').parentNode;
const popupZoom = document.querySelector('#popup__imageZoom-container').parentNode;
//----------(поиск кнопок открытия\закрытия попапов)--------------
const openAddWindow = profile.querySelector('.button-add');
const closeAddWindow = popupAddPost.querySelector('.button-close');

const openProfileEditor = profile.querySelector('.button-edit');
const closeProfileEditor = popupEditor.querySelector('.button-close');

const closeZoomWindow = popupZoom.querySelector('.button-close');
//------------------------(добавление события на кнопки закрытия\открытия)-------------------------------
openAddWindow.addEventListener('click', openPostPopup);
closeAddWindow.addEventListener('click', () => popupAddPost.classList.remove('popup_opened'));

openProfileEditor.addEventListener('click', openEditorPopup);
closeProfileEditor.addEventListener('click', () => popupEditor.classList.remove('popup_opened'));

closeZoomWindow.addEventListener('click', () => popupZoom.classList.remove('popup_opened'));
//---------------------------------------------------------------------------------------------------------

// инициализация стандартных постов
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//находим куда добавлять посты и заготовку поста
const postsList = document.querySelector('.posts__list');
const postTemplate = document.querySelector('.post-template').content;

// функция создаёт новый пост
function createNewPost(postName, imageLink) {

    const post = postTemplate.cloneNode(true);

    // присваиваем посту введённые переменный
    post.querySelector('.posts__image').src = imageLink;
    post.querySelector('.posts__title').textContent = postName;
    post.querySelector('.posts__image').alt = postName;

    // вешаем события на кнопки удалений и лайка
    post.querySelector('.button-like').addEventListener('click', (evt) => evt.target.classList.toggle('button-like_active'));
    post.querySelector('.button-trash').addEventListener('click', (evt) => evt.target.closest('.posts__post').remove());
    post.querySelector('.posts__image').addEventListener('click', openZoomPopup);

    return post;
};

// Инициализируем заготовленные посты
function initializeList(list) {
    list.forEach(function (item) {
        const post = createNewPost(item.name, item.link);
        postsList.prepend(post);
    });
};

initializeList(initialCards);


// Находим форму редактирования профиля в DOM
const formEditElement = popupEditor.querySelector('.popup__person-information');
const formAddElement = popupAddPost.querySelector('.popup__person-information');
// Находим поля для редактирования в DOM
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__status');

// Находим инпуты для редактирования профиля
const editNameInput = popupEditor.querySelector('.popup__input_type_name');//поле ввод имя
const editAboutInput = popupEditor.querySelector('.popup__input_type_about');//поле ввод работа
const postNameInput = popupAddPost.querySelector('.popup__input_type_name');//поле ввод места
const postLinkInput = popupAddPost.querySelector('.popup__input_type_image');//поле ввод ссылка

//------------------------(Функции открытии попапов)----------------------------

//находим элементы для зума изображения
const imageZoom = popupZoom.querySelector('.popup__zoom-image');
const captionZoom = popupZoom.querySelector('.popup__zoom-caption');

function openEditorPopup() {
    editNameInput.value = profileName.textContent;
    editAboutInput.value = profileAbout.textContent;
    popupEditor.classList.add('popup_opened');
};

function openZoomPopup(evt) {
    imageZoom.src = evt.target.src;
    imageZoom.alt = evt.target.alt;
    captionZoom.textContent = evt.target.alt;
    popupZoom.classList.add('popup_opened');
};

function openPostPopup(evt) {
    postNameInput.value = null;
    postLinkInput.value = null;
    popupAddPost.classList.add('popup_opened');
};

//-----------------------------------------------------------------------------------------
function formSubmitEditHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editNameInput.value;
    profileAbout.textContent = editAboutInput.value;
    popupEditor.classList.remove('popup_opened');
};
formEditElement.addEventListener('submit', formSubmitEditHandler);

//-------------------------------------------------------------------------------------------
function formSubmitAddHandler(evt) {
    evt.preventDefault();
    const newPost = createNewPost(postNameInput.value, postLinkInput.value);
    postsList.prepend(newPost);
    popupAddPost.classList.remove('popup_opened');
};
formAddElement.addEventListener('submit', formSubmitAddHandler);