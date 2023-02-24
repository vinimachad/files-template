import * as fs from "fs";
import * as path from 'path';
import * as vscode from "vscode";
import { AppError } from "../models/AppError";
import getRootPath from "../utils/getRootPath";

export default () => {
    let rootPath = getRootPath();
    let templatesPath = rootPath.concat('/templates');
    let configTemplatePath = path.join(__dirname, '../', '../', '/templates');

    let yamlTemplatePath = configTemplatePath.concat('/configTemplateYaml.yaml');
    let yamlConfigExamplePath = templatesPath.concat('/config-templates.yaml');

    let templateExamplePath = configTemplatePath.concat('/TemplateExample');

    createDir(templatesPath);
    readAndCreateFile(yamlTemplatePath, yamlConfigExamplePath);
    copyDir(templateExamplePath, templatesPath.concat('/TemplateExample'));
};

const copyDir = (source: string, destination: string) => {
    fs.cpSync(source, destination, {recursive: true});
};

const readAndCreateFile = (readPath: string, createFilePath: string) => {
    let data = readFile(readPath);
    createFile(createFilePath, data);
};

const readFile = (path: string, encoding: BufferEncoding = 'utf-8'): string => {
    try {
        return fs.readFileSync(path, { encoding });
    } catch (err) {
        AppError.mapError('EREAD', showError);
        return '';
    }
};

const createFile = (path: string, data: string) => {
    try {
        fs.writeFileSync(path, data);
    } catch (err) {
        console.log(err);
        AppError.mapDirErrors(err, showError);
    }
};

const createDir = (path: string) => {
    try {
        fs.mkdirSync(path);
    } catch (err) {
        AppError.mapDirErrors(err, showError);
    }
};

const showError = (message: string) => {
    vscode.window.showErrorMessage(message);
};