import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as vscode from 'vscode';
import mapDefaultVariables from '../../defaultVariables/mapDefaultVariables';
import { ITemplate } from '../../extension';
import { AppManager } from '../../utils/AppManager';

interface ICreateScene {
    selectedOption: ITemplate
}

export default async ({ selectedOption }: ICreateScene) => {
    const appManager = AppManager.shared;

    const selectedTemplatePath = appManager.getSelectedTemplatePath();
    const sceneName = appManager.getSceneName();
    let destinationPathSceneName = appManager.getPathToCreateTemplate();

    var filledVars = { name: sceneName };
    await showMultInputs();
    filledVars = mapDefaultVariables(filledVars);

    createDirAndCopy();

    updateVariablesInTemplate(destinationPathSceneName, filledVars);

    function createDirAndCopy() {
        fs.mkdirSync(destinationPathSceneName);
        fs.cpSync(
            selectedTemplatePath,
            destinationPathSceneName,
            { recursive: true }
        );
    }

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

const updateVariablesInTemplate = (basePath: string, filledVars: any) => {
    let folderInfos = validateIfHasFoldersInTemplate(basePath);
    fillVariablesInFilesAndFolders(basePath, filledVars);
    
    folderInfos.forEach(info => {
        updateVariablesInTemplate(info.path, filledVars);
    });
};

const validateIfHasFoldersInTemplate = (basePath: string): { name: string, path: string }[] => {
    let folderInfo: { name: string, path: string }[] = [];
    let itemsInsideDir = fs.readdirSync(basePath);
    itemsInsideDir.forEach(item => {
        const stats = fs.statSync(basePath.concat('/', item));
        if (stats.isDirectory()) {
            folderInfo = [
                ...folderInfo,
                {
                    name: item,
                    path: basePath.concat('/', item)
                }
            ];
        }
    });

    return folderInfo;
};

const fillVariablesInFilesAndFolders = (path: string, filledVars: any) => {
    let renderedItems = renderTemplateVars(path, filledVars);    

    renderedItems.forEach(item => {
        if (checkIfIsFile(item, path)) {
            let unRenderedFile = fs.readFileSync(path.concat('/', item), { encoding: 'utf-8' });
            let renderedFile = Mustache.render(unRenderedFile, filledVars);
            fs.writeFileSync(path.concat('/', item), renderedFile);
        }
    });
};

const renderTemplateVars = (path: string, filledVars: any): string[] => {
    let items = fs.readdirSync(path);
    items.forEach(item => {
        let formated = Mustache.render(item, filledVars);
        fs.renameSync(path.concat('/', item), path.concat('/', formated));
    });

    return fs.readdirSync(path);
};

const checkIfIsFile = (item: string, path: string) => {
    const stats = fs.statSync(path.concat('/', item));
    if (!stats.isDirectory()) {
        return item;
    }
};