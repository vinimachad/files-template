import * as Mustache from 'mustache';
import mapDefaultVariables from '../../defaultVariables/mapDefaultVariables';
import { ITemplate } from '../../extension';
import { Localized } from '../../localizableStrings/localized';
import { AppManager } from '../../utils/AppManager';
import { createDirAndCopy, createFile, dirStats, readDir, readFile, renameDir } from '../../utils/fileSystem';
import { showInput } from '../../utils/vscodeActions';

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

    createDirAndCopy(selectedTemplatePath, destinationPathSceneName);
    updateVariablesInTemplate(destinationPathSceneName, filledVars);

    async function showMultInputs() {
        if (selectedOption.vars) {
            for (var variable of selectedOption.vars) {

                let value = await showInput(
                    Localized.varInput(variable).title,
                    Localized.varInput(variable).placeholder
                );

                if (!value) {
                    return;
                }
                filledVars = { ...filledVars, [variable]: value };
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
    let itemsInsideDir = readDir(basePath);

    itemsInsideDir.forEach(item => {
        const stats = dirStats(basePath.concat('/', item));
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
            let unRenderedFile = readFile(path.concat('/', item));
            let renderedFile = Mustache.render(unRenderedFile, filledVars);
            createFile(path.concat('/', item), renderedFile);
        }
    });
};

const renderTemplateVars = (path: string, filledVars: any): string[] => {
    let items = readDir(path);
    items.forEach(item => {
        let formated = Mustache.render(item, filledVars);
        renameDir(path.concat('/', item), path.concat('/', formated));
    });

    return readDir(path);
};

const checkIfIsFile = (item: string, path: string) => {
    const stats = dirStats(path.concat('/', item));
    if (!stats.isDirectory()) {
        return item;
    }
};