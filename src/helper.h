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

#define EM_ARG_VEC(name) uintptr_t ptr_##name, size_t len_##name
#define EM_VEC(name) VecFromPtr(ptr_##name, len_##name)
#define EM_VEC_PTR_LEN(name) reinterpret_cast<const uint8_t *>(ptr_##name), len_##name
