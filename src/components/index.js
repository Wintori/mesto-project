import '../pages/index.css';

const page = document.querySelector('.page');
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');

//------------------(поиск попапов)------------------------------
const popupAddPost = document.querySelector('#popup__addPost-container').parentNode;
const popupEditor = document.querySelector('#popup__profileEdit-container').parentNode;
const popupZoom = document.querySelector('#popup__imageZoom-container').parentNode;
const popups = document.querySelectorAll('.popup');
//----------(поиск кнопок открытия\закрытия попапов)--------------
const popupAddPostOpenButton = profile.querySelector('.button-add');
const popupAddPostCloseButton = popupAddPost.querySelector('.button-close');

const popupEditProfileOpenButton = profile.querySelector('.button-edit');
const popupEditProfileCloseButton = popupEditor.querySelector('.button-close');

const popupZoomPostCloseButton = popupZoom.querySelector('.button-close');
//------------------------(добавление события на кнопки закрытия\открытия)-------------------------------



popupAddPostOpenButton.addEventListener('click', openPostPopup);
popupAddPostCloseButton.addEventListener('click', () => popupAddPost.classList.remove('popup_opened'));



popupEditProfileOpenButton.addEventListener('click', openEditorPopup);
popupEditProfileCloseButton.addEventListener('click', () => popupEditor.classList.remove('popup_opened'));

popupZoomPostCloseButton.addEventListener('click', () => popupZoom.classList.remove('popup_opened'));
//--------------------------------------------------------------------------------------------------------
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
function createNewPost(postName, imageLink, cardId, ownerId, myId) {

    const post = postTemplate.cloneNode(true);
    const postImage = post.querySelector('.posts__image');

    const buttonTrash = post.querySelector('.button-trash');

    if (myId !== ownerId) {
        buttonTrash.classList.add('button-trash_disabled')
    }


    console.log(buttonTrash)

    // присваиваем посту введённые переменный
    postImage.src = imageLink;
    post.querySelector('.posts__title').textContent = postName;
    postImage.alt = postName;

    // вешаем события на кнопки удалений и лайка
    post.querySelector('.button-like').addEventListener('click', (evt) => evt.target.classList.toggle('button-like_active'));
    buttonTrash.addEventListener('click', (evt) => evt.target.closest('.posts__post').remove());
    postImage.addEventListener('click', openZoomPopup);

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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    // popupChanges(popup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function openEditorPopup() {
    editNameInput.value = profileName.textContent;
    editAboutInput.value = profileAbout.textContent;
    openPopup(popupEditor);
};

function openZoomPopup(evt) {
    imageZoom.src = evt.target.src;
    imageZoom.alt = evt.target.alt;
    captionZoom.textContent = evt.target.alt;
    openPopup(popupZoom);
};

function openPostPopup(evt) {
    postNameInput.value = null;
    postLinkInput.value = null;
    openPopup(popupAddPost);
};

//-----------------------------------------------------------------------------------------
function formSubmitEditHandler(evt) {
    evt.preventDefault();
    profileName.textContent = editNameInput.value;
    profileAbout.textContent = editAboutInput.value;
    closePopup(popupEditor);
};
formEditElement.addEventListener('submit', formSubmitEditHandler);

//-------------------------------------------------------------------------------------------
function formSubmitAddHandler(evt) {
    evt.preventDefault();
    const newPost = createNewPost(postNameInput.value, postLinkInput.value);
    postsList.prepend(newPost);
    closePopup(popupAddPost)
};
formAddElement.addEventListener('submit', formSubmitAddHandler);

// ------------------------------------------------------------------------------------------

function closeOnEsc(evt) {
    if (evt.keyCode === 27) {
        popups.forEach(popup => {
            closePopup(popup)
        })
    }
}

document.addEventListener('keydown', closeOnEsc);


function closeOnClick(evt) {
    if ((evt.target.classList.contains('popup')) && !(evt.target.classList.contains('popup__container')))
        popups.forEach(popup => {
            closePopup(popup)
        })
}

document.addEventListener('click', closeOnClick);


//-------------------------------------------------------------------------------------------------


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};



const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};




const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList, buttonElement)) {
        // сделай кнопку неактивной
        buttonElement.classList.add('button_inactive');
        buttonElement.setAttribute('disabled', 'disabled')
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove('button_inactive');
        buttonElement.removeAttribute('disabled', 'disabled')
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.button-save');

    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement);
        });
    });
}

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__person-information'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'));

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });

    });
}

enableValidation();





const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
    headers: {
        authorization: '175227b7-8396-4cce-a64b-f428eae8eca2',
        'Content-Type': 'application/json; charset=UTF-8'
    }
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        
}

const postUserInformation = (newName, newAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    });
}


const postUserAvatar = (newUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newUrl
        })
    });
}




let myId;


//     getInitialCards().then((result) => {
//         result.forEach(function (item) {
//             const post = createNewPost(item.name, item.link, item._id, item.owner._id, myId);
//             console.log(item._id)
//             postsList.prepend(post);
//         });
//     })


const getInformationAbout = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}



const userName = document.querySelector('.profile__name');
const userAbout = document.querySelector('.profile__status');
const userAvatar = document.querySelector('.profile__avatar');

// function updateUserInformation() {
//     getInformationAbout()
//         .then((result) => {
//             userName.textContent = result.name;
//             userAbout.textContent = result.about;
//             userAvatar.src = result.avatar;

//         })
//         .catch((err) => {
//             console.log(err); // выводим ошибку в консоль
//         })
// }





const postCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    });
}



const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}




// function getOwnerId(myId, name, about, avatar) {
//     getInformationAbout()
//         .then((res) => {

//             myId = res._id
//             return myId



//         })
//         .catch((err) => {
//             console.log(err); // выводим ошибку в консоль
//         })
// }



Promise.all([getInformationAbout, getInitialCards])
    .then(data => {
        editNameInput.textContent = data[0].name;
        editAboutInput.textContent = data[0].about;
        myId = data[0]._id;

        console.log(data[1])
        // data[1].forEach(item => {
        //     const post = createNewPost(item.name, item.link, item._id, item.owner._id, myId);
        //     postsList.prepend(post);
        // })
    })