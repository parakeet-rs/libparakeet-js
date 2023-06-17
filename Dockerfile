FROM debian:bookworm-20230612 AS wasm-builder

RUN apt-get update -y -qq -o=Dpkg::Use-Pty=0 \
    && apt-get install -y -qq -o=Dpkg::Use-Pty=0 \
    bzip2 \
    cmake \
    curl \
    make \
    git \
    python3 \
    python-is-python3 \
    xz-utils \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /a /h

ENV HOME=/h HOSTNAME=parakeet
WORKDIR /a
COPY . /a/

RUN make build-wasm

FROM node:18.16.0-bookworm

RUN mkdir -p /a /h \
    && corepack enable \
    && corepack prepare pnpm@latest --activate

ENV HOME=/h HOSTNAME=parakeet
WORKDIR /a/npm
COPY . /a/
COPY --from=wasm-builder /a/npm/src/ /a/npm/src/

# RUN pnpm i --frozen-lockfile \
#     && pnpm pack
