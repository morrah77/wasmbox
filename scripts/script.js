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
        })
        .then(result => {
            WebAssembly
                .instantiateStreaming(fetch("assets/maths.wasm"), {})
                .then(wasmResult => {
                    var result = wasmResult.instance.exports.add(2,3);
                    console.log(result);
                    var result = wasmResult.instance.exports.sub(2,3);
                    console.log(result);
                    var result = wasmResult.instance.exports.mul(2,3);
                    console.log(result);
                    var result = wasmResult.instance.exports.div(2,3);
                    console.log(result);
                    return result;
                })

        });
}

window.onload = run;