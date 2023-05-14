.ONESHELL:
.PHONY: all clean build build-wasm build-npm

clean:
	git -dxf -e config.local
	rm -rf out

build-wasm:
	./build.sh

build-npm: build-wasm
	cd npm 
	[ -e node_modules ] || pnpm i --frozen-lockfile
	pnpm build

build: build-wasm build-npm

all: build
