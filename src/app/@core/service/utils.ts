import { Cooling } from '../models/Cooling';

interface AnyObject { [key: string]: any; }

export const lowercaseObjectKeys = (obj: AnyObject, deep = false) =>
    Object.keys(obj).reduce((acc, key) => {
        acc[key.toLocaleLowerCase()] =
            deep && typeof obj[key] === 'object' ? lowercaseObjectKeys(obj[key]) : obj[key];
        return acc;
    }, {} as AnyObject);

export const camelize = (str: string) => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
}

export const ConvertKeysToLowerCase = (obj: AnyObject) => {
    const output = {};
    for (const i in obj) {
        if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
            output[i.toLowerCase()] = ConvertKeysToLowerCase(obj[i]);
        } else if (Object.prototype.toString.apply(obj[i]) === '[object Array]') {
            output[i.toLowerCase()] = [];
            output[i.toLowerCase()].push(ConvertKeysToLowerCase(obj[i][0]));
        } else {
            output[i.toLowerCase()] = obj[i];
        }
    }
    return output;
};

export const ConvertKeysToUpperCase = (obj: AnyObject) => {
    const output = {};
    for (const i in obj) {
        if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
            output[camelize(i)] = ConvertKeysToUpperCase(obj[i]);
        } else if (Object.prototype.toString.apply(obj[i]) === '[object Array]') {
            output[camelize(i)] = [];
            output[camelize(i)].push(ConvertKeysToUpperCase(obj[i][0]));
        } else {
            output[camelize(i)] = obj[i];
        }
    }
    return output;
};
