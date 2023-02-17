interface IInteractor {
  sceneName: string;
}

export default ({ sceneName }: IInteractor) => `

abstract class ${sceneName}BusinessLogic {
  void loadSomething();
}

class ${sceneName}Interactor implements ${sceneName}BusinessLogic {
  ${sceneName}PresentingLogic? presenter;

  @override
  void loadSomething() {
    presenter?.presentSomething();
  }
}
`;