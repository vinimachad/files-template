import * as vscode from "vscode";
import { IConfiFile, ITemplate } from "../extension";
import createScene from "./createScene/createScene";

export default async (templatePath: string, currentPath: string, config: IConfiFile) => {
    
    const templateOptions = buildTemplateOptions();
    const selectedOptionQuickPick = await getSelectedQuickPickOption();
    const selectedOption = config.templates[selectedOptionQuickPick] as unknown as ITemplate;
    const sceneName = await getSceneNameInput();
    
    createScene({
        sceneName,
        selectedOption,
        templatePath,
        destinationPath: currentPath,
        optionKind: selectedOptionQuickPick
    });

    async function getSceneNameInput(): Promise<string> {
        let sceneName = await vscode.window.showInputBox({
            title: "Nome da cena",
            placeHolder: "Escreva o nome da sua cena",
        });
    
        if (!sceneName) {
            return '';
        }

        return sceneName;
    }

    async function getSelectedQuickPickOption(): Promise<string> {
        let selectedOptionQuickPick = await vscode.window.showQuickPick(templateOptions, {
            title: "Templates",
            placeHolder: "Selecione o template desejado."
        });
    
        if (!selectedOptionQuickPick) {
            return '';
        }

        return selectedOptionQuickPick;
    }

    function buildTemplateOptions(): string[] {
        let options: string[] = [];
        for (var key in config.templates) {
            options.push(key);
        }
        return options;
    }
};