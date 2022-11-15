export default class UserInfo {
    constructor(userName, userAbout, userAvatar, api) {
        this.userName = userName
        this.userAbout = userAbout
        this.userAvatar = userAvatar
        this.api = api
    }

    getUserInfo = () => {
        return this.api.getInformationAbout()
        .then(data => {
            this.name = data.name
            this.about = data.about
            this.avatar = data.avatar
            this._userId = data._id
            return {...data}
        })
    }

    setUserInfo = ({ name, about }) => {
        return this.api.postUserInformation(name, about)
        .then(data => {
            this.userName.textContent = data.name
            this.userAbout.textContent = data.about
            this.userAvatar.src = data.avatar
            this._userId = data._id
            return {...data}
        })
    }

    setUserAvatar = (avatar) => {
        return this.api.postUserAvatar(avatar)
        .then(data => {
            this.userAvatar.src = data.avatar
            return {...data}
        })
    }

    getUserId = () => {
        return this._userId;
    }
}