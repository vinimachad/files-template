import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as vscode from 'vscode';
import createFileFromTemplate from './handlers/createFileFromTemplate';
import setupFileTemplates from './handlers/setupFileTemplates';
import getRootPath from './utils/getRootPath';

export interface IConfiFile {
	kinds: string[];
	templates: ITemplate[];
}

export interface ITemplate {
	kind: string;
	vars: string[];
}

export function activate(context: vscode.ExtensionContext) {

	let rootPath = getRootPath();

	let disposable = [
		vscode.commands.registerCommand('filestemplate.createFileTemplates', async args => {
			createFileFromTemplate(rootPath.concat('/templates'), args.fsPath, loadYaml(rootPath));
		}),
		
		vscode.commands.registerCommand('filestemplate.setupFileTemplates', async args => {
			setupFileTemplates();
		})
	];

	context.subscriptions.push(...disposable);
}

export function deactivate() { }

const loadYaml = (rootPath: string): IConfiFile => {
	let raw = fs.readFileSync(rootPath.concat('/templates', '/config-templates.yaml')).toString();
	return yaml.load(raw) as IConfiFile;
};
