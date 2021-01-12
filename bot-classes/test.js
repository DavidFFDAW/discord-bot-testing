const Service = require('./service');
const s = new Service();
s.addNewItem('Pepe');
s.addNewItem('Paco');

const palabras = 'cosa,array,pedo,marioneta';
console.log(palabras.includes(','));
const split = palabras.split(',');
split.map(element => s.addNewItem(element));

console.log(s.array);
console.log(s.toString(s.array));
