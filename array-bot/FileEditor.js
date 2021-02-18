class FileEditor {
    constructor(fileManager){
        this.fileManager = fileManager;
        this.endLine = '/-';
    }
    getObjectFromFile = () => {
        return this.fileManager.read().then(fileContent => {
            return this.fileManager.cleanOutput(fileContent).split(this.endLine).map(element => {
                const elementSplitted = element.split(': ');
                const name = elementSplitted[0].replace(',','');
                const value = elementSplitted[1];
                return this.makingAnObject(elementSplitted,name,value);
            });
        });
    };
    makingAnObject = (element,name,value) => {
        return element.reduce((_) => ({
            name: name,
            value: value
        }),{});
    };
    
    destructuring = ({ name,value }) => `${name}: ${value}/-\n`;
    destructuringWithout = ({ name,value }) => `${name}: ${value}`;

    throwError = (err) => {
        throw new Error(err);
    }
    stringify = (array) => {
        return array.map((element,_,array) => (element === array[array.length - 1]) ? this.destructuringWithout(element) : this.destructuring(element));
    };
    addNewItem = (name,value) => {
        return this.getObjectFromFile().then(array => {
            const isInArray = array.some(element => element.name === name);
            const params = { name, value };
            if(isInArray){
                return this.throwError('ERROR : Ya esta añadido');
            } else{
                array.push(params);
                return this.fileManager.override(this.stringify(array).toString()).then(_ => 'Done!');
            }
        });
    };
    findListByName = name => {
        return this.getObjectFromFile().then(array => {
            const foundOne = array.find(element => element.name === name);
            return typeof foundOne === undefined ? this.throwError('No se encuentra ninguna lista con dicho nombre') : foundOne.value;
        });
    }
    deleteListByName = nameToSearch => {
        return this.getObjectFromFile().then(array => {
            if(array.some(element => element.name === nameToSearch)){
                const filtered = array.filter(element => element.name !== nameToSearch);
                return this.fileManager.override(this.stringify(filtered).toString()).then(_ => 'Done!');
            }else{
                this.throwError('ERROR: No se puede borrar un elemento que no exi');
            }
        })
    }
    updateListByName = (name,newValue) => {
        return this.getObjectFromFile().then(array => {
            array.find(element => element.name === name).value = newValue;
            return this.fileManager.override(this.stringify(array).toString()).then(_ => 'Done!');
        });
    }
    changeListNameByOldName = (oldname, newname) => {
        return this.getObjectFromFile().then(array => {
            if(array.some(el => el.name === oldname)){
                array.find(el => el.name === oldname).name = newname;
                return this.fileManager.override(this.stringify(array).toString()).then(_ => 'Done!');
            } else {
                this.throwError('ERROR: No existe esta lista en el archivo');
            }
        });
    }
};

module.exports = FileEditor;
/*
const fileManager = require('./FileManager');
const fileEditor = new FileEditor(fileManager);

try{
    const name = 'names';
    const newValue = ['nuevoValorNew','nuevoValorNew2','updateNew'];
    // WORKS: fileEditor.addNewItem(name, newValue).then(console.log).catch(err => console.log(err.message));
    // WORKS: fileEditor.update(name,newValue).then(console.log).catch(err => console.log(err.message));
    // WORKS: fileEditor.deleteListByName(name).then(console.log).catch(err => console.log(err.message));
} 
catch(err){
    console.log(err.message);
}
*/