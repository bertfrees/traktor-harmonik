(ns app.applescript)

(defn position-window []
  (let [script (str "set screen_dimensions to (do shell script \"\n"
                    "IFS=$'\\n'\n"
                    "screens=$(echo $(system_profiler SPDisplaysDataType) | sed 's/\\\\(Resolution\\\\):/\\\\\n"
                    "&/g' | grep 'Resolution:')\n"
                    "echo \\\"$screens\\\" | sed '/Main Display/!d' | awk '{print $2, $4}'\")\n"
                    "tell application \"Google Chrome\"\n"
                    "    set {main_screen_width, main_screen_height} to {word 1 of screen_dimensions, word 2 of screen_dimensions}\n"
                    "    set bounds of front window to {0, main_screen_height - 103, main_screen_width, main_screen_height + 31}\n"
                    "end tell\n")
        manager (javax.script.ScriptEngineManager.)
        engine (.getEngineByName manager "AppleScript")]
    (.eval engine script)))
