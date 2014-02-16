(ns app.controller
  (:require [app.view :as view])
  (:use [app.key :only [parse-key encode-key shift-key key-offset compatible-keys]]
        [app.client :only [log socket fetch]]
        [jayq.core :only [$]])
  (:use-macros [app.client :only [defremote]]))

;; ---------------------------------------------
;; remotes
;; ---------------------------------------------

(defremote find-track [filename])
(defremote position-window [])

;; ---------------------------------------------
;; state
;; ---------------------------------------------

(def master-deck (atom :a))
(def master-tempo (atom 0))
(def master-tempo-watching (atom false))
(def playlist (atom {}))
(def loaded-tracks (atom {:a nil :b nil :c nil :d nil}))
(def track-load-watching (atom {:a false :b false :c false :d false}))
(def pitch-shifts (atom {:a 0 :b 0 :c 0 :d 0}))
(def pitch-shift-watching (atom {:a false :b false :c false :d false}))

;; ---------------------------------------------
;; helper functions
;; ---------------------------------------------

(defn normalize-key [track]
  (assoc track :key
    (when-let [key (:key track)]
      (encode-key (parse-key key)))))

(defn add-track-to-playlist! [track]
  (when track
    (let [track (normalize-key track)
          track-id (:file track)]
      (when (not-any? #{track-id} (keys @playlist))
        (swap! playlist assoc track-id track)
        track))))

(defn load-track! [deck track]
  (swap! loaded-tracks assoc deck (normalize-key track)))

(defn is-master? [deck] (= deck @master-deck))

(defn get-master-key []
  (when-let [current-track (@loaded-tracks @master-deck)]
    (when-let [current-track-key (:key current-track)]
      (shift-key (parse-key current-track-key) (@pitch-shifts @master-deck)))))

(defn get-compatible-keys [key]
  (let [master-key (get-master-key)]
    (if (and key master-key)
      (compatible-keys master-key (last key))
      '())))

(defn get-compatible-pitch-shifts [[key offset] pitch-shift]
  (if key
    (let [current-key (shift-key (parse-key key) pitch-shift)]
      (sort-by #(Math/abs (- % pitch-shift))
               (map #(+ pitch-shift (key-offset % current-key))
                    (get-compatible-keys current-key))))
    '()))

(defn get-deck-data [deck]
  (let [track (@loaded-tracks deck)
        tempo @master-tempo
        time-stretch (when (:tempo track) (/ tempo (:tempo track)))
        pitch-shift (@pitch-shifts deck)
        compatible-pitch-shifts (if (= deck @master-deck)
                                  '()
                                  (get-compatible-pitch-shifts (:key track) pitch-shift))
        key (when (:key track) (encode-key (shift-key (parse-key (:key track)) pitch-shift)))]
    {:track track
     :pitch-shift pitch-shift
     :key key
     :time-stretch time-stretch
     :tempo tempo
     :compatible-pitch-shifts compatible-pitch-shifts}))

;; ---------------------------------------------
;; sockets
;; ---------------------------------------------

(def traktor-socket (socket :traktor (fn [& msg]
  (case (first msg)
     :master-tempo
       (let [[value] (rest msg)]
         (when @master-tempo-watching
           (reset! master-tempo value)
           (view/set-master-tempo @master-tempo)
           (doseq [deck [:a :b :c :d]]
             (let [data (get-deck-data deck)]
               (view/set-time-stretch deck data)))))
     :track-load
       (let [[deck track] (rest msg)]
         (when (@track-load-watching deck)
           (load-track! deck track)
           (view/set-loaded-track deck (@loaded-tracks deck))
           (when (is-master? deck)
             (reset! master-deck (case deck :a :b :a))
             (view/set-master-deck @master-deck)
             (doseq [deck (remove #{deck} [:a :b :c :d])]
               (let [data (get-deck-data deck)]
                 (view/set-compatible-keys deck data))))
           (let [data (get-deck-data deck)]
             (view/set-time-stretch deck data)
             (view/set-pitch-shift deck data)
             (view/set-compatible-keys deck data))))))))

(def midi-socket (socket :midi (fn [& msg]
  (case (first msg)
    :pitch-shift
      (let [[deck value] (rest msg)]
        (swap! pitch-shifts assoc deck value)
        (swap! pitch-shift-watching assoc deck true)
        (view/set-pitch-shift-watching deck true)
        (let [data (get-deck-data deck)]
          (view/set-pitch-shift deck data))
        (when (is-master? deck)
          (doseq [deck (remove #{deck} [:a :b :c :d])]
            (let [data (get-deck-data deck)]
              (view/set-compatible-keys deck data)))))))))

;; ---------------------------------------------
;; gui listeners
;; ---------------------------------------------

(view/on-master-tempo-watch-toggle
  (fn []
    (swap! master-tempo-watching not)
    (view/set-master-tempo-watching @master-tempo-watching)
    (traktor-socket :watch-master-tempo @master-tempo-watching)))

(view/on-track-load-watch-toggle
  (fn [deck]
    (swap! track-load-watching update-in [deck] not)
    (view/set-track-load-watching deck (@track-load-watching deck))
    (traktor-socket :watch-track-load deck (@track-load-watching deck))))

(view/on-master-tempo-change
  (fn [value]
    (reset! master-tempo-watching false)
    (view/set-master-tempo-watching false)
    (traktor-socket :watch-master-tempo false)
    (swap! master-tempo #(max 0 (+ % value)))
    (view/set-master-tempo @master-tempo)
    (doseq [deck [:a :b :c :d]]
      (let [data (get-deck-data deck)]
        (view/set-time-stretch deck data)))))

(view/on-pitch-shift-change
  (fn [deck value]
    (swap! pitch-shifts update-in [deck] #(min 12 (max -12 (+ % value))))
    (let [data (get-deck-data deck)]
      (view/set-pitch-shift deck data))
    (when (is-master? deck)
      (doseq [deck (remove #{deck} [:a :b :c :d])]
        (let [data (get-deck-data deck)]
          (view/set-compatible-keys deck data))))))

(view/on-pitch-shift-watch-toggle
  (fn [deck]
    (swap! pitch-shift-watching update-in [deck] #(if % false :learning))
    (let [watching (@pitch-shift-watching deck)]
      (view/set-pitch-shift-watching deck watching)
      (midi-socket :watch-pitch-shift deck watching)
      (when watching
        (doseq [deck (remove #{deck} [:a :b :c :d])]
          (when (= :learning (@pitch-shift-watching deck))
            (swap! pitch-shift-watching assoc deck false)
            (view/set-pitch-shift-watching deck false)
            (midi-socket :watch-pitch-shift deck false)))))))

(view/on-master-deck-set
  (fn [deck]
    (reset! master-deck deck)
    (view/set-master-deck deck)
    (doseq [deck [:a :b :c :d]]
      (let [data (get-deck-data deck)]
        (view/set-compatible-keys deck data)))))

(view/on-track-load
  (fn [deck track-id]
    (when-let [track (@playlist track-id)]
      (swap! track-load-watching assoc deck false)
      (view/set-track-load-watching deck false)
      (traktor-socket :watch-track-load deck false)
      (load-track! deck track)
      (view/set-loaded-track deck (@loaded-tracks deck))
      (when (is-master? deck)
        (reset! master-deck (case deck :a :b :a))
        (view/set-master-deck @master-deck)
        (doseq [deck (remove #{deck} [:a :b :c :d])]
          (let [data (get-deck-data deck)]
            (view/set-compatible-keys deck data))))
      (let [data (get-deck-data deck)]
        (view/set-time-stretch deck data)
        (view/set-pitch-shift deck data)
        (view/set-compatible-keys deck data)))))

(view/on-file-drop
  (fn [files]
    (doseq [file files]
      ((find-track (.-name file))
        #(when-let [track %]
          (when-let [track (add-track-to-playlist! %)]
            (view/add-track-to-playlist track)))))))

;; ---------------------------------------------
;; keyboard listeners
;; ---------------------------------------------

(defn on-key-press
  ([action]
    (let [elem ($ (.-documentElement js/document))
          handler #(action (.-keyCode %))]
      (.bind elem "keydown" handler)
      #(.unbind elem "keydown" handler)))
  ([code action]
    (on-key-press #(when (= code %) (action)))))

(defn on-key-press-once
  ([action]
    (let [elem ($ (.-documentElement js/document))
          handler #(action (.-keyCode %))]
      (.one elem "keydown" handler)))
  ([code action]
    (on-key-press #(when (= code %) (action)))))

;; ---------------------------------------------
;; initialization
;; ---------------------------------------------

((position-window))

(view/set-master-deck @master-deck)
(view/set-master-tempo @master-tempo)
(view/set-master-tempo-watching false)

(doseq [deck [:a :b :c :d]]
  (view/set-track-load-watching deck (@track-load-watching deck))
  (let [data (get-deck-data deck)]
    (view/set-loaded-track deck (:track data))
    (view/set-time-stretch deck data)
    (view/set-pitch-shift deck data)
    (view/set-compatible-keys deck data)))
