const arr = [
    { name: 'list', value: '1,2,3,4,5,6' },
    { name: 'names', value: 'Pepe,Paco,Antonio' },
    { name: 'frutas', value: 'platano,manzana,pera' },
    { name: 'verduras', value: 'cebolla,pepino,tomate' },
    { name: 'coches', value: 'fiat,renault,opel,citroen' },
    { name: 'canales', value: 'tve,2,antena 3,cuatro,telecinco' }
];
const nametest1 = 'list';
const nametest2 = 'recipes';

const isSome = name => arr.some(elem => elem.name === name);
const throwError = err => {
    throw new Error(err);
}

const find = (name,newValue) => {
    const found = arr.find(element => element.name === name);
    return typeof found === undefined ? throwError(err) : found.value = newValue;
}
const deleteT = array => {
    array.forEach(element => {
        if(element === array[0]){
            console.log('Es igual');
        } else {
            console.log('No es igual');
        }
    });
}

try{
    deleteT(arr);
} catch(err){
    console.log(err.message);
}
/*
const pokemon = { 
    water: 'Squirttle',
    fire: 'Torchic',
    grass: 'Chikorita',
    bug: 'Caterpie',
    sinister: 'Absol',
}
const type = 'bug';
console.log(pokemon[type]); */
/* 
const input = '+save list -d';
const splitted = input.split(' ');
if(splitted[2] && splitted.includes('-d')){
    console.log('Hay 3 parametros');
} */
