import exp = require("constants");
import * as fs from "fs";
import { AppError } from "../models/AppError";
import { showError } from "./vscodeActions";

export const copyDir = (source: string, destination: string, recursive: boolean = true) => {
    fs.cpSync(source, destination, { recursive });
};

export const readAndCreateFile = (readPath: string, createFilePath: string) => {
    let data = readFile(readPath);
    createFile(createFilePath, data);
};

export const readFile = (path: string, encoding: BufferEncoding = 'utf-8'): string => {
    try {
        return fs.readFileSync(path, { encoding });
    } catch (err) {
        AppError.mapError('EREAD', showError);
        return '';
    }
};

export const readDir = (path: string) => {
    try {
        return fs.readdirSync(path);
    } catch (err) {
        AppError.mapDirErrors(err, showError);
        return [];
    }
};

export const createFile = (path: string, data: string) => {
    try {
        fs.writeFileSync(path, data);
    } catch (err) {
        AppError.mapDirErrors(err, showError);
    }
};

export const createDir = (path: string) => {
    try {
        fs.mkdirSync(path);
    } catch (err) {
        AppError.mapDirErrors(err, showError);
    }
};

export const createDirAndCopy = (source: string, destination: string, recursive: boolean = true) => {
    createDir(destination);
    copyDir(source, destination, recursive);
};

export const dirStats = (path: string) => {
    return fs.statSync(path);
};

export const renameDir = (oldPath: string, newPath: string) => {
    fs.renameSync(oldPath, newPath);
};