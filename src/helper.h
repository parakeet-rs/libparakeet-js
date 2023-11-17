#pragma once

#include <cstdint>
#include <string>
#include <vector>

inline std::vector<uint8_t> VecFromPtr(uintptr_t ptr, size_t len)
{
    return std::vector<uint8_t>(reinterpret_cast<uint8_t *>(ptr), reinterpret_cast<uint8_t *>(ptr) + len);
}

inline std::vector<uint8_t> VecFromStr(const std::string &str)
{
    auto p = reinterpret_cast<const uint8_t *>(str.c_str());
    return std::vector<uint8_t>(p, p + str.size());
}

template <typename T> inline uintptr_t MakeSizedVector(const T *p_data, size_t count_data)
{
    auto byte_len = sizeof(T) * count_data;
    auto ptr = (uint8_t *)malloc(sizeof(uint32_t) + byte_len);

    *(uint32_t *)ptr = count_data;
    memcpy(ptr + 4, p_data, byte_len);
    return reinterpret_cast<uintptr_t>(ptr);
}

template <typename T> inline uintptr_t MakeSizedVector(const T &container)
{
    return MakeSizedVector(container.data(), container.size());
}

#define EM_ARG_VEC(name) uintptr_t ptr_##name, size_t len_##name
#define EM_VEC(name) VecFromPtr(ptr_##name, len_##name)
#define EM_VEC_PTR_LEN(name) reinterpret_cast<const uint8_t *>(ptr_##name), len_##name
