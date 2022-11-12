export default class Section {
    constructor({items, renderer}, container ) {
        this.item = items
        this.renderer = renderer
        this.container = container
    }

    renderAll() {
        this.items.forEach(item => {
            this.renderer(item);
          });
    }

    addItem(item, end = true) {
        if(end) {
            this.container.append(item)
        } else {
            this.container.prepend(item)
        }
        
    }


}