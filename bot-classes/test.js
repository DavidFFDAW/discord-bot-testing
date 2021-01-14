
class Mierda{
    constructor(){
        this.array = [1,2,3];
    }
    add = item => this.array = [...this.array, item];
    addGroup = items => items.split(',').forEach(item => this.add(item));
};
const caca = new Mierda();
caca.add('c');
caca.add('a');
console.log(caca.array);
console.log(caca.addGroup('cosa,de,prueba'));
console.log(caca.array);
