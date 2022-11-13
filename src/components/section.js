export default class Section {
    constructor({items, renderer}, container ) {
        this.items = items
        this.renderer = renderer
        this.container = container
        console.log(renderer, this.renderer)
    }

    renderAll = () => {
        console.log(this)
        this.items.forEach((item) => {
            console.log(' 1')
            this.renderer(item)
            console.log(' 2')
        });
        console.log('3')
        console.log(this.items)
    }

    addItem(item, end = true) {
        if(end) {
            this.container.append(item)
        } else {
            this.container.prepend(item)
        }
    }


}