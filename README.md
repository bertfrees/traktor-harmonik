[traktor-harmonik][]
====================

This is an add-on to the DJ software [Traktor][traktor] for improving
its "[harmonic mixing][harmonic-mixing]" capabilities.

> Harmonic mixing is an innovative way to mix tracks together,
> creating perfect DJ sets.
> [ ... ]
> By mixing tracks that are in the same or related keys, harmonic
> mixing enables long blends and mash-ups. The goal is to eliminate
> key clashes.

Traktor already supports *key shifting* and in recent versions even
automatic *key detection*. These are two important features needed for
harmonic mixing. The third ingredient, *key matching*, is missing from
Traktor however.

This tool adds the logic for computing compatible keys, and a visual
aid for very easily matching the keys of two tracks. Each deck has an
*advanced* key knob with three indicator LEDs instead of one:
- The blue LED represents the (implicit) key shift that is caused by
  changing the tempo of the track (time stretching).
- The green LED measures the amount of frequency shifting that is
  performed by turning the key knob. This value will be proportional
  to the degradation of your sound quality.
- Last but not least, the red LED indicates the mismatch between the
  current key and the keys that are compatible with the master track.

The secret behind the key matching is the Camelot system as explained
[here](http://www.harmonic-mixing.com/HowTo.aspx).

In the screenshot below, at the bottom of the screen, between the
decks, you can see the advanced key knobs in action. Also, below the
decks are two auxiliary *key-mismatch-meters* which display exactly
the same as the red LEDs, but with more detail.

![](https://raw.github.com/bertfrees/traktor-harmonik/doc/screenshot.png)

Traktor doesn't support add-ons in the true sense of the word. This
tool is a standalone program that communicates with Traktor through
some backdoors. However, in order to create the illusion that it is
properly integrated in Traktor, the tool was given exactly the same
look and feel as Traktor, so that you can almost seamlessly stack the
windows of the two programs on top of each other. This was done in the
screenshot above.

Setup
-----

- To make sure that Traktor sends out a MIDI clock signal, follow these
  [instructions](http://www.native-instruments.com/knowledge/questions/817/How+to+send+a+MIDI+clock+sync+signal+from+TRAKTOR%3F).
- In order to get hold of the track info of your decks, add the DENON
  HC4500 to your list of controllers and set `Out-Port` to `Traktor
  Virtual Output`. By doing so we trick Traktor into believing the
  HC4500 is connected, and it will start broadcasting the track info
  of decks A and B, encoded in MIDI.  (Credits for this clever hack go
  to [Siytek](http://forum.djtechtools.com/showthread.php?t=28523)).
- A MIDI controller is required. For each deck, choose a knob on your
  controller and assign it to the key shift functions in both Traktor
  and the add-on. In the add-on, assigning controls can be done with
  the blue buttons below the key knobs.
- All songs must be properly tagged with key information. Newer
  versions of Traktor have a key detection feature to help you with
  that. There is also external software that can do this, such as
  [Mixed In Key][mixed-in-key] or [Rapid Evolution][rapid-evolution].
- All songs have to be in your Traktor Library. (And moreover,
  the `collection.nml` file must be stored at the default place,
  namely `/Users/<your name>/Music/Traktor/`).

Limitations and pitfalls
------------------------

- Currently this software is Mac only. Windows users are on their own
  for now. Please contact me if you are a Windows programmer and you
  need some help to make it work.
- When you launch the application, it will automatically try to launch
  Google Chrome. Make sure you extract the app from the .dmg file
  before launching it, because otherwise Chrome will crash. If you
  don't have Chrome, just use your favourite browser instead and go to
  `http://localhost:8080`. Note however that I have only tested with
  Chrome, it might look slightly different in other browsers.
- While launching, the application will also try to position the
  window at the bottom of the screen. It tries to make itself as small
  as possible, in order to leave enough space for Traktor
  itself. Just maximize the window to the see everything.
- Make sure you feel confident enough playing with this software
  before using it live! On slow computers it may have a negative
  influence on Traktor's sound quality. 

For developers
--------------

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


[traktor-harmonik]: http://github.com/traktor-harmonik
[traktor]: http://www.native-instruments.com/en/products/traktor/dj-software/traktor-pro-2
[harmonic-mixing]: http://www.harmonic-mixing.com
[mixed-in-key]: http://www.mixedinkey.com
[rapid-evolution]: http://www.mixshare.com/wiki/doku.php?id=rapid_evolution
[lein]: https://github.com/technomancy/leiningen
[sass]: http://sass-lang.com/
[bert]: http://github.com/bertfrees


