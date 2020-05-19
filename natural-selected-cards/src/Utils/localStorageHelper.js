export const getOrDefault = (key, defaultValue) => JSON.parse(localStorage.getItem(key)) ?? defaultValue;

export const setValue = (key, value) => localStorage.setItem(key, JSON.stringify(value));