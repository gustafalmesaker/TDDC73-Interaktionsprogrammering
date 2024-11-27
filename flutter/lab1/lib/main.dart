import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Example 1',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color.fromARGB(255, 39, 133, 42)),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Example 1'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 12, 100, 14),
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            const SizedBox(height: 20),
            // Circular Image
            ClipOval(
              child: Image.asset(
                'assets/circle.png',
                width: 120, // Adjust width and height to set the size
                height: 120,
                fit: BoxFit.cover, // Ensure the image covers the circle
              ),
            ),

            const SizedBox(height: 30),
            
            // Grid of Buttons
            Wrap(
              spacing: 20,
              runSpacing: 20,
              children: List.generate(2, (index) {
                return ElevatedButton(
                  onPressed: () {},
                  child: const Text('BUTTON'),
                );
              }),
            ),
            const SizedBox(height: 30),
            Wrap(
              spacing: 20,
              runSpacing: 20,
              children: List.generate(2, (index) {
                return ElevatedButton(
                  onPressed: () {},
                  child: const Text('BUTTON'),
                );
              }),
            ),
            const SizedBox(height: 30),

            // Email Input Field
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 40),
              child: TextField(
                decoration: InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
