class Service{
    constructor(){
        this.array = [];
    }
    addNewItem = item => this.array = [...this.array,item];
    getRandomFromArray = _ => this.array[Math.floor(Math.random() * this.array.length)];

    toString = array => {
        let final = '';
        for(const item of array){
            if(item === array[array.length - 1]){
                final += item;
                break;
            }
            final += `${item}, `;
        }
        return final;
    };
}
module.exports = Service;