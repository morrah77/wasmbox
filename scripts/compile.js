const wabt = require('wabt')();
const fs = require('fs');
const actualCLIArgs = process.argv.slice(2);
const sourceFileName = actualCLIArgs.length ? actualCLIArgs[0]: './src/basic.wat';
const targetFileName = './assets/' + sourceFileName.slice(sourceFileName.lastIndexOf('/') + 1, sourceFileName.lastIndexOf('.')) + '.wasm';
const buf = fs.readFileSync(sourceFileName, 'utf-8');

wabt.then(wabtModule => {
        var parsed = wabtModule.parseWat(sourceFileName, buf);
        const {buffer} = parsed.toBinary({});
        fs.writeFileSync(targetFileName, buffer);
    }
);
