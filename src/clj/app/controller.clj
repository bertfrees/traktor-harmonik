(ns app.controller
  (:require [app.midi :as midi]
            [app.applescript :as applescript]
            [traktor.midi]
            [traktor.collection]
            [clojure.string :as str])
  (:import [org.jaudiotagger.audio AudioFileIO]
           [org.jaudiotagger.tag FieldKey])
  (:use [app.server :only [defremote defsocket]]
        [clojure.contrib.core :only [dissoc-in]]))

;; ---------------------------------------------
;; midi
;; ---------------------------------------------

(defn midi->pitch-shift [value]
  (cond (< value 61) (* (/ 12 61) (- value 61))
        (<= value 66) 0
        :else (* (/ 12 61) (- value 66))))

(def cancel-watch-pitch-shift (atom {}))

(defn watch-pitch-shift [channel deck active]
  (let [cancel (get-in @cancel-watch-pitch-shift [deck])]
    (if active
      (when (nil? cancel)
        (swap! cancel-watch-pitch-shift assoc-in [deck]
               (midi/learn-and-watch-control
                 #(channel :pitch-shift deck (midi->pitch-shift %)))))
      (when cancel
        (cancel)
        (swap! cancel-watch-pitch-shift dissoc-in [deck])))))

(defsocket "/midi" [channel message & args]
  (apply (case message
           :watch-pitch-shift watch-pitch-shift)
    channel args))

;; ---------------------------------------------
;; traktor.midi
;; ---------------------------------------------

(def cancel-watch-master-tempo (atom nil))

(defn watch-master-tempo [channel active]
  (let [cancel @cancel-watch-master-tempo]
    (if active
      (when (nil? cancel)
        (reset! cancel-watch-master-tempo
                (traktor.midi/master-tempo-watch
                  #(channel :master-tempo (float %))
                  0.1)))
      (when cancel
        (cancel)
        (reset! cancel-watch-master-tempo nil)))))

(def cancel-watch-track-load (atom {}))

(defn watch-track-load [channel deck active]
  (let [cancel (get-in @cancel-watch-track-load [deck])]
    (if active
      (when (nil? cancel)
        (swap! cancel-watch-track-load assoc-in [deck]
                (traktor.midi/track-watch deck
                  #(channel :track-load deck %))))
      (when cancel
        (cancel)
        (swap! cancel-watch-track-load dissoc-in [deck])))))

(defsocket "/traktor" [channel message & args]
  (apply (case message
           :watch-master-tempo watch-master-tempo
           :watch-track-load watch-track-load)
    channel args))

;; ---------------------------------------------
;; traktor.collection
;; ---------------------------------------------

(defn- get-tag [file]
  (let [tag (.getTag (AudioFileIO/read (java.io.File. file)))]
    (into {} (remove (comp empty? val)
      (->> (. FieldKey values)
           (reduce (fn [fields id]
             (assoc fields (keyword (.toLowerCase (str/replace (.name id) "_" "-")))
                           (map #(.getContent %) (seq (.getFields tag id))))) {}))))))

(defremote find-track [filename]
  (first (traktor.collection/find-tracks {:filename filename})))

;; ---------------------------------------------
;; applescript
;; ---------------------------------------------

(defremote position-window []
  (applescript/position-window))

