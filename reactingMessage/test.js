const user = 'Francisco Jones';
const array = ['✂️','🪨','🧻'];

const salute = name => console.log(`Bienvenido a esta app ${name}, ¿que tal?`);
const getRandomTill = num => Math.floor(Math.random() * num);
const write = what => console.log(what);

write(array[0]);
write(array[1]);
write(array[2]);
salute(user);