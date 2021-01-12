class Service{
    constructor(){
        this.array = [];
    }
    addNewItem = item => this.array = [...this.array,item];
    addGroupOfItems = items => this.array = this.array.concat(items);
    getRandomFromArray = _ => this.array[Math.floor(Math.random() * this.array.length)];
    resetList = _ => this.array = [];
    removeItemByPosition = position => {
        position = position - 1;
        const before = this.array.slice(0,position);
        const after = this.array.slice(position + 1,this.array.length);
        this.array = before.concat(after);
    };

    toString = array => {
        let final = '[ ';
        for(const item of array){
            if(item === array[array.length - 1]){
                final += `${item} ]`;
                break;
            }
            final += `${item}, `;
        }
        return final;
    };
}
module.exports = Service;