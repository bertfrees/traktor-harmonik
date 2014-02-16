goog.provide('apogee.util');
goog.require('cljs.core');
/**
* Brain dead implementation of clojure.core/range until it is supported in ClojureScript
*/
apogee.util.range = (function() {
var range = null;
var range__1 = (function (end){
return range.call(null,0,end,1);
});
var range__2 = (function (start,end){
return range.call(null,start,end,1);
});
var range__3 = (function (start,end,step){
var i__229238 = start;
var result__229239 = cljs.core.PersistentVector.fromArray([]);
while(true){
if((i__229238 < end))
{{
var G__229240 = (i__229238 + step);
var G__229241 = cljs.core.conj.call(null,result__229239,i__229238);
i__229238 = G__229240;
result__229239 = G__229241;
continue;
}
} else
{return result__229239;
}
break;
}
});
range = function(start,end,step){
switch(arguments.length){
case 1:
return range__1.call(this,start);
case 2:
return range__2.call(this,start,end);
case 3:
return range__3.call(this,start,end,step);
}
throw('Invalid arity: ' + arguments.length);
};
range.cljs$lang$arity$1 = range__1;
range.cljs$lang$arity$2 = range__2;
range.cljs$lang$arity$3 = range__3;
return range;
})()
;
goog.exportSymbol('apogee.util.range', apogee.util.range);
/**
* A Terrible replacement for clojure.core/format needed for trivial formatting requirement
*/
apogee.util.format = (function format(n,float_number){
return float_number.toFixed(n);
});
goog.exportSymbol('apogee.util.format', apogee.util.format);
