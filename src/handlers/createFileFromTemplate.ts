import * as vscode from "vscode";
import createScene from "../createScene/createScene";
import { IConfiFile } from "../extension";

export default async (templatePath: string, currentPath: string, config: IConfiFile) => {

    let options = config.kinds;
    let selectedOption = await vscode.window.showQuickPick(options, {
        title: "Templates",
        placeHolder: "Selecione o template desejado."
    });

    let option = config.templates.filter(template => template.kind === selectedOption)[0];

    if (!selectedOption && !option) {
        return;
    }

    let sceneName = await vscode.window.showInputBox({
        title: "Nome da cena",
        placeHolder: "Escreva o nome da sua cena",
    });

    if (!sceneName) {
        return;
    }
    createScene({
        sceneName,
        selectedOption: option,
        templatePath,
        destinationPath: currentPath
    });
};