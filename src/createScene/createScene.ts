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
    var values = new Object();

    for (let i = 0; i < selectedOption.vars.length; i++) {
        let value = await vscode.window.showInputBox({
            placeHolder: `Escreva o valor da variável ${selectedOption.vars[i]}`,
        });

        if (!value) {
            return;
        }

        values = {...values, [selectedOption.vars[i]]: value};
    }
    
    let destinationPathSceneName = destinationPath.concat('/', sceneName);
    fs.mkdirSync(destinationPathSceneName);
    fs.cpSync(templatePath, destinationPathSceneName, { recursive: true });

    validateIfHasFoldersIn(destinationPathSceneName, sceneName, values);
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

const createFile = (filePath: string, content: string) => {
    fs.writeFile(filePath, content, err => {
        if (err) {
            vscode.window.showInformationMessage('Erro: ', err.message);
        }
    });
};

const createDir = (path: string, sceneName: string) => {
    try {
        fs.mkdirSync(path);
    } catch (error) {
        vscode.window.showInformationMessage('Já existe uma pasta com esse nome');
    }
};

function asdaf() {
    // const config = vscode.workspace.getConfiguration('filestemplate');
    // const absolutePath = path.concat('/', sceneName);

    // const fileExtension = config.get('fileExtension') as string;

    // let sceneNameWithSnakeCase = toSnakeCase(sceneName);

    // createDir(absolutePath, sceneName);

    // if (isStateFull) {
    //     createStateFullScene();
    // } else {
    //     createStateLessScene();
    // }

    // function createStateFullScene() {
    //     createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_view.${fileExtension}`), stateFullFile({sceneName, sceneNameWithSnakeCase}));
    //     createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_presenter.${fileExtension}`), presenterFile({sceneName, sceneNameWithSnakeCase}));
    //     createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_interactor.${fileExtension}`), interactorFile({sceneName, sceneNameWithSnakeCase}));
    // };

    // function createStateLessScene() {
    //     createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_view.${fileExtension}`), statlessFile({sceneName, sceneNameWithSnakeCase}));
    //     createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_presenter.${fileExtension}`), presenterFile({sceneName, sceneNameWithSnakeCase}));
    //     createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_interactor.${fileExtension}`), interactorFile({sceneName, sceneNameWithSnakeCase}));
    // };
}