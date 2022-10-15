"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewDiaryEntry = ({ comment, date, weather, visibility, }) => {
    const newEntry = {
        comment: parseComment(comment),
        date: parseDate(date),
        weather: parseWeather(weather),
        visibility: parseVisibility(visibility),
    };
    return newEntry;
};
const parseComment = (comment) => {
    if (!comment || !isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }
    return comment;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseWeather = (weather) => {
    if (!weather || isWeather(weather)) {
        throw new Error('Incorrect or missing weather');
    }
    return weather;
};
const isWeather = (param) => {
    return Object.values(types_1.Weather).includes(param);
};
const parseVisibility = (visibility) => {
    if (!visibility || !isVisibility) {
        throw new Error('Incorrect or unknown visibility');
    }
    return visibility;
};
const isVisibility = (param) => {
    return Object.values(types_1.Visibility).includes(param);
};
exports.default = toNewDiaryEntry;
