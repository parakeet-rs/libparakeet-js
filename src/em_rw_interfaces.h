#pragma once
#include <parakeet-crypto/IStream.h>

#include <emscripten/bind.h>

struct IReadSeekableWrapper : public emscripten::wrapper<parakeet_crypto::IReadSeekable>
{
    EMSCRIPTEN_WRAPPER(IReadSeekableWrapper);

    size_t Read(uint8_t *buffer, size_t len)
    {
        return call<size_t>("Read", (uintptr_t)buffer, len);
    }
    void Seek(size_t position, parakeet_crypto::SeekDirection seek_dir)
    {
        // FIXME: Do we need to support files larger than 4GB?
        return call<void>("Seek", (int32_t)position, (int)seek_dir);
    }
    size_t GetSize()
    {
        return call<size_t>("GetSize");
    };
    size_t GetOffset()
    {
        return call<size_t>("GetOffset");
    };
};

struct IWriteableWrapper : public emscripten::wrapper<parakeet_crypto::IWriteable>
{
    EMSCRIPTEN_WRAPPER(IWriteableWrapper);

    bool Write(const uint8_t *buffer, size_t len)
    {
        return call<bool>("Write", (uintptr_t)buffer, len);
    }
};
