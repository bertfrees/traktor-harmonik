(ns app.client
  (:require [clojure.browser.repl :as repl])
  (:use [cljs.reader :only [read-string]]
        [jayq.core :only [ajax]]))

(defn log [message]
  (.log js/console
    (cond (string? message) message
          :else (pr-str message))))

(defn remote-apply [remote & args]
  (fn this
    ([] (this nil))
    ([callback]
       (let [url "/_remote"
             data (pr-str (apply list remote args))]
         (log (str "calling remote " (name remote) " " args))
         (if (nil? callback)
           (.-responseText (ajax url {:data data :async false}))
           (ajax url {:data data
                      :success #(let [response (read-string %)]
                                  (log (str "getting " (name remote) ": " response))
                                  (callback response))}))))))

(defn socket [channel callback]
  (let [url (str "ws://localhost:8080/" (name channel))
        socket (js/WebSocket. url)]
    (set! (.-onopen socket) #(log (str (name channel) " socket opened")))
    (set! (.-onmessage socket)
      #(let [response (read-string (.-data %))]
         (log (str "getting response on " (name channel) " socket: " response))
         (if (and (not (= (first response) :EXCEPTION))
                  (not (nil? callback)))
           (apply callback response))))
    (fn send [message & args]
      (let [request (apply list message args)]
        (log (str "sending request on " (name channel) " socket: " request))
        (.send socket (pr-str request))))))
