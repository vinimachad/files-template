import * as fs from 'fs';
import * as vscode from 'vscode';
import interactorFile from '../scenes/interactorFile';
import presenterFile from '../scenes/presenterFile';
import stateFullFile from '../scenes/stateFullFile';
import statlessFile from '../scenes/statlessFile';
import toSnakeCase from '../utils/toSnakeCase';

interface ICreateScene {
    sceneName: string
    path: string
    isStateFull: boolean
}

export default ({ path, sceneName, isStateFull }: ICreateScene) => {
    const config = vscode.workspace.getConfiguration('filestemplate');
    const absolutePath = path.concat('/', sceneName);

    const fileExtension = config.get('fileExtension') as string;
        
    let sceneNameWithSnakeCase = toSnakeCase(sceneName);

    createDir(absolutePath, sceneName);

    if (isStateFull) {
        createStateFullScene();
    } else {
        createStateLessScene();
    }

    function createStateFullScene() {
        createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_view.${fileExtension}`), stateFullFile({sceneName}));
        createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_presenter.${fileExtension}`), presenterFile({sceneName}));
        createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_interactor.${fileExtension}`), interactorFile({sceneName}));
    };
    
    function createStateLessScene() {
        createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_view.${fileExtension}`), statlessFile({sceneName}));
        createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_presenter.${fileExtension}`), presenterFile({sceneName}));
        createFile(absolutePath.concat('/', `${sceneNameWithSnakeCase}_interactor.${fileExtension}`), interactorFile({sceneName}));
    };
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