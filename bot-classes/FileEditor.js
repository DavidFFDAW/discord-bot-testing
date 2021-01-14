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
        this.fileManager.clear();
        array.forEach(element => {
            if(element === array[0]){
                this.fileManager.override(this.createNewItem(element.name,element.value));
            } else {
                this.fileManager.addWrite(this.createNewItem(element.name,element.value));
            }
        });
    };
};

module.exports = FileEditor;

const fileManager = require('./FileManager');
const fileEditor = new FileEditor(fileManager);

const deleteByName = name => {
    fileEditor.tryDeletingByName(name)
}

try{
    const content = ['squirttle','charmander','poliwrath'];
    fileEditor.tryDeletingByName('list').then(array => fileEditor.overridingAddition(array));
} catch(err){
    console.log(err.message);
}
