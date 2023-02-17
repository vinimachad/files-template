interface IView {
  sceneName: string;
}

export default ({ sceneName }: IView) => `
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/placeholder.dart';

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
  ${sceneName}RoutingLogic? router;

  @override
  void initState() {
    var view = this;
    var interactor = ${sceneName}Interactor();
    var presenter = ${sceneName}Presenter();
    var router = ${sceneName}Router();
    presenter.view = view;
    interactor.presenter = presenter;
    this.interactor = interactor;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return const Placeholder()
  }

  @override
  void displaySomething() {
    print('Display Something');
  }
}
`;