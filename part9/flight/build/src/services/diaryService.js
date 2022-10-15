"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diariesData_1 = __importDefault(require("../../data/diariesData"));
const getEntries = () => {
    return diariesData_1.default;
};
const getNonSensitiveDiaryEntries = () => {
    return diariesData_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const findById = (id) => {
    const entry = diariesData_1.default.find((d) => d.id === id);
    return entry;
};
const addDiary = (entry) => {
    const newDairyEntry = Object.assign(Object.assign({}, entry), { id: Math.max(...diariesData_1.default.map((d) => d.id)) + 1 });
    diariesData_1.default.push(newDairyEntry);
    return newDairyEntry;
};
exports.default = {
    getEntries,
    addDiary,
    getNonSensitiveDiaryEntries,
    findById,
};
