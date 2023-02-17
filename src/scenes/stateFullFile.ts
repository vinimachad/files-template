interface IView {
  sceneName: string;
  sceneNameWithSnakeCase: string
}

export default ({ sceneName, sceneNameWithSnakeCase }: IView) => `
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/placeholder.dart';

import '${sceneNameWithSnakeCase}_interactor.dart';
import '${sceneNameWithSnakeCase}_presenter.dart';

abstract class ${sceneName}DisplayLogic {
  void displaySomething();
}

class ${sceneName}View extends StatefulWidget {
  const ${sceneName}View({super.key});

  @override
  State<${sceneName}View> createState() => _${sceneName}ViewState();
}

class _${sceneName}ViewState extends State<${sceneName}View> implements ${sceneName}DisplayLogic {
  ${sceneName}BusinessLogic? interactor;

  @override
  void initState() {
    var view = this;
    var interactor = ${sceneName}Interactor();
    var presenter = ${sceneName}Presenter();
    presenter.view = view;
    interactor.presenter = presenter;
    this.interactor = interactor;
    super.initState();
  }

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