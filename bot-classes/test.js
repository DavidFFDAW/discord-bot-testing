const obj = [
    { name:'poncho',value:'hijoputa' },
    { name:'list',value:'papafrita' },
    { name:'pizzas',value:'peperoni' },
    { name:'morti',value:'apechusque' },
];

const stringify = (object) => {
    return object.map(element => create(element));
}
const create = ({ name,value }) => {
    return `${name}: ${value}`;
}

console.log(stringify(obj).toString());