import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as vscode from 'vscode';
import createScene from './createScene/createScene';

export interface IConfiFile {
	kinds: string[];
	templates: ITemplate[];
}

export interface ITemplate {
	kind: string;
	vars: string[];
}

const handleTemplatePath = async (templatePath: string, currentPath: string, config: IConfiFile) => {

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

export function activate(context: vscode.ExtensionContext) {
	let disposable = [
		vscode.commands.registerCommand('filestemplate.createFileTemplates', async args => {
			let rootFolders = vscode.workspace.workspaceFolders;
			if (!rootFolders) {
				return;
			}
			let rootPath = rootFolders[0].uri.fsPath;
			let raw = fs.readFileSync(rootPath.concat('/', 'templates.yaml')).toString();
			let data = yaml.load(raw) as IConfiFile;
			handleTemplatePath(rootPath.concat('/templates'), args.fsPath, data);
		})
	];

	context.subscriptions.push(...disposable);
}

const showDialog = (text: string) => {
	vscode.window.showInformationMessage(text);
};

export function deactivate() { }
