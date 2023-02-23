import * as vscode from 'vscode';

export default (): string => {
    let rootFolders = vscode.workspace.workspaceFolders;
	if (!rootFolders) {
		throw new Error();
	}
	return rootFolders[0].uri.fsPath;
};