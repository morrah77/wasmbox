const wabt = require('wabt')();
const fs = require('fs');
const sourceFileName = './src/basic.wat';
const targetFileName = './assets/basic.wasm';
const buf = fs.readFileSync(sourceFileName, 'utf-8');

wabt.then(wabtModule => {
        var parsed = wabtModule.parseWat(sourceFileName, buf);
        const {buffer} = parsed.toBinary({});
        fs.writeFileSync(targetFileName, buffer);
    }
);
