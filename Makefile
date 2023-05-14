.PHONY: clean build build-wasm build-npm

clean:
	git -dxf -e config.local
	rm -rf out

build-wasm:
	./build.sh

build-npm:
	cd npm && pnpm build

build: build-wasm build-npm