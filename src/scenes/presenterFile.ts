interface IPresent {
  sceneName: string;
}

export default ({ sceneName }: IPresent) => `
abstract class ${sceneName}PresentingLogic {
  void presentSomething();
}

class ${sceneName}Presenter implements ${sceneName}PresentingLogic {
  ${sceneName}DisplayLogic? view;

  @override
  void presentSomething() {
    view?.displaySomething();
  }
}
`;