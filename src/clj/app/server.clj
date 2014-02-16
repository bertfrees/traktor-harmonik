(ns app.server
  (:use [aleph [http :only [start-http-server wrap-ring-handler wrap-aleph-handler]]
               [formats :only [url-decode]]]
        [compojure [core :only [routes GET]]
                   [route :only [resources not-found]]]
        [lamina.core :only [enqueue receive-all]]
        [ring.middleware [resource :only [wrap-resource]]
                         [file-info :only [wrap-file-info]]]))

(def pages (atom {}))
(def sockets (atom {}))
(def remotes (atom {}))

(defn defpage [url body]
  (let [page (wrap-aleph-handler
              (fn [channel request]
                (enqueue channel
                  ((-> (fn [_] {:status 200
                                :headers {"Content-Type" "text/html; charset=utf-8"}
                                :body body})
                       (wrap-resource "public")
                       (wrap-file-info))
                   request))))]
    (swap! pages assoc url page)))

(defn wrap-socket-handler [handler]
  (wrap-aleph-handler
   (fn [channel handshake]
     (if (:websocket handshake)
       (receive-all channel
         (fn [request]
           (try
             (apply handler
                    (fn [& response] (enqueue channel (pr-str response)))
                    (read-string request))
             (catch Exception e
               (enqueue channel (pr-str (list :EXCEPTION (.getName (class e)) (.getMessage e))))))))))))

(defmacro defsocket [url args & body]
  `(swap! sockets assoc ~url (wrap-socket-handler (fn ~args ~@body))))

(defmacro defremote [remote args & body]
  `(do (defn ~remote ~args ~@body)
       (swap! remotes assoc ~(keyword (name remote)) ~remote)))

(defn- remote-apply [request]
  (let [query (read-string (url-decode (:query-string request)))
        remote (@remotes (first query))
        args (rest query)
        response (apply remote args)]
    {:status 200
     :headers {"Content-Type" "text/plain; charset=utf-8"}
     :body (pr-str response)}))

(defonce server (atom nil))

(defn start []
  (if @server
    (println "Server already started")
    (do (println "Starting server on http://localhost:8080/")
        (swap! server (fn [_]
          (start-http-server
            (wrap-ring-handler
              (apply routes
                (resources "/")
                (for [[url handler] (merge @pages @sockets {"/_remote" remote-apply})]
                  (GET [url] {} handler))))
            {:host "localhost" :port 8080 :websocket true}))))))

(defn shutdown []
  (if @server
    (do (println "Shutting down server")
        (@server)
        (swap! server (fn [_] nil)))))
