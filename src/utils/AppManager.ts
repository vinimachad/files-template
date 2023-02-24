import * as path from 'path';

export class AppManager {
    
    static shared: AppManager = new AppManager();

    private selectedOption?: string;
    private sceneName?: string;
    private pathToCreateTemplate?: string;

    constructor() { }

    getTemplatesPath(): string {
        return path.join(__dirname, '../', '../', '/templates');
    }

    getConfigTemplatesPath(): string {
        return this.getTemplatesPath().concat('/config-templates.yaml');
    }

    getSelectedTemplatePath(): string {
        return this.getTemplatesPath().concat('/', this.selectedOption ?? '');
    }

    getPathToCreateTemplate(): string {
        return this.pathToCreateTemplate?.concat('/', this.sceneName ?? '') ?? '';
    }

    getSceneName(): string {
        return this.sceneName ?? '';
    }

    setSceneName(name: string) {
        this.sceneName = name;
    }

    setPathToCreateTemplate(path: string) {
        this.pathToCreateTemplate = path;
    }

    setSelectedOption(option: string) {
        this.selectedOption = option;
    }
}