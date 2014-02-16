(ns app.client)

(defmacro defremote [remote args]
  `(defn ~remote ~args
     (remote-apply ~(keyword (name remote)) ~@args)))
