class PopupWithImage extends Popup {
    constructor(popup, text, image) {
        super(popup);
        this.text = text;
        this.image = image;
    }

    open(name, link) {
        super.open()
        postImage.src = link
        post.querySelector(".posts__title").textContent = name
        postImage.alt = name
    }

    
}