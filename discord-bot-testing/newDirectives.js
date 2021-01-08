const prefixer = ':';
const instruction = ':whatever';
const COMMAND = 'yes', NOT_A_COMMAND = 'no';

const isCommand = (instruction[0] === prefixer) ? COMMAND : NOT_A_COMMAND;
console.log('is command:',isCommand);