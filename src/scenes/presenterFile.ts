interface IPresent {
  sceneName: string;
  sceneNameWithSnakeCase: string
}

export default ({ sceneName, sceneNameWithSnakeCase }: IPresent) => `
import '${sceneNameWithSnakeCase}_view.dart';

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