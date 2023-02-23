import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as vscode from 'vscode';
import { ITemplate } from '../extension';

interface ICreateScene {
    sceneName: string
    selectedOption: ITemplate
    templatePath: string
    destinationPath: string
}

export default async ({ sceneName, selectedOption, templatePath, destinationPath }: ICreateScene) => {
    var filledVars = new Object();

    showMultInputs();
    
    let destinationPathSceneName = destinationPath.concat('/', sceneName);
    fs.mkdirSync(destinationPathSceneName);
    fs.cpSync(templatePath, destinationPathSceneName, { recursive: true });

    validateIfHasFoldersIn(destinationPathSceneName, sceneName, filledVars);

    async function showMultInputs() {
        for (let i = 0; i < selectedOption.vars.length; i++) {
            let value = await vscode.window.showInputBox({
                placeHolder: `Escreva o valor da variável ${selectedOption.vars[i]}`,
            });
    
            if (!value) {
                return;
            }
    
            filledVars = {...filledVars, [selectedOption.vars[i]]: value};
        }
    }
};

const fillVariablesInFilesAndFolders = (path: string, name: string, selectedOptions: any) => {
    let items = fs.readdirSync(path);
    items.forEach(item => {
        let formated = Mustache.render(item, { name, ...selectedOptions });
        fs.renameSync(path.concat('/', item), path.concat('/', formated));
    });

    let formatedItems = fs.readdirSync(path);

    formatedItems.forEach(item => {
        if (item.includes('.')) {
            let readed = fs.readFileSync(path.concat('/', item), { encoding: 'utf-8' });
            let filled = Mustache.render(readed, { name, ...selectedOptions });
            fs.writeFileSync(path.concat('/', item), filled);
        }
    });
};

const validateIfHasFoldersIn = (basePath: string, sceneName: string, selectedOption: any) => {
    let options = fs.readdirSync(basePath);
    let folders = options.filter(option => {
        if (!option.includes('.')) {
            return option;
        }
    });

    let folderPaths = folders.map(folder => {
        return basePath.concat('/', folder);
    });
    fillVariablesInFilesAndFolders(basePath, sceneName, selectedOption);

    folderPaths.forEach(folder => {
        validateIfHasFoldersIn(folder, sceneName, selectedOption);
    });
};