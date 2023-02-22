import * as fs from 'fs';
import * as Mustache from 'mustache';
import * as vscode from 'vscode';

interface ICreateScene {
    sceneName: string 
    selectedOption: string
    basePath: string
    destinationPath: string
}

export default ({ sceneName, selectedOption, basePath, destinationPath }: ICreateScene) => {

    let optionPath = basePath.concat('/', selectedOption);
    let destinationPathSceneName = destinationPath.concat('/', sceneName);
    fs.mkdirSync(destinationPathSceneName);
    fs.cpSync(optionPath, destinationPathSceneName, { recursive: true });

    validateIfHasFoldersIn(destinationPathSceneName, sceneName);
};

const fillVariablesInFilesAndFolders = (path: string, name: string) => {
	let items = fs.readdirSync(path);
	items.forEach(item => {
		let formated = Mustache.render(item, { name });
		fs.renameSync(path.concat('/', item), path.concat('/', formated));
	});

	let formatedItems = fs.readdirSync(path);

	formatedItems.forEach(item => {
		if (item.includes('.')) {
			let readed = fs.readFileSync(path.concat('/', item), { encoding: 'utf-8' });
			let filled = Mustache.render(readed, { name });
			fs.writeFileSync(path.concat('/', item), filled);
		}
	});
};

const validateIfHasFoldersIn = (basePath: string, sceneName: string) => {
	let options = fs.readdirSync(basePath);
	let folders = options.filter(option => {
		if (!option.includes('.')) {
			return option;
		}
	});
	let folderPaths = folders.map(folder => {
		return basePath.concat('/', folder);
	});
    fillVariablesInFilesAndFolders(basePath, sceneName);
	
    folderPaths.forEach(folder => {
        validateIfHasFoldersIn(folder, sceneName);
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