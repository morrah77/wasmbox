const fs = require('fs');
const vm = require('vm');
const fileName = 'scripts/script.js';
const buf = fs.readFileSync(fileName, 'utf-8');
const script = new vm.Script(buf);
const window = {};

function fetch(fileName) {
    return new Promise((resolve, reject) => resolve(fs.readFileSync(fileName, {encoding: 'utf-8'})));
}

function logIfDebug(itemToLog) {
    if (process.env.DEBUG) {
        console.dir(itemToLog);
        console.dir(typeof itemToLog);
        if (itemToLog !== undefined) {
            console.dir(itemToLog.length);
        }
    }
}

WebAssembly.instantiateStreaming = (promise) => {
    return promise
        .then(contentString => {
                logIfDebug(contentString);
                var arr = new Uint8Array(new ArrayBuffer(contentString.length));
                for (var i = 0; i < contentString.length; i++) {
                    arr[i] = contentString.charCodeAt(i);
                }
                logIfDebug(arr);
                return arr;
            },
            e => console.error(e))
        .then(arrayBuffer => WebAssembly.instantiate(arrayBuffer, {}),
            e => console.error(e))
};

var wrappedConsoleBuffer = '';
const wrappedConsole = {
    log: (...args) => {
        wrappedConsoleBuffer = wrappedConsoleBuffer.concat(args.join(', ').concat('\n'));
        console.log(args);
    },
    dir: (...args) => {
        wrappedConsoleBuffer = wrappedConsoleBuffer.concat(args.join(', ').concat('\n'));
        console.dir(args);
    }
};

const context = vm.createContext({window, fetch, console: wrappedConsole, WebAssembly});

script.runInContext(context, {});
logIfDebug(context);
logIfDebug(script);
new Promise((resolve, reject) => {
    context.window.onload()
        .then((result) => resolve(result))
})
    .then((result) => {
        logIfDebug(result);
        setTimeout(performTest, 1000)
    });

function performTest(...args) {
    console.log('performTest');
    logIfDebug(wrappedConsoleBuffer);

    logIfDebug(wrappedConsoleBuffer);

    const expectedResults = [
        {expectedVale: '6', position: 11},
        {expectedVale: '5', position: 9},
        {expectedVale: '-1', position: 7},
        {expectedVale: '6', position: 4},
        {expectedVale: '0', position: 2}
    ];
    for (var i = 0; i < expectedResults.length; i++) {
        const expected = expectedResults[i].expectedVale;
        const actual = wrappedConsoleBuffer.substr(wrappedConsoleBuffer.length - expectedResults[i].position, expectedResults[i].expectedVale.length);
        if (actual !== expected) {
            // return 1;
            console.error('FAIL: ', actual, ' not eqals to', expected);
        } else {
            // return 0;
            console.log('OK');
        }
    }
}
