import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as vscode from 'vscode';
import createFileFromTemplate from './handlers/createFileFromTemplate';
import setupFileTemplates from './handlers/setupFileTemplates';

export interface IConfiFile {
	templates: {[x: string]: void};
}

export interface ITemplate {
	vars: string[];
}

export function activate(context: vscode.ExtensionContext) {
	let rootPath = path.join(__dirname, '../', '/templates');
	let disposable = [
		vscode.commands.registerCommand('filestemplate.createFileTemplates', async args => {
			createFileFromTemplate(rootPath, args.fsPath, loadYaml(rootPath));
		}),
		
		vscode.commands.registerCommand('filestemplate.setupFileTemplates', async args => {
			setupFileTemplates();
		})
	];

	context.subscriptions.push(...disposable);
}

export function deactivate() { }

const loadYaml = (rootPath: string): IConfiFile => {
	let raw = fs.readFileSync(rootPath.concat('/config-templates.yaml')).toString();
	return yaml.load(raw) as IConfiFile;
};
