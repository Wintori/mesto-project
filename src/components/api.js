class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl,
        this.headers = headers
    }

    _checkErrors = (res) => {
        if (res.ok) {
            return res.json();
        }
    
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards = () => {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }

    getInformationAbout = () => {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }

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
    
    deleteCard = (cardId) => {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }
    
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
    
    putLike = (cardId) => {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }
    
    deleteLike = (cardId) => {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => this._checkErrors(res))
    }

    // другие методы работы с API
}

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
    headers: {
        authorization: '175227b7-8396-4cce-a64b-f428eae8eca2',
        'Content-Type': 'application/json; charset=UTF-8'
    }
});


export {
    api
}