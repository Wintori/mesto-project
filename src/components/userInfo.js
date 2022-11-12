export default class UserInfo {
    constructor({ userName, userAbout }) {
        this.userName = userName
        this.userAbout = userAbout
    }

    getUserInfo() {

        return {
            name: this.userName.textContent,
            about: this.userAbout.textContent
        }
    }

    setUserInfo(obj) {
        this.userName.textContent = obj.name;
        this.userAbout.textContent = obj.about;
    }
}