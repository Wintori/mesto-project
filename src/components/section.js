export default class Section {
    constructor({renderer}, container ) {
        this.renderer = renderer
        this.container = container
    }

    renderAll = (items) => {
        items.forEach((item) => {
            this.renderer(item)
        });
    }

    addItem(item) {
            this.container.append(item)
    }


    prependItem(item) {
        this.container.prepend(item)
    }
}