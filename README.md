#WebAssembly sandbox

A boilerplate kit of tools allowing creation, usage && testing of WebAssembly libreries.

Write yor WebAssembly program in Wasm text format (see [src/basic.wat](src/basic.wat)), compile it to Wasm binary, use in your javascript.

##Build

```
node scripts/compile.js <path_to_file.wat>
```

for example,

```
node scripts/compile.js ./src/maths.wat
```

or

```
npm run compile -- <path_to_file.wat>
```

for example,

```
npm run compile -- ./src/maths.wat
```

##Test

```
node scripts/test.js
```

or

```
npm run test
```

##Run

Set up your local webserver, for example, run nginx in docker:

```
docker run --rm -p 8080:80 -v `pwd`/docker/mime.types:/etc/nginx/mime.types -v `pwd`:/usr/share/nginx/html/wasmbox --name nginx-wasm nginx
```

view HTML page in browser, for example:

```
google-chrome http://localhost:8080/wasmbox/index.html &
```

##TODO

add some Wasm sorces illustrating work with memory
