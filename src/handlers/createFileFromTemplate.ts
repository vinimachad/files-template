import { IConfiFile, ITemplate } from "../extension";
import { Localized } from "../localizableStrings/localized";
import { AppManager } from "../utils/AppManager";
import { showInput, showQuickPick } from "../utils/vscodeActions";
import createScene from "./createScene/createScene";

export default async (config: IConfiFile) => {
    const appManager = AppManager.shared;
    const templateOptions = buildTemplateOptions();
    const selectedOptionQuickPick = await getSelectedQuickPickOption();
    const selectedOption = config.templates[selectedOptionQuickPick] as unknown as ITemplate;
    await getSceneNameInput();

    createScene({ selectedOption });

    async function getSceneNameInput() {
        let sceneName = await showInput(Localized.sceneNameInput.title, Localized.sceneNameInput.placeholder);

        if (!sceneName) {
            return;
        }

        appManager.setSceneName(sceneName);
    }

    async function getSelectedQuickPickOption(): Promise<string> {
        let selectedOptionQuickPick = await showQuickPick(
            templateOptions,
            Localized.quickTemplates.title,
            Localized.quickTemplates.placeholder
        );

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