import * as vscode from "vscode";
import { IConfiFile, ITemplate } from "../extension";
import { AppManager } from "../utils/AppManager";
import createScene from "./createScene/createScene";

export default async (config: IConfiFile) => {
    const appManager = AppManager.shared;
    const templateOptions = buildTemplateOptions();
    const selectedOptionQuickPick = await getSelectedQuickPickOption();
    const selectedOption = config.templates[selectedOptionQuickPick] as unknown as ITemplate;
    await getSceneNameInput();
    
    createScene({selectedOption});

    async function getSceneNameInput(): Promise<string> {
        let sceneName = await vscode.window.showInputBox({
            title: "Nome da cena",
            placeHolder: "Escreva o nome da sua cena",
        });
    
        if (!sceneName) {
            return '';
        }
        appManager.setSceneName(sceneName);
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

        appManager.setSelectedOption(selectedOptionQuickPick);

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