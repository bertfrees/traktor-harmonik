(ns app.key
  (:refer-clojure :exclude (key)))

(def PARSE-KEY {:C  [0  :major] :B# [0  :major] :c  [0  :minor] :b# [0  :minor] :Cm  [0  :minor] :B#m [0  :minor]
                :C# [1  :major] :Db [1  :major] :c# [1  :minor] :db [1  :minor] :C#m [1  :minor] :Dbm [1  :minor]
                :D  [2  :major]                 :d  [2  :minor]                 :Dm  [2  :minor]
                :Eb [3  :major] :D# [3  :major] :eb [3  :minor] :d# [3  :minor] :Ebm [3  :minor] :D#m [3  :minor]
                :E  [4  :major]                 :e  [4  :minor]                 :Em  [4  :minor]
                :F  [5  :major] :E# [5  :major] :f  [5  :minor] :e# [5  :minor] :Fm  [5  :minor] :E#m [5  :minor]
                :F# [6  :major] :Gb [6  :major] :f# [6  :minor] :gb [6  :minor] :F#m [6  :minor] :Gbm [6  :minor]
                :G  [7  :major]                 :g  [7  :minor]                 :Gm  [7  :minor]
                :Ab [8  :major] :G# [8  :major] :ab [8  :minor] :g# [8  :minor] :Abm [8  :minor] :G#m [8  :minor]
                :A  [9  :major]                 :a  [9  :minor]                 :Am  [9  :minor]
                :Bb [10 :major] :A# [10 :major] :bb [10 :minor] :a# [10 :minor] :Bbm [10 :minor] :A#m [10 :minor]
                :B  [11 :major] :Cb [11 :major] :b  [11 :minor] :cb [11 :minor] :Bm  [11 :minor] :Cbm [11 :minor]})

(def ENCODE-KEY {[0  :minor] :c  [0  :major] :C
                 [1  :minor] :c# [1  :major] :C#
                 [2  :minor] :d  [2  :major] :D
                 [3  :minor] :eb [3  :major] :Eb
                 [4  :minor] :e  [4  :major] :E
                 [5  :minor] :f  [5  :major] :F
                 [6  :minor] :f# [6  :major] :F# 
                 [7  :minor] :g  [7  :major] :G
                 [8  :minor] :ab [8  :major] :Ab
                 [9  :minor] :a  [9  :major] :A
                 [10 :minor] :bb [10 :major] :Bb
                 [11 :minor] :b  [11 :major] :B})

(def ENCODE-CAMELOT {[0  :minor] :5A  [0  :major] :8B
                     [1  :minor] :12A [1  :major] :3B
                     [2  :minor] :7A  [2  :major] :10B
                     [3  :minor] :2A  [3  :major] :5B
                     [4  :minor] :9A  [4  :major] :12B
                     [5  :minor] :4A  [5  :major] :7B
                     [6  :minor] :11A [6  :major] :2B 
                     [7  :minor] :6A  [7  :major] :9B
                     [8  :minor] :1A  [8  :major] :4B
                     [9  :minor] :8A  [9  :major] :11B
                     [10 :minor] :3A  [10 :major] :6B
                     [11 :minor] :10A [11 :major] :1B})

(def PARSE-CAMELOT {:1A  [8  :minor] :1B  [11 :major]
                    :2A  [3  :minor] :2B  [6  :major]
                    :3A  [10 :minor] :3B  [1  :major]
                    :4A  [5  :minor] :4B  [8  :major]
                    :5A  [0  :minor] :5B  [3  :major]
                    :6A  [7  :minor] :6B  [10 :major]
                    :7A  [2  :minor] :7B  [5  :major]
                    :8A  [9  :minor] :8B  [0  :major]
                    :9A  [4  :minor] :9B  [7  :major]
                    :10A [11 :minor] :10B [2  :major]
                    :11A [6  :minor] :11B [9  :major]
                    :12A [1  :minor] :12B [4  :major]})

;; helper functions
(defn- round [number] (.round js/Math number))
(defn- round-off-error [number] (- number (.round js/Math number)))
(defn- mod12 [number] (mod (+ 12 number) 12))
(defn- mod+-6 [number] (- (mod12 (+ number 6)) 6))

(defn- camelot [wheel hour] (keyword (str hour (name wheel))))

(defn parse-key [key]
  (let [[key offset] (if (vector? key) key [key 0])
        [tone mode] (PARSE-KEY key)]
    [(+ tone offset) mode]))
     
(defn encode-key [[tone mode]]
  (let [key (ENCODE-KEY [(mod12 (round tone)) mode])
        offset (round-off-error tone)]
    [key offset]))

(defn shift-key [[tone mode] shift]
  [(mod12 (+ shift tone)) mode])

(defn key-offset [& keys]
  (let [keys (take 2 keys)]
    (if (reduce = (map last keys))
      (mod+-6 (reduce - (map first keys))))))

;; express time stretch in terms of pitch shift
(defn time-stretch->pitch-shift [time-stretch]
  (* 12 (/ (.log js/Math time-stretch) (.log js/Math 2))))

;; express pitch shift in terms of time stretch
(defn pitch-shift->time-stretch [pitch-shift]
  (.pow js/Math 2 (/ pitch-shift 12)))

;; compatible keys
(defn compatible-keys [[tone mode] in-mode]
  (if (= mode in-mode)
    (for [move [0 7 -7]]
      [(mod12 (+ tone move)) mode])
    (list
      [(mod12 (+ tone (case in-mode :major 3 -3))) in-mode])))
