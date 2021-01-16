function run() {
    if (!WebAssembly) {
        return;
    }
    console.dir(WebAssembly);
    return WebAssembly
        .instantiateStreaming(fetch("assets/basic.wasm"), {})
        .then(wasmResult => {
            console.dir(wasmResult);
            var result = wasmResult.instance.exports.calc(2,3);
            console.log(result);
            return result;
        });
}

window.onload = run;