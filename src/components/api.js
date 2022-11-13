export default class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl,
        this.headers = headers
    }

    // проверка на ошибки
    _checkErrors = (res) => {
        if (res.ok) {
            return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // получение карточек
    getInitialCards = () => {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }

    //  получение информации пользователя
    getInformationAbout = () => {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }

    // отправка карточки на сервер
    postCard = (cardName, cardLink) => {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        })
            .then(res => this._checkErrors(res))
    }
    
    // удаление карточки с сервера
    deleteCard = (cardId) => {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }
    
    // отправка аватара на сервер
    postUserAvatar = (newUrl) => {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: newUrl
            })
        })
            .then(res => this._checkErrors(res))
    }
    
    // отправка информации о пользователе на сервер
    postUserInformation = (newName, newAbout) => {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: newName,
                about: newAbout
            })
        })
            .then(res => this._checkErrors(res))
    }
    
    // отправка лайка на сервер
    putLike = (cardId) => {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }
    
    // удаление лайка с сервера
    deleteLike = (cardId) => {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }
}