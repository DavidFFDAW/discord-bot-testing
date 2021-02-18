class FileManager{
    constructor(file){
        this.fs = require('fs').promises;
        this.sync = require('fs');
        this.file = file;
    }
    read = _ => this.fs.readFile(this.file, 'utf8');
    override = content => this.fs.writeFile(this.file, content);
    clear = _ => this.sync.writeFileSync(this.file,'');
    addWrite = content => this.read().then(read => {
        let all;
        if(content === ''){
            all = read + `${content}`;
        } else {
            all = read + `/-\n${content}`;
        }
        return this.fs.writeFile(this.file, all);
    });
    cleanOutput = output => output.replace(/(\r\n|\n|\r)/gm,'');
    clean = out => out.replace(',','');
}
module.exports = FileManager;