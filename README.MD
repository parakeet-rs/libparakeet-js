# libparakeet-js

`libparakeet` JS SDK (WebAssembly)

## TODO

- Wrap native C++ classes to TypeScript
- GitHub CI: Build & publish
- Work with EMSDK 3.1.21+ [emscripten 3.1.21 changelog]
  - `_malloc` does not want to be exported for whatever reason with 3.1.38 :/
  - Seem to be including `pthread` experimental stuff that is unable to disable...

[emscripten 3.1.21 changelog]: https://github.com/emscripten-core/emscripten/blob/main/ChangeLog.md#3121---09092022
