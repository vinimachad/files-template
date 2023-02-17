interface IView {
  sceneName: string;
  sceneNameWithSnakeCase: string
}

export default ({ sceneName, sceneNameWithSnakeCase }: IView) => `
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

import '${sceneNameWithSnakeCase}_interactor.dart';
import '${sceneNameWithSnakeCase}_presenter.dart';

abstract class ${sceneName}DisplayLogic {
  void displaySomething();
}

class ${sceneName}View extends StatelessWidget implements ${sceneName}DisplayLogic {
  const ${sceneName}View({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }

  @override
  void displaySomething() {
    print('Display Something');
  }
}
`;