import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as vscode from 'vscode';
import createFileFromTemplate from './handlers/createFileFromTemplate';
import { AppManager } from './utils/AppManager';

export interface IConfiFile {
	templates: {[key: string]: void};
}

export interface ITemplate {
	vars: string[];
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = [
		vscode.commands.registerCommand('filestemplate.createFileTemplates', async args => {
			AppManager.shared.setPathToCreateTemplate(args.fsPath);
			createFileFromTemplate(loadYaml());
		}),
	];

	context.subscriptions.push(...disposable);
}

export function deactivate() { }

const loadYaml = (): IConfiFile => {
	let configTemplatesPath = AppManager.shared.getConfigTemplatesPath();
	let raw = fs.readFileSync(configTemplatesPath).toString();
	return yaml.load(raw) as IConfiFile;
};
