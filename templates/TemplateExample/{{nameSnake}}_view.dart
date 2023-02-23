import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';

class {{ namePascal }}View extends StatefulWidget {
  const {{ namePascal }}View({super.key});

  @override
  State<{{ namePascal }}View> createState() => _{{ namePascal }}ViewState();
}

class _{{ namePascal }}ViewState extends State<{{ namePascal }}View> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder(
      child: Text('{{ exampleVar }}'),
    );
  }
}
