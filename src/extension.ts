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
		createScene({ sceneName, path, isStateFull });
	}
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = [
		vscode.commands.registerCommand('filestemplate.createVIPSceneStateFull', async args => {
			handleCreateScene(args, true);
		}),
		vscode.commands.registerCommand('filestemplate.createVIPSceneStateLess', async args => {
			handleCreateScene(args, false);
		})
	];

	context.subscriptions.push(...disposable);
}

export function deactivate() { }
