class FileEditor {
    constructor(fileManager){
        this.fileManager = fileManager;
        this.endLine = '/-';
    }
    parseToArrayOfObjects = (fileContent) => {
        return this.fileManager.cleanOutput(fileContent).split(this.endLine).map(element => {
            const elementSplitted = element.split(': ');
            const name = elementSplitted[0];
            const value = elementSplitted[1];
            return this.makingAnObject(elementSplitted,name,value);
        });
    };
    makingAnObject = (element,name,value) => {
        return element.reduce((_) => ({
            name: name,
            value: value
        }),{});
    };
    createNewItem = (name,value) => {
        return `${name}: ${value}`;
    };
    throwError = (err) => {
        throw new Error(err);
    }
    tryAddItemToFile = (name,value) => {
        return this.fileManager.read().then(content => {
            const isInArray = this.parseToArrayOfObjects(content).some(element => element.name === name);
            return isInArray ? this.throwError('Ya se encuentra en el archivo') : this.fileManager.addWrite(this.createNewItem(name,value)).then(_ => 'Introducido con exito');
        }).catch(this.throwError);
    };
    tryFindingListByName = name => {
        return this.fileManager.read().then((content) => {
            const arrayOfObjects = this.parseToArrayOfObjects(content);
            const foundOne = arrayOfObjects.find(element => element.name === name);
            return typeof foundOne === undefined ? this.throwError('No se encuentra ninguna lista con dicho nombre') : foundOne.value;
        }).catch(this.throwError);
    }
    tryDeletingByName = name => {
        return this.fileManager.read().then(content => {
            const lists = this.parseToArrayOfObjects(content);
            return lists.filter(element => element.name !== name);
        });
    }
    overridingAddition = array => {
        const mapped = array.map(element => {
            element + '/-';
        });
        console.log('mapped: ',mapped);
        return mapped;
    };
};

module.exports = FileEditor;

const fileManager = require('./FileManager');
const fileEditor = new FileEditor(fileManager);

const deleteByName = _ => {
    fileManager.read().then(content => {
        const array = fileEditor.parseToArrayOfObjects(content);
        console.log('array: ',array)
        return fileEditor.overridingAddition(array);
    });
};

try{
    const content = ['squirttle','charmander','poliwrath'];
    console.log(deleteByName());
} catch(err){
    console.log(err.message);
}
