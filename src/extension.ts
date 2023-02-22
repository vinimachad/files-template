import * as fs from 'fs';
import * as vscode from 'vscode';
import createScene from './createScene/createScene';

const handleCreateScene = async (args: any, isStateFull: boolean) => {
	const sceneName = await vscode.window.showInputBox({
		prompt: `Enter the scene name:`,
		ignoreFocusOut: true,
		valueSelection: [-1, -1],
	});

	if (!sceneName) {
		return;
	}

	if (args) {
		const path = String(args.fsPath);
		// createScene({ sceneName, path, isStateFull });
	}
};

const handleTemplatePath = async (templatePath: string, currentPath: string) => {
	let getOptions = fs.readdirSync(templatePath);
	let templateFolderExists = getOptions.find((options) => options === "templates");

	if (templateFolderExists) {
		let pathOfTemplates = templatePath.concat('/', 'templates');
		let options = fs.readdirSync(pathOfTemplates);
		let selectedOption = await vscode.window.showQuickPick(options, {
			title: "Templates",
			placeHolder: "Selecione o template desejado."
		});

		if (!selectedOption) {
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
			selectedOption,
			basePath: pathOfTemplates,
			destinationPath: currentPath
		});
	} else {
		showDialog('Crie uma pasta `templates` e passe a localizção do diretorio corretamente, nas configurações da extensão');
	}
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = [
		vscode.commands.registerCommand('filestemplate.createFileTemplates', async args => {
			let templatePath = "/Users/vinimachad/.vscode/extensions/undefined.filestemplate-0.0.1";
			handleTemplatePath(templatePath, args.fsPath);
		}),
		vscode.commands.registerCommand('filestemplate.createVIPSceneStateLess', async args => {
			handleCreateScene(args, false);
		})
	];

	context.subscriptions.push(...disposable);
}

const showDialog = (text: string) => {
	vscode.window.showInformationMessage(text);
};

export function deactivate() { }
