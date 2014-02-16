(ns app.midi
  (:require [overtone.midi]))

;; ignore midi signals coming from traktor
(defn- ignore-traktor [midi-sources]
  (filter #(not (= (:name %) "Traktor Virtual Output")) midi-sources))

(defn- find-midi-source [fltr]
  (->> (overtone.midi/midi-sources)
       (ignore-traktor)
       (filter #(= (select-keys % (keys fltr)) fltr))
       first))

(defn learn-control [callback]
  (let [transmitters (map overtone.midi/midi-in (ignore-traktor (overtone.midi/midi-sources)))
        cancel #(doseq [t transmitters] (.setReceiver (:transmitter t) nil))]
    (doseq [transmitter transmitters]
      (let [receiver (fn [msg]
                       (if (= (:command msg) :control-change)
                         (let [controller (select-keys transmitter [:name :vendor])
                               control (select-keys msg [:channel :data1])
                               init-value (:data2 msg)]
                           (callback controller control init-value)
                           (cancel))))]
        (overtone.midi/midi-handle-events transmitter receiver)))
    cancel))

(defn watch-control [controller control callback]
  (let [transmitter (overtone.midi/midi-in (find-midi-source controller))
        prev-value (atom nil)]
    (overtone.midi/midi-handle-events transmitter
      (fn [msg]
        (when (and (= (:command msg) :control-change)
                 (= (select-keys msg [:channel :data1]) control))
          (let [value (:data2 msg)]
          (when (not (= value @prev-value))
            (callback value)
            (reset! prev-value value))))))
    #(.setReceiver (:transmitter transmitter) nil)))

(defn learn-and-watch-control [callback]
  (let [cancel (atom nil)]
    (reset! cancel
      (learn-control
        (fn [controller control init-value]
          (callback init-value)
          (reset! cancel (watch-control controller control callback)))))
    #(@cancel)))
