interface IInteractor {
  sceneName: string;
  sceneNameWithSnakeCase: string
}

export default ({ sceneName, sceneNameWithSnakeCase }: IInteractor) => `
import '${sceneNameWithSnakeCase}_presenter.dart';

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