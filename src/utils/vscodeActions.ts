import * as vscode from 'vscode';

export const showError = (message: string) => {
    vscode.window.showErrorMessage(message);
};

export const showInput = async (title: string, placeHolder: string): Promise<string | undefined> => {
    return await vscode.window.showInputBox({ title, placeHolder });
};

export const showQuickPick = async (
    options: string[],
    title: string,
    placeHolder: string
): Promise<string | undefined> => {
    return await vscode.window.showQuickPick(options, { title, placeHolder });
};