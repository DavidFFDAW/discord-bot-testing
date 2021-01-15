/* 
const obj = [
    { name:'poncho',value:'hijoputa' },
    { name:'list',value:'papafrita' },
    { name:'pizzas',value:'peperoni' },
    { name:'morti',value:'apechusque' },
];

const update = (name,newValue) => {
    const found = obj.find(element => element.name === name);
    return (found.value = newValue) || 'No esite';
};
console.log(obj);
console.log(update('put','cacafu'));
console.log(obj);

 */

 const prntHello = _ => console.log('Hello');
 const prntPuton = _ => console.log('Puton');
class Test{
    constructor(){

    }
    printThings = () => {
        prntHello();
        prntPuton();
    }
}

const test = new Test();
test.printThings();