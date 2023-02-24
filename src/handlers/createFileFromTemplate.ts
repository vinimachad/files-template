import * as vscode from "vscode";
import { IConfiFile, ITemplate } from "../extension";
import createScene from "./createScene/createScene";

export default async (templatePath: string, currentPath: string, config: IConfiFile) => {
    var templateOptions: string[] = [];
    for (var key in config.templates) {
        templateOptions.push(key);
    }
    
    let selectedOptionQuickPick = await vscode.window.showQuickPick(templateOptions, {
        title: "Templates",
        placeHolder: "Selecione o template desejado."
    });

    if (!selectedOptionQuickPick) {
        return;
    }

    let selectedOption = config.templates[selectedOptionQuickPick] as unknown as ITemplate;
    let sceneName = await vscode.window.showInputBox({
        title: "Nome da cena",
        placeHolder: "Escreva o nome da sua cena",
    });

    if (!sceneName) {
        return;
    }
    createScene({
        sceneName,
        selectedOption,
        templatePath,
        destinationPath: currentPath,
        optionKind: selectedOptionQuickPick
    });
};