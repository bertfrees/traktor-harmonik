(defproject traktor-harmonik "1.0.0-SNAPSHOT"
  :description "Harmonic mixing with Traktor"
  :min-lein-version "2.0.0"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/clojure-contrib "1.2.0"]
                 [traktor-clj "0.1.0-SNAPSHOT"]
                 [org/jaudiotagger "2.0.3"]
                 [overtone/midi-clj "0.5.0"]
                 [hiccup "1.0.2"]
                 [aleph "0.3.0-rc2"]
                 [compojure "1.1.1"]
                 [ring "1.1.0-beta2"]
                 [crate "0.2.1"]
                 [jayq "0.3.2"]]
  :plugins [[lein-cljsbuild "0.2.1"]
            [lein-git-deps "0.0.1-SNAPSHOT"]]
  :git-dependencies [["https://github.com/clojure/clojurescript.git"
                      "bfb54e3d7035e240acea04fbfe0c342dad729d25"]]
  :source-paths ["src/clj"]
  :resource-paths ["src/resources"]
  :compile-path "target/classes"
  :main app.bootstrap
  :jvm-opts ["-Djna.library.path=target/native/macosx/x86_64"]
  :jar-exclusions [#".*\.DS_Store"]
  :uberjar-exclusions [#"native/macosx/x86_64/libtraktor\.dylib"
                       #"native/macosx/x86_64/libffi\.dylib"
                       #".*\.DS_Store"
                       #"META-INF/.*\.SF"
                       #"META-INF/.*\.DSA"
                       #"META-INF/.*\.RSA"]
  :cljsbuild {
    :repl-listen-port 9000
    :builds [{
      :source-path "src/cljs"
      :compiler {
        :output-dir "target/classes/public/js"
        :output-to "target/classes/public/js/app.js"
        :optimizations :none }}]})
