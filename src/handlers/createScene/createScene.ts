import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as vscode from 'vscode';
import mapDefaultVariables from '../../defaultVariables/mapDefaultVariables';
import { ITemplate } from '../../extension';

interface ICreateScene {
    sceneName: string
    optionKind: string
    selectedOption: ITemplate
    templatePath: string
    destinationPath: string
}

export default async ({ sceneName, selectedOption, templatePath, destinationPath, optionKind }: ICreateScene) => {
    var filledVars = {
        name: sceneName,
    };

    await showMultInputs();
    filledVars = mapDefaultVariables(filledVars);

    let destinationPathSceneName = destinationPath.concat('/', sceneName);
    fs.mkdirSync(destinationPathSceneName);
    fs.cpSync(templatePath.concat('/', optionKind), destinationPathSceneName, { recursive: true });

    validateIfHasFoldersIn(destinationPathSceneName, filledVars);

    async function showMultInputs() {
        if (selectedOption.vars) {
            for (let i = 0; i < selectedOption.vars.length; i++) {
                let value = await vscode.window.showInputBox({
                    title: selectedOption.vars[i],
                    placeHolder: `Escreva o valor da variável ${selectedOption.vars[i]}`,
                });

                if (!value) {
                    return;
                }

                filledVars = { ...filledVars, [selectedOption.vars[i]]: value };
            }
        }
    }
};

const fillVariablesInFilesAndFolders = (path: string, filledVars: any) => {
    let items = fs.readdirSync(path);
    items.forEach(item => {
        let formated = Mustache.render(item, filledVars);
        fs.renameSync(path.concat('/', item), path.concat('/', formated));
    });

    let formatedItems = fs.readdirSync(path);

    formatedItems.forEach(item => {
        if (item.includes('.')) {
            let readed = fs.readFileSync(path.concat('/', item), { encoding: 'utf-8' });
            let filled = Mustache.render(readed, filledVars);
            fs.writeFileSync(path.concat('/', item), filled);
        }
    });
};

const validateIfHasFoldersIn = (basePath: string, filledVars: any) => {
    let options = fs.readdirSync(basePath);
    let folders = options.filter(option => {
        if (!option.includes('.')) {
            return option;
        }
    });

    let folderPaths = folders.map(folder => {
        return basePath.concat('/', folder);
    });
    fillVariablesInFilesAndFolders(basePath, filledVars);

    folderPaths.forEach(folder => {
        validateIfHasFoldersIn(folder, filledVars);
    });
};