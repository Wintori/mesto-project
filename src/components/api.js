const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
    headers: {
        authorization: '175227b7-8396-4cce-a64b-f428eae8eca2',
        'Content-Type': 'application/json; charset=UTF-8'
    }
}

const checkErrors = (res) => {
    if (res.ok) {
        return res.json();

    }

    return Promise.reject(`Ошибка: ${res.status}`);

}

const getInformationAbout = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => checkErrors(res))
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => checkErrors(res))
}

const postCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
        .then(res => checkErrors(res))
}

const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => checkErrors(res))
}

const postUserAvatar = (newUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newUrl
        })
    })
        .then(res => checkErrors(res))
}

const postUserInformation = (newName, newAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    })
        .then(res => checkErrors(res))
}

export {
    getInformationAbout,
    getInitialCards,
    postCard,
    deleteCard,
    postUserAvatar,
    postUserInformation
}