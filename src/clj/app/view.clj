(ns app.view
  (:use [app.server :only [defpage]]
        [hiccup [page :only [html5 include-css include-js]]]))

(defn javascript [script]
  [:script {:type "text/javascript"}
    (str "//<![CDATA[\n" script "\n//]]>")])

(defpage "/"
  (html5
    [:html
      [:head
        [:title "Traktor Harmonik"]
          (include-css "/css/jquery/jquery-ui.css")
          (include-css "/css/app/view.css")
          (include-js "/js/jquery/jquery.min.js")
          (include-js "/js/jquery/jquery-ui.min.js")
          (include-js "/js/jquery/jquery.tinyscrollbar.min.js")
          (include-js "/js/web_socket.js")
          (include-js "/js/goog/base.js")
          (include-js "/js/app.js")
          (include-js "/js/clojure/zip.js")
          (include-js "/js/apogee/xml.js")
          (include-js "/js/apogee/svg.js")]
      [:body
       [:div#content
         (javascript "goog.require('app.controller')")]]]))
