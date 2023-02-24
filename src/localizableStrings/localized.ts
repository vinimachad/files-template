export class Localized {

    static error = {
        exists: `Você já fez o setup de templates nesse projeto! 
        Se quer fazer o setup novamente, remova a pasta templates do seu projeto.`,
        read: `Não foi possivel ler esse arquivo, tente novamente!`
    };

    static sceneNameInput = {
        title: `Nome da cena`,
        placeholder: `Escreva o nome da sua cena`
    };

    static quickTemplates = {
        title: `Templates`,
        placeholder: `Selecione o template desejado.`
    };

    static varInput(name: string) {
        return {
            title: name,
            placeholder: `Escreva o valor da variável ${name}.`
        };
    }
}