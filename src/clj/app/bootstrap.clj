(ns app.bootstrap
  (:require [app.view]
            [app.controller]
            [app.server :as server])
  (:gen-class))

(defn -main [& args] (server/start))

(defn restart [] (server/shutdown) (server/start))
