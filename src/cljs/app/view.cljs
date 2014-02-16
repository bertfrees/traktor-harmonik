(ns app.view
  (:require [app.kbd :as kbd]
            [apogee.xml :as xml]
            [apogee.svg :as svg]
            [clojure.string :as str]
            [goog.string.format :as gformat]
            [goog.events.KeyCodes :as keycodes])
  (:use [app.key :only [time-stretch->pitch-shift]]
        [app.client :only [log]]
        [jayq.core :only [$]]
        [jayq.util :only [clj->js]]
        [crate.core :only [html]]
        [goog.string :only [format]]))

;; ---------------------------------------------
;; general
;; ---------------------------------------------

(def window ($ js/window))

(.disableSelection ($ "body"))

(.on ($ "body") "drop"
  (fn [e] (.preventDefault e)))

(.mouseup window
  #(.unbind window "mousemove"))

(.push (.-props (.-event js/jQuery)) "dataTransfer")

(set! (.-blink (.-fn js/jQuery))
  (fn [class period] (this-as this
    (.each this
      (fn [] (this-as this
        (let [obj ($ this)
              timerid (.attr obj "timerid")]
          (when (not (> timerid 0))
            (.attr obj "timerid"
              (js/setInterval #(.toggleClass obj class) period))))))))))

(set! (.-unblink (.-fn js/jQuery))
  (fn [] (this-as this
    (.each this
      (fn [] (this-as this
        (let [obj ($ this)
              timerid (.attr obj "timerid")]
          (when (> timerid 0)
            (js/clearInterval timerid)
            (.attr obj "timerid" 0)))))))))

;; ---------------------------------------------
;; print utilities
;; ---------------------------------------------

(defn- print-tempo [tempo]
  (if tempo
    (.toFixed tempo 2)
    "---"))

(defn- print-key [[key offset]]
  (if key
    (str (str/replace (str/replace (name key) #"(.)[Bb]" "$1<sub>♭</sub>") "#" "<sub>♯</sub>")
         (if (< (Math/abs offset) 0.05)
           ""
           (str " <sub>" (if (> offset 0) "+" "-") "." (.toFixed (Math/abs (* 10 offset) 0)) "♯</sub>")))
    "---"))

(defn- print-time-stretch [time-stretch]
  (if time-stretch
    (format "%+.1f%%" (* 100 (- time-stretch 1)))
    "---"))

(defn- print-pitch-shift [pitch-shift]
  (if pitch-shift
    (.toFixed pitch-shift 2)
    "---"))

;; ---------------------------------------------
;; clock
;; ---------------------------------------------

(.append ($ "#content")
  ($ (html
      [:div.top
       [:div.left [:div]]
       [:div.clock
        [:div
         [:div.label "clock"]
         [:div.controls
          [:div.input]
          [:div.auto.button "auto"]]]]
       [:div.right [:div]]])))

(def clock ($ ".clock .input"))
(def clock-button ($ ".clock .auto.button"))

(defn set-master-tempo [value]
  (.text clock (.toFixed value 2)))

(defn set-master-tempo-watching [active]
  (if active
    (.addClass clock-button "active")
    (.removeClass clock-button "active")))

(defn on-master-tempo-change [callback]
  (.mousedown clock
    (fn [e]
      (let [y (atom (.-pageY e))]
        (.mousemove window
          (fn [e]
            (callback (* 0.1 (- @y (.-pageY e))))
            (reset! y (.-pageY e))))))))

(defn on-master-tempo-watch-toggle [callback]
  (.mousedown clock-button
    (fn [e]
      (callback)
      (.preventDefault e))))

(let [adjust-view
        #(let [window-height (.height ($ window))
               gutter 3
               top-row-height (+ 21 4 20 4 4)
               mini-top-row-height (+ 5 4 20 4 4)
               deck-height (+ 10 68 2 4 20 4 10)
               mini-deck-height (+ 10 57 10)]
           (if (< window-height (+ gutter top-row-height gutter deck-height gutter deck-height gutter))
             (.addClass ($ ".top") "mini")
             (.removeClass ($ ".top") "mini"))
           (if (< window-height (+ gutter mini-top-row-height gutter deck-height gutter deck-height gutter))
             (.addClass ($ ".deck#c, .deck#d") "mini")
             (.removeClass ($ ".deck#c, .deck#d") "mini"))
           (if (< window-height (+ gutter mini-top-row-height gutter deck-height gutter mini-deck-height gutter))
             (.css ($ ".deck#c, .deck#d") "visibility" "hidden")
             (.css ($ ".deck#c, .deck#d") "visibility" "visible"))
           (if (< window-height (+ gutter mini-top-row-height gutter deck-height gutter))
             (.hide ($ ".top"))
             (.show ($ ".top")))
           (if (< window-height (+ gutter deck-height gutter))
             (.addClass ($ ".deck#a, .deck#b") "mini")
             (.removeClass ($ ".deck#a, .deck#b") "mini")))]
  (adjust-view)
  (.resize window adjust-view))

;; ---------------------------------------------
;; decks
;; ---------------------------------------------

(.append ($ "#content")
  ($ (html
      [:div.decks
       (for [deck [:a :b :c :d]]
        [:div.deck {:id (name deck)}
         [:div.outer
          [:div.letter (name deck)]
          [:div.track-info
           [:div.title]
           [:div.artist]
           [:div.key]
           [:div.tempo]
           [:div.time-stretch]
           [:div.pitch-shift]
           [:div.current-key]
           [:div.current-tempo]]
          [:div.phase-meter
           [:div]]]
         [:div.inner
          [:div.key-knob
           [:div.label "key"]
           [:div.value "0.00"]
           [:div.learn.button]
           [:div.inc "+"]
           [:div.dec "–"]]]])])))

(.append ($ ".deck#a .outer, .deck#b .outer")
  ($ (html [:div.auto.button "auto"])))

(.append ($ ".phase-meter > div")
  ($ (xml/emit
    (svg/svg {:viewBox "-30 0 60 11" :preserveAspectRatio "none"}
      [:g
       [:g {:id "key-offset"}
        [:rect { :x 0 :y 3 :height 5 :width 0}]
        [:line {:x1   0 :y1 3   :x2   0 :y2 8   :stroke-width 1 :vector-effect "non-scaling-stroke"}]]
       [:g {:id "compatible-keys"}
        [:line {:x1   0 :y1 3   :x2   0 :y2 8   :stroke-width 1 :vector-effect "non-scaling-stroke"}]
        [:line {:x1   0 :y1 3   :x2   0 :y2 8   :stroke-width 1 :vector-effect "non-scaling-stroke"}]]
       [:line { :x1 -20 :y1 3   :x2 -20 :y2 8   :stroke "white"   :stroke-width 1 :vector-effect "non-scaling-stroke"}]
       [:line { :x1 -10 :y1 3   :x2 -10 :y2 8   :stroke "white"   :stroke-width 1 :vector-effect "non-scaling-stroke"}]
       [:line { :x1   0 :y1 2.5 :x2   0 :y2 8.5 :stroke "#d2d2d2" :stroke-width 1 :vector-effect "non-scaling-stroke"}]
       [:line { :x1  10 :y1 3   :x2  10 :y2 8   :stroke "white"   :stroke-width 1 :vector-effect "non-scaling-stroke"}]
       [:line { :x1  20 :y1 3   :x2  20 :y2 8   :stroke "white"   :stroke-width 1 :vector-effect "non-scaling-stroke"}]]))))

(.prepend ($ ".key-knob")
  ($ (xml/emit
    (svg/svg {:width 60 :height 60 :viewBox "-30 -30 60 60"}
      [:g
       [:defs
        [:filter {:id "filter"}
         [:feGaussianBlur {:in "SourceAlpha" :stdDeviation 1 :result "blur"}]
         [:feOffset {:in "blur" :dx 0 :dy 1 :result "offsetBlur"}]
         [:feSpecularLighting {:in "blur" :surfaceScale 1 :specularConstant 1 :specularExponent 10 :lighting-color "#555555" :result "specOut"}
          [:fePointLight {:x 0 :y -400 :z 10}]]
         [:feComposite {:in "specOut" :in2 "SourceAlpha" :operator "in" :result "specOut"}]
         [:feComposite {:in "SourceGraphic" :in2 "specOut" :operator "arithmetic" :k1 0 :k2 1 :k3 1 :k4 0 :result "litPaint"}]
         [:feMerge
          [:feMergeNode {:in "offsetBlur"}]
          [:feMergeNode {:in "litPaint"}]]]]
        [:g
          [:g {:filter "url(#filter)"}
           [:circle {:id "knob" :cx 0 :cy 0 :r 15 :stroke "black" :stroke-width 1 :fill "#212323"}]]
          [:rect {:x -2 :y -16 :height 12 :width 4 :id "pointer" :stroke "black" :stroke-width 1 :fill "white"}]
          [:path {:d "M0,0 m-8.816,12.135 a15,15 0 1,1 17.634,0 l7.053,9.708 a27,27 0 1,0 -31.740,0 z" :fill "#565858"}]
          [:path {:id "time-stretch"}]
          [:path {:id "pitch-shift"}]
          [:path {:id "key-offset"}]
          [:g {:id "compatible-keys"}
           [:path]
           [:path]]
          [:path {:d "M0,0 m-8.816,12.135 a15,15 0 1,1 17.634,0 l7.053,9.708 a27,27 0 1,0 -31.740,0 z" :fill "none" :stroke "black" :stroke-width 1}]
          [:path {:d "M0,0 m-11.168,15.371 a19,19 0 1,1 22.336,0" :fill "none" :stroke "black" :stroke-width 1}]
          [:path {:d "M0,0 m-13.519,18.607 a23,23 0 1,1 27.038,0" :fill "none" :stroke "black" :stroke-width 1}]]]))))

(let [knobs ($ ".key-knob")]
  (.hover knobs
    #(this-as this
      (.addClass ($ this) "hover"))
    #(this-as this
      (.removeClass ($ this) "hover")))
  (.mousedown knobs
    #(this-as this
      (.addClass ($ this) "dragging")))
  (.mouseup window
    #(.removeClass ($ ".key-knob") "dragging")))

(defn arc [a1 a2 r1 r2]
  (let [r-min (min r1 r2)
        r-max (max r1 r2)
        resolution 8
        a-min (* (/ Math/PI 180) (- (min a1  a2) (/ resolution 2)))
        a-max (* (/ Math/PI 180) (+ (max a1  a2) (/ resolution 2)))]
    (str "M"                           (* r-min (Math/sin a-min)) "," (- (* r-min (Math/cos a-min)))
        " A" r-min "," r-min " 0 0,1 " (* r-min (Math/sin a-max)) "," (- (* r-min (Math/cos a-max)))
        " L"                           (* r-max (Math/sin a-max)) "," (- (* r-max (Math/cos a-max)))
        " A" r-max "," r-max " 0 0,0 " (* r-max (Math/sin a-min)) "," (- (* r-max (Math/cos a-min)))
        " Z")))

(defn- pitch-shift->degrees [pitch-shift]
  (* (/ 35 3) pitch-shift))

(defn- pitch-offset->x [pitch-offset]
  (* 10 pitch-offset))

(defn- time-stretch->degrees [time-stretch]
  (pitch-shift->degrees (time-stretch->pitch-shift time-stretch)))

(defn set-time-stretch [deck {time-stretch :time-stretch
                              pitch-shift :pitch-shift
                              tempo :tempo}]
  (.text ($ (str ".deck#" (name deck) " .track-info .time-stretch"))
         (print-time-stretch time-stretch))
  (.text ($ (str ".deck#" (name deck) " .track-info .current-tempo"))
         (print-tempo tempo))
  (let [time-stretch-arc ($ (str ".deck#" (name deck) " .key-knob svg #time-stretch"))
        pitch-shift-arc ($ (str ".deck#" (name deck) " .key-knob svg #pitch-shift"))
        pitch-shift-in-degrees (pitch-shift->degrees pitch-shift)]
    (if time-stretch
      (let [time-stretch-in-degrees (max -140 (min 140 (time-stretch->degrees time-stretch)))]
        (.attr (.show time-stretch-arc) "d" (arc 0 time-stretch-in-degrees 15 19))
        (.attr (.show pitch-shift-arc) "d" (arc time-stretch-in-degrees pitch-shift-in-degrees 19 23)))
      (do (.hide time-stretch-arc)
          (.hide pitch-shift-arc)))))

(defn set-compatible-keys [deck {compatible-pitch-shifts :compatible-pitch-shifts
                                 current-pitch-shift :pitch-shift}]
  (let [compatible-pitch-shifts (filter #(<= -12 % 12) compatible-pitch-shifts)
        key-knob-closest-arc ($ (str ".deck#" (name deck) " .key-knob svg #key-offset"))
        key-knob-other-points ($ (str ".deck#" (name deck) " .key-knob svg #compatible-keys path"))
        phase-meter-closest-line ($ (str ".deck#" (name deck) " .phase-meter svg #key-offset line"))
        phase-meter-closest-rect ($ (str ".deck#" (name deck) " .phase-meter svg #key-offset rect"))
        phase-meter-other-lines ($ (str ".deck#" (name deck) " .phase-meter svg #compatible-keys line"))]
    (.hide key-knob-other-points)
    (.hide phase-meter-other-lines)
    (if-let [closest-pitch-shift (first compatible-pitch-shifts)]
      (do (let [pitch-offset (- closest-pitch-shift current-pitch-shift)
                x (pitch-offset->x pitch-offset)]
            (.attr (.attr (.show phase-meter-closest-line) "x1" x) "x2" x)
            (.attr (.attr (.show phase-meter-closest-rect) "x" (min x 0)) "width" (Math/abs x))
            (.attr (.show key-knob-closest-arc) "d" (arc (pitch-shift->degrees current-pitch-shift)
                                                         (pitch-shift->degrees closest-pitch-shift) 23 27)))
          (doall (map (fn [pitch-shift path line]
                        (let [pitch-shift-in-degrees (pitch-shift->degrees pitch-shift)
                              pitch-offset (- pitch-shift current-pitch-shift)
                              x (pitch-offset->x pitch-offset)]
                          (.attr (.show ($ path)) "d" (arc pitch-shift-in-degrees pitch-shift-in-degrees 23 27))
                          (.attr (.attr (.show ($ line)) "x1" x) "x2" x)))
                      (rest compatible-pitch-shifts)
                      key-knob-other-points
                      phase-meter-other-lines)))
      (do (.hide phase-meter-closest-line)
          (.hide phase-meter-closest-rect)
          (.hide key-knob-closest-arc)))))

(defn set-pitch-shift [deck {pitch-shift :pitch-shift
                             time-stretch :time-stretch
                             compatible-pitch-shifts :compatible-pitch-shifts
                             key :key}]
  (.text ($ (str ".deck#" (name deck) " .key-knob .value"))
         (print-pitch-shift pitch-shift))
  (.text ($ (str ".deck#" (name deck) " .track-info .pitch-shift"))
         (print-pitch-shift pitch-shift))
  (.html ($ (str ".deck#" (name deck) " .track-info .current-key"))
         (print-key key))
  (let [pitch-shift-arc ($ (str ".deck#" (name deck) " .key-knob svg #pitch-shift"))
        pointer ($ (str ".deck#" (name deck) " .key-knob svg #pointer"))
        pitch-shift-in-degrees (pitch-shift->degrees pitch-shift)]
    (.attr pointer "transform" (str "rotate(" pitch-shift-in-degrees ", 0, 0)"))
    (if time-stretch
      (let [time-stretch-in-degrees (max -140 (min 140 (time-stretch->degrees time-stretch)))]
        (.attr (.show pitch-shift-arc) "d" (arc time-stretch-in-degrees pitch-shift-in-degrees 19 23)))
      (.hide pitch-shift-arc)))
  (set-compatible-keys deck {:compatible-pitch-shifts compatible-pitch-shifts
                             :pitch-shift pitch-shift}))

(defn set-master-deck [deck]
  (.removeClass ($ ".deck") "master")
  (.addClass ($ (str ".deck#" (name deck))) "master"))

(defn set-track-load-watching [deck active]
  (if active
    (.addClass ($ (str ".deck#" (name deck) " .auto.button")) "active")
    (.removeClass ($ (str ".deck#" (name deck) " .auto.button")) "active")))

(defn on-track-load-watch-toggle [callback]
  (.mousedown ($ ".deck .auto.button")
    (fn [e] (this-as this
      (let [deck (keyword (.attr (.closest ($ this) ".deck") "id"))]
        (callback deck)
        (.stopPropagation e)
        (.preventDefault e))))))

(defn on-master-deck-set [callback]
  (.mousedown ($ ".deck .outer")
    #(this-as this
      (let [deck (keyword (.attr (.closest ($ this) ".deck") "id"))]
        (callback deck)))))

(defn on-pitch-shift-change [callback]
  (.mousedown ($ ".key-knob svg #knob , .deck .key-knob svg #pointer")
    (fn [e] (this-as this
      (let [deck (keyword (.attr (.closest ($ this) ".deck") "id"))
            y (atom (.-pageY e))]
        (.mousemove window
          (fn [e]
            (callback deck (* 0.1 (- @y (.-pageY e))))
            (reset! y (.-pageY e))))))))
  (.mousedown ($ ".key-knob .dec")
     (fn [e] (this-as this
       (let [deck (keyword (.attr (.closest ($ this) ".deck") "id"))]
         (callback deck -1)))))
  (.mousedown ($ ".key-knob .inc")
     (fn [e] (this-as this
       (let [deck (keyword (.attr (.closest ($ this) ".deck") "id"))]
         (callback deck 1))))))

(defn set-pitch-shift-watching [deck active]
  (let [button ($ (str ".deck#" (name deck) " .learn.button"))]
    (case active
      true (do (.unblink button)
               (.addClass button "active"))
      false (do (.unblink button)
                (.removeClass button "active"))
      :learning (do (.addClass button "active")
                    (.blink button "active" 500)))))

(defn on-pitch-shift-watch-toggle [callback]
  (.mousedown ($ ".deck .learn.button")
    (fn [e] (this-as this
      (let [deck (keyword (.attr (.closest ($ this) ".deck") "id"))]
        (callback deck)
        (.preventDefault e))))))

(defn- find-track-in-playlist [file]
  (map $ (filter #(= (.attr ($ %) "file") file) ($ "#tracks .track"))))

(defn- list-in-which-decks-loaded [file]
  (map #(keyword (.attr ($ %) "id"))
       (filter #(when-let [loaded (.attr ($ %) "loaded")] (= loaded file))
               ($ ".deck"))))

(defn set-loaded-track [deck track]
  (let [{title :title artist :artist tempo :tempo key :key file :file} track
        deck ($ (str ".deck#" (name deck)))
        prev-loaded (.attr deck "loaded")]
    (if file
      (do (.attr deck "loaded" file)
          (.addClass deck "loaded")
          (.blink deck "loaded" 150)
          (js/setTimeout #(do (.unblink deck)
                              (.addClass deck "loaded"))
                         2700))
      (do (.unblink deck)
          (.removeAttr deck "loaded")
          (.removeClass deck "loaded")))
    (when prev-loaded
      (doseq [track (find-track-in-playlist prev-loaded)]
        (.text (.find track "td:nth-child(1) div")
               (str/join "  " (map name (list-in-which-decks-loaded (.attr track "file")))))))
    (when file
      (doseq [track (find-track-in-playlist file)]
        (.text (.find track "td:nth-child(1) div")
               (str/join "  " (map name (list-in-which-decks-loaded file))))))
    (.draggable (.find deck ".outer") "option" "disabled" (nil? track))
    (.text (.find deck ".track-info .title")  (if title title ""))
    (.text (.find deck ".track-info .artist") (if artist artist ""))
    (.text (.find deck ".track-info .tempo")  (print-tempo tempo))
    (.html (.find deck ".track-info .key")    (print-key key))))

;; ---------------------------------------------
;; tracks
;; ---------------------------------------------

(.append ($ "#content")
  ($ (html
      [:div#tracks
       [:div
        [:div
         [:div
          [:table#header
           [:thead
            [:tr
             [:th [:div]
                  [:div.columnHandle]]
             [:th [:div "Title"]
                  [:div.columnHandle]]
             [:th [:div "Artist"]
                  [:div.columnHandle]]
             [:th [:div "BPM"]
                  [:div.columnHandle]]
             [:th [:div "Key"]
                  [:div.columnHandle]]]]]]
         [:div
          [:div.viewport
           [:div.overview
            [:table#body
             [:tbody]]]]
          [:div.scrollbar
           [:div.track [:div.thumb [:div.end]]]
           [:div.scrollup]
           [:div.scrolldown]]]]]])))

(.tinyscrollbar ($ "#tracks > div > div > div:nth-child(2)") (clj->js {:axis "y"}))

(def column-widths (atom [0 0 0 0 0]))

(defn- set-column-width! [column width]
  (swap! column-widths assoc column width)
  (.css (.css ($ (str "#tracks th:nth-of-type(" (+ 1 column) "),"
                      "#tracks td:nth-of-type(" (+ 1 column) ")"))
    "min-width" width)
    "max-width" width))

(set-column-width! 0 50)
(set-column-width! 1 400)
(set-column-width! 2 250)
(set-column-width! 3 100)
(set-column-width! 4 100)

(defn add-track-to-playlist [{title :title artist :artist tempo :tempo key :key file :file }]
  (let [track ($ (html
                  [:tr.track {:file file}
                   [:td {:style (str "max-width: " (@column-widths 0) "px; min-width: " (@column-widths 0) "px;")}
                    [:div (str/join "  " (map name (list-in-which-decks-loaded file)))]]
                   [:td {:style (str "max-width: " (@column-widths 1) "px; min-width: " (@column-widths 1) "px;")}
                    [:div title]]
                   [:td {:style (str "max-width: " (@column-widths 2) "px; min-width: " (@column-widths 2) "px;")}
                    [:div artist]]
                   [:td {:style (str "max-width: " (@column-widths 3) "px; min-width: " (@column-widths 3) "px;")}
                    [:div (print-tempo tempo)]]
                   [:td {:style (str "max-width: " (@column-widths 4) "px; min-width: " (@column-widths 4) "px;")}
                    [:div (into [:span] (.parseHTML js/jQuery (print-key key)))]]]))]
    (.append ($ "#tracks tbody") track)
    (.mousedown track
      #(this-as this
        (.removeClass ($ ".track") "selected")
        (.addClass ($ this) "selected")))
    (.tinyscrollbar_update ($ "#tracks > div > div > div:nth-child(2)"))))

(.resize window #(.tinyscrollbar_update ($ "#tracks > div > div > div:nth-child(2)")))

(let [drop-zone ($ "#tracks .viewport")]
  (.on drop-zone "dragover"
    (fn [e]
      (.preventDefault e)))
      (this-as this
        (.addClass ($ this) "hover"))
  (.on drop-zone "dragleave"
    (fn [e]
      (.preventDefault e)
      (this-as this
        (.removeClass ($ this) "hover"))))
  (.on drop-zone "drop"
    (fn [e]
      (.preventDefault e)
      (this-as this
        (.removeClass ($ this) "hover"))))
  (defn on-file-drop [callback]
    (.on drop-zone "drop"
      (fn [e]
        (when-let [transfer (.-dataTransfer e)]
          (let [files (.-files transfer)]
            (callback (map #(.item files %) (range (.-length files))))))))))

(.mousedown ($ ".columnHandle")
  (fn [e] (this-as this
    (let [cell (.closest ($ this) "th,td")
          initial-x (.-pageX e)
          initial-width (.width cell)
          column (.size (.prevAll cell))]
      (.mousemove window
        (fn [e]
          (let [width (max 50 (+ initial-width (- (.-pageX e) initial-x)))]
            (set-column-width! column width))))))))

(.keyup ($ (.-documentElement js/document))
  (fn [e]
    (case (.-keyCode e)
      keycodes/UP
        (let [selected ($ "#tracks .track.selected")
              prev (.prev selected ".track")]
          (when (> (.-length prev) 0)
            (.removeClass selected "selected")
            (.addClass prev "selected")))
      keycodes/DOWN
        (let [selected ($ "#tracks .track.selected")
              next (.next selected ".track")]
          (when (> (.-length next) 0)
            (.removeClass selected "selected")
            (.addClass next "selected")))
      nil)))

(let [over-table (atom true)]
  (.sortable ($ "#tracks tbody")
    (clj->js
      {:placeholder "ui-sortable-placeholder"
       :helper
         (fn [_ elem]
           (.text ($ "<span>") (str/replace (.attr elem "file") #"^.+/([^/]+)$" "\"$1\" from Browser")))
       :opacity 0.5
       :tolerance "pointer"
       :cursorAt {:left 200 :top 10}
       :appendTo "body"
       :change
         (fn [_ ui]
           (.html (.-placeholder ui) "<td colspan='100%'></td>"))	
       :stop
         (fn [] (this-as this
           (.removeClass ($ ".tablesorter-headerAsc") "tablesorter-headerAsc")
           (.removeClass ($ ".tablesorter-headerDesc") "tablesorter-headerDesc")
           (when (not @over-table)
             (.sortable ($ this) "cancel"))))
       :out
         (fn [_ ui]
           (try
             (.removeClass (.-helper ui) "overTable")
             (reset! over-table false)
             (.hide (.-placeholder ui))
             (catch js/Object e)))
       :over
         (fn [_ ui]
           (reset! over-table true)
           (.show (.-placeholder ui))
           (.addClass (.-helper ui) "overTable"))})))

(.draggable ($ ".deck .outer")
  (clj->js
    {:disabled true
     :helper
      (fn [] (this-as this
        (let [deck (.closest ($ this) ".deck")]
          (.text ($ "<span>") (str "\"" (.text (.find deck ".track-info .title")) "\" from Track Deck")))))
     :opacity 0.5
     :tolerance "pointer"
     :cursorAt {:left 200 :top 10}
     :appendTo "body"}))

(.droppable ($ ".deck .outer")
  (clj->js
    {:tolerance "pointer"
     :over
       (fn [_ ui]
         (.addClass (.-helper ui) "overDeck"))
     :out
       (fn [_ ui]
         (.removeClass (.-helper ui) "overDeck"))}))

(defn on-track-load [callback]
  (.on ($ ".deck .outer") "drop"
    (fn [_ ui] (this-as this
      (let [deck (keyword (.attr (.closest ($ this) ".deck") "id"))
            draggable (.-draggable ui)]
        (when-let [file (cond (.hasClass draggable "track")
                                (.attr draggable "file")
                              (.hasClass draggable "outer")
                                (.attr (.closest draggable ".deck") "loaded"))]
          (callback deck file)))))))
