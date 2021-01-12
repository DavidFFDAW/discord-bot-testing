/*const Service = require('./service');
const serv = new Service();*/

// remove certain position from array ↓
let array = [1,2,3,4,5,6];
            // we want to delete the 3.

removeItemByPosition = position => {
    position = position - 1;
    const before = array.slice(0,position);
    const afterDeletePosition = array.slice(position + 1,array.length);
    array = before.concat(afterDeletePosition);
}