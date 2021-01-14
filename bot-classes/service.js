class Service{
    constructor(){
        this.array = [];
    }
    addNewItem = item => this.array = [...this.array,item];
    addGroupOfItems = items => items.split(',').forEach(item => this.addNewItem(item));
    getRandomFromArray = _ => this.array[Math.floor(Math.random() * this.array.length)];
    resetList = _ => this.array = [];
    arrayLength = _ => this.array.length;
    removeItemByPosition = position => {
        position = position - 1;
        const before = this.array.slice(0,position);
        const after = this.array.slice(position + 1,this.array.length);
        this.array = before.concat(after);
    };

    toString = _ => this.array.toString();
}
module.exports = Service;