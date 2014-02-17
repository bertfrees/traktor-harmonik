[traktor-harmonik][]
====================
Harmonic mixing with Traktor

Development
-----------

### Prerequisites

The following build tools are required:

* [Leiningen][lein]
* [Sass][sass]
* make

After cloning this repository, run the following commands to
bootstrap ClojureScript:

```sh
lein deps
lein git-deps
(cd .lein-git-deps/clojurescript && script/bootstrap)
```

### Building

To build the JavaScript and CSS:

```sh
make js css
```

### Running

To fire up a server at `http://localhost:8080`:

```sh
lein run
```

### Distributing

To build a Mac OS application bundle:

```sh
make app
```

and to package it in a disk image:

```sh
make dmg
```

License
-------
Copyright © 2014 [Bert Frees][bert]

Distributed under the Eclipse Public License, the same as Clojure.


[lein]: https://github.com/technomancy/leiningen
[sass]: http://sass-lang.com/
[traktor-harmonik]: http://github.com/traktor-harmonik
[traktor]: http://www.native-instruments.com/en/traktor/
[bert]: http://github.com/bertfrees
