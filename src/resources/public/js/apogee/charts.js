goog.provide('apogee.charts');
goog.require('cljs.core');
goog.require('apogee.svg');
goog.require('apogee.xml');
goog.require('apogee.util');
apogee.charts.default_chart_props = cljs.core.ObjMap.fromObject(["\uFDD0'minor-grid-width","\uFDD0'width","\uFDD0'y","\uFDD0'axis-font-size","\uFDD0'major-grid-width","\uFDD0'x","\uFDD0'label-points?","\uFDD0'minor-grid-color","\uFDD0'points","\uFDD0'label-number-format","\uFDD0'major-grid-color","\uFDD0'xmin","\uFDD0'xmax","\uFDD0'ymin","\uFDD0'background-color","\uFDD0'grid-lines","\uFDD0'ymax","\uFDD0'axis-font-family","\uFDD0'label-font-family","\uFDD0'axis-number-format","\uFDD0'label-font-size","\uFDD0'height"],{"\uFDD0'minor-grid-width":1,"\uFDD0'width":750,"\uFDD0'y":50,"\uFDD0'axis-font-size":"12px","\uFDD0'major-grid-width":2,"\uFDD0'x":50,"\uFDD0'label-points?":false,"\uFDD0'minor-grid-color":apogee.svg.rgb.call(null,245,245,245),"\uFDD0'points":cljs.core.PersistentVector.fromArray([]),"\uFDD0'label-number-format":1,"\uFDD0'major-grid-color":apogee.svg.rgb.call(null,255,255,255),"\uFDD0'xmin":0,"\uFDD0'xmax":100,"\uFDD0'ymin":0,"\uFDD0'background-color":apogee.svg.rgb.call(null,225,225,225),"\uFDD0'grid-lines":10,"\uFDD0'ymax":100,"\uFDD0'axis-font-family":"Verdana","\uFDD0'label-font-family":"Verdana","\uFDD0'axis-number-format":1,"\uFDD0'label-font-size":"10px","\uFDD0'height":500});
goog.exportSymbol('apogee.charts.default_chart_props', apogee.charts.default_chart_props);
apogee.charts.chart_background = (function chart_background(p__229010){
var map__229011__229012 = p__229010;
var map__229011__229013 = ((cljs.core.seq_QMARK_.call(null,map__229011__229012))?cljs.core.apply.call(null,cljs.core.hash_map,map__229011__229012):map__229011__229012);
var major_grid_width__229014 = cljs.core.get.call(null,map__229011__229013,"\uFDD0'major-grid-width");
var major_grid_color__229015 = cljs.core.get.call(null,map__229011__229013,"\uFDD0'major-grid-color");
var background_color__229016 = cljs.core.get.call(null,map__229011__229013,"\uFDD0'background-color");
var width__229017 = cljs.core.get.call(null,map__229011__229013,"\uFDD0'width");
var height__229018 = cljs.core.get.call(null,map__229011__229013,"\uFDD0'height");
return apogee.svg.style.call(null,apogee.svg.rect.call(null,0,0,height__229018,width__229017),"\uFDD0'fill",background_color__229016,"\uFDD0'stroke",major_grid_color__229015,"\uFDD0'stroke-width",major_grid_width__229014);
});
goog.exportSymbol('apogee.charts.chart_background', apogee.charts.chart_background);
apogee.charts.x_grid = (function x_grid(p__229019){
var map__229020__229021 = p__229019;
var map__229020__229022 = ((cljs.core.seq_QMARK_.call(null,map__229020__229021))?cljs.core.apply.call(null,cljs.core.hash_map,map__229020__229021):map__229020__229021);
var minor_grid_width__229023 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'minor-grid-width");
var major_grid_width__229024 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'major-grid-width");
var minor_grid_color__229025 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'minor-grid-color");
var major_grid_color__229026 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'major-grid-color");
var grid_lines__229027 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'grid-lines");
var xmax__229028 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'xmax");
var xmin__229029 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'xmin");
var width__229030 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'width");
var height__229031 = cljs.core.get.call(null,map__229020__229022,"\uFDD0'height");
var grid_x_space__229032 = (width__229030 / grid_lines__229027);
var iter__625__auto____229037 = (function iter__229033(s__229034){
return (new cljs.core.LazySeq(null,false,(function (){
var s__229034__229035 = s__229034;
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__229034__229035)))
{var i__229036 = cljs.core.first.call(null,s__229034__229035);
return cljs.core.cons.call(null,apogee.svg.style.call(null,apogee.svg.line.call(null,(i__229036 * grid_x_space__229032),0,(i__229036 * grid_x_space__229032),height__229031),"\uFDD0'stroke",((cljs.core.even_QMARK_.call(null,i__229036))?major_grid_color__229026:minor_grid_color__229025),"\uFDD0'stroke-width",((cljs.core.even_QMARK_.call(null,i__229036))?major_grid_width__229024:minor_grid_width__229023)),iter__229033.call(null,cljs.core.rest.call(null,s__229034__229035)));
} else
{return null;
}
break;
}
})));
});
return iter__625__auto____229037.call(null,apogee.util.range.call(null,1,grid_lines__229027));
});
goog.exportSymbol('apogee.charts.x_grid', apogee.charts.x_grid);
apogee.charts.y_grid = (function y_grid(p__229038){
var map__229039__229040 = p__229038;
var map__229039__229041 = ((cljs.core.seq_QMARK_.call(null,map__229039__229040))?cljs.core.apply.call(null,cljs.core.hash_map,map__229039__229040):map__229039__229040);
var minor_grid_width__229042 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'minor-grid-width");
var major_grid_width__229043 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'major-grid-width");
var minor_grid_color__229044 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'minor-grid-color");
var major_grid_color__229045 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'major-grid-color");
var grid_lines__229046 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'grid-lines");
var ymax__229047 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'ymax");
var ymin__229048 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'ymin");
var width__229049 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'width");
var height__229050 = cljs.core.get.call(null,map__229039__229041,"\uFDD0'height");
var grid_y_space__229051 = (height__229050 / grid_lines__229046);
var iter__625__auto____229056 = (function iter__229052(s__229053){
return (new cljs.core.LazySeq(null,false,(function (){
var s__229053__229054 = s__229053;
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__229053__229054)))
{var i__229055 = cljs.core.first.call(null,s__229053__229054);
return cljs.core.cons.call(null,apogee.svg.style.call(null,apogee.svg.line.call(null,0,(i__229055 * grid_y_space__229051),width__229049,(i__229055 * grid_y_space__229051)),"\uFDD0'stroke",((cljs.core.even_QMARK_.call(null,i__229055))?major_grid_color__229045:minor_grid_color__229044),"\uFDD0'stroke-width",((cljs.core.even_QMARK_.call(null,i__229055))?major_grid_width__229043:minor_grid_width__229042)),iter__229052.call(null,cljs.core.rest.call(null,s__229053__229054)));
} else
{return null;
}
break;
}
})));
});
return iter__625__auto____229056.call(null,apogee.util.range.call(null,1,grid_lines__229046));
});
goog.exportSymbol('apogee.charts.y_grid', apogee.charts.y_grid);
apogee.charts.x_axis = (function x_axis(p__229057){
var map__229058__229059 = p__229057;
var map__229058__229060 = ((cljs.core.seq_QMARK_.call(null,map__229058__229059))?cljs.core.apply.call(null,cljs.core.hash_map,map__229058__229059):map__229058__229059);
var axis_number_format__229061 = cljs.core.get.call(null,map__229058__229060,"\uFDD0'axis-number-format");
var axis_font_size__229062 = cljs.core.get.call(null,map__229058__229060,"\uFDD0'axis-font-size");
var axis_font_family__229063 = cljs.core.get.call(null,map__229058__229060,"\uFDD0'axis-font-family");
var grid_lines__229064 = cljs.core.get.call(null,map__229058__229060,"\uFDD0'grid-lines");
var xmax__229065 = cljs.core.get.call(null,map__229058__229060,"\uFDD0'xmax");
var xmin__229066 = cljs.core.get.call(null,map__229058__229060,"\uFDD0'xmin");
var width__229067 = cljs.core.get.call(null,map__229058__229060,"\uFDD0'width");
var height__229068 = cljs.core.get.call(null,map__229058__229060,"\uFDD0'height");
var grid_x_space__229069 = (width__229067 / grid_lines__229064);
var iter__625__auto____229074 = (function iter__229070(s__229071){
return (new cljs.core.LazySeq(null,false,(function (){
var s__229071__229072 = s__229071;
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__229071__229072)))
{var i__229073 = cljs.core.first.call(null,s__229071__229072);
if(cljs.core.even_QMARK_.call(null,i__229073))
{return cljs.core.cons.call(null,apogee.svg.style.call(null,apogee.svg.text.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'x","\uFDD0'y"],{"\uFDD0'x":(i__229073 * grid_x_space__229069),"\uFDD0'y":(20 + height__229068)}),apogee.util.format.call(null,axis_number_format__229061,apogee.svg.translate_value.call(null,(i__229073 * grid_x_space__229069),0,width__229067,xmin__229066,xmax__229065))),"\uFDD0'fill",apogee.svg.rgb.call(null,150,150,150),"\uFDD0'font-family",axis_font_family__229063,"\uFDD0'font-size",axis_font_size__229062,"\uFDD0'text-anchor","\uFDD0'middle"),iter__229070.call(null,cljs.core.rest.call(null,s__229071__229072)));
} else
{{
var G__229075 = cljs.core.rest.call(null,s__229071__229072);
s__229071__229072 = G__229075;
continue;
}
}
} else
{return null;
}
break;
}
})));
});
return iter__625__auto____229074.call(null,apogee.util.range.call(null,0,(grid_lines__229064 + 1)));
});
goog.exportSymbol('apogee.charts.x_axis', apogee.charts.x_axis);
apogee.charts.y_axis = (function y_axis(p__229076){
var map__229077__229078 = p__229076;
var map__229077__229079 = ((cljs.core.seq_QMARK_.call(null,map__229077__229078))?cljs.core.apply.call(null,cljs.core.hash_map,map__229077__229078):map__229077__229078);
var axis_number_format__229080 = cljs.core.get.call(null,map__229077__229079,"\uFDD0'axis-number-format");
var axis_font_size__229081 = cljs.core.get.call(null,map__229077__229079,"\uFDD0'axis-font-size");
var axis_font_family__229082 = cljs.core.get.call(null,map__229077__229079,"\uFDD0'axis-font-family");
var grid_lines__229083 = cljs.core.get.call(null,map__229077__229079,"\uFDD0'grid-lines");
var ymax__229084 = cljs.core.get.call(null,map__229077__229079,"\uFDD0'ymax");
var ymin__229085 = cljs.core.get.call(null,map__229077__229079,"\uFDD0'ymin");
var width__229086 = cljs.core.get.call(null,map__229077__229079,"\uFDD0'width");
var height__229087 = cljs.core.get.call(null,map__229077__229079,"\uFDD0'height");
var grid_y_space__229088 = (height__229087 / grid_lines__229083);
var iter__625__auto____229093 = (function iter__229089(s__229090){
return (new cljs.core.LazySeq(null,false,(function (){
var s__229090__229091 = s__229090;
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__229090__229091)))
{var i__229092 = cljs.core.first.call(null,s__229090__229091);
if(cljs.core.even_QMARK_.call(null,i__229092))
{return cljs.core.cons.call(null,apogee.svg.style.call(null,apogee.svg.text.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'x","\uFDD0'y"],{"\uFDD0'x":0,"\uFDD0'y":(height__229087 - (i__229092 * grid_y_space__229088))}),apogee.util.format.call(null,axis_number_format__229080,apogee.svg.translate_value.call(null,(i__229092 * grid_y_space__229088),0,height__229087,ymin__229085,ymax__229084))),"\uFDD0'fill",apogee.svg.rgb.call(null,150,150,150),"\uFDD0'font-family",axis_font_family__229082,"\uFDD0'font-size",axis_font_size__229081,"\uFDD0'text-anchor","\uFDD0'end","\uFDD0'alignment-baseline","\uFDD0'middle"),iter__229089.call(null,cljs.core.rest.call(null,s__229090__229091)));
} else
{{
var G__229094 = cljs.core.rest.call(null,s__229090__229091);
s__229090__229091 = G__229094;
continue;
}
}
} else
{return null;
}
break;
}
})));
});
return iter__625__auto____229093.call(null,apogee.util.range.call(null,1,(grid_lines__229083 + 1)));
});
goog.exportSymbol('apogee.charts.y_axis', apogee.charts.y_axis);
/**
* @param {...*} var_args
*/
apogee.charts.xy_plot = (function() { 
var xy_plot__delegate = function (options){
var props__229095 = cljs.core.merge.call(null,apogee.charts.default_chart_props,cljs.core.apply.call(null,cljs.core.hash_map,options));
return cljs.core.ObjMap.fromObject(["\uFDD0'properties","\uFDD0'svg"],{"\uFDD0'properties":props__229095,"\uFDD0'svg":cljs.core.concat.call(null,apogee.svg.translate.call(null,apogee.svg.group.call(null,apogee.charts.chart_background.call(null,props__229095)),"\uFDD0'x".call(null,props__229095),"\uFDD0'y".call(null,props__229095)),apogee.charts.x_grid.call(null,props__229095),apogee.charts.y_grid.call(null,props__229095),apogee.charts.x_axis.call(null,props__229095),apogee.charts.y_axis.call(null,props__229095))});
};
var xy_plot = function (var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return xy_plot__delegate.call(this, options);
};
xy_plot.cljs$lang$maxFixedArity = 0;
xy_plot.cljs$lang$applyTo = (function (arglist__229096){
var options = cljs.core.seq(arglist__229096);;
return xy_plot__delegate(options);
});
xy_plot.cljs$lang$arity$variadic = xy_plot__delegate;
return xy_plot;
})()
;
goog.exportSymbol('apogee.charts.xy_plot', apogee.charts.xy_plot);
/**
* @param {...*} var_args
*/
apogee.charts.point_label = (function() { 
var point_label__delegate = function (p__229097,x_STAR_,y_STAR_,x,y,r,options){
var map__229098__229099 = p__229097;
var map__229098__229100 = ((cljs.core.seq_QMARK_.call(null,map__229098__229099))?cljs.core.apply.call(null,cljs.core.hash_map,map__229098__229099):map__229098__229099);
var label_number_format__229101 = cljs.core.get.call(null,map__229098__229100,"\uFDD0'label-number-format");
var label_font_size__229102 = cljs.core.get.call(null,map__229098__229100,"\uFDD0'label-font-size");
var label_font_family__229103 = cljs.core.get.call(null,map__229098__229100,"\uFDD0'label-font-family");
return apogee.svg.style.call(null,apogee.svg.text.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'x","\uFDD0'y"],{"\uFDD0'x":(x_STAR_ + r),"\uFDD0'y":(y_STAR_ - r)}),[cljs.core.str(apogee.util.format.call(null,label_number_format__229101,x)),cljs.core.str(","),cljs.core.str(apogee.util.format.call(null,label_number_format__229101,y))].join('')),"\uFDD0'fill",apogee.svg.rgb.call(null,100,100,150),"\uFDD0'font-family",label_font_family__229103,"\uFDD0'font-size",label_font_size__229102);
};
var point_label = function (p__229097,x_STAR_,y_STAR_,x,y,r,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 6),0);
} 
return point_label__delegate.call(this, p__229097, x_STAR_, y_STAR_, x, y, r, options);
};
point_label.cljs$lang$maxFixedArity = 6;
point_label.cljs$lang$applyTo = (function (arglist__229104){
var p__229097 = cljs.core.first(arglist__229104);
var x_STAR_ = cljs.core.first(cljs.core.next(arglist__229104));
var y_STAR_ = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229104)));
var x = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229104))));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229104)))));
var r = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229104))))));
var options = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229104))))));
return point_label__delegate(p__229097, x_STAR_, y_STAR_, x, y, r, options);
});
point_label.cljs$lang$arity$variadic = point_label__delegate;
return point_label;
})()
;
goog.exportSymbol('apogee.charts.point_label', apogee.charts.point_label);
/**
* @param {...*} var_args
*/
apogee.charts.add_point = (function() { 
var add_point__delegate = function (chart,x,y,r,options){
var props__229106 = "\uFDD0'properties".call(null,chart);
var map__229105__229107 = props__229106;
var map__229105__229108 = ((cljs.core.seq_QMARK_.call(null,map__229105__229107))?cljs.core.apply.call(null,cljs.core.hash_map,map__229105__229107):map__229105__229107);
var label_points_QMARK___229109 = cljs.core.get.call(null,map__229105__229108,"\uFDD0'label-points?");
var ymax__229110 = cljs.core.get.call(null,map__229105__229108,"\uFDD0'ymax");
var ymin__229111 = cljs.core.get.call(null,map__229105__229108,"\uFDD0'ymin");
var xmax__229112 = cljs.core.get.call(null,map__229105__229108,"\uFDD0'xmax");
var xmin__229113 = cljs.core.get.call(null,map__229105__229108,"\uFDD0'xmin");
var width__229114 = cljs.core.get.call(null,map__229105__229108,"\uFDD0'width");
var height__229115 = cljs.core.get.call(null,map__229105__229108,"\uFDD0'height");
var x_STAR___229116 = apogee.svg.translate_value.call(null,x,xmin__229113,xmax__229112,0,width__229114);
var y_STAR___229117 = (height__229115 - apogee.svg.translate_value.call(null,y,ymin__229111,ymax__229110,0,height__229115));
var point__229118 = cljs.core.apply.call(null,apogee.svg.circle,x_STAR___229116,y_STAR___229117,r,options);
var label__229119 = apogee.charts.point_label.call(null,props__229106,x_STAR___229116,y_STAR___229117,x,y,r);
return cljs.core.assoc.call(null,cljs.core.update_in.call(null,chart,cljs.core.PersistentVector.fromArray(["\uFDD0'points"]),(function (old){
return cljs.core.conj.call(null,old,cljs.core.apply.call(null,cljs.core.assoc,cljs.core.ObjMap.fromObject(["\uFDD0'x","\uFDD0'y","\uFDD0'r"],{"\uFDD0'x":x,"\uFDD0'y":y,"\uFDD0'r":r}),options));
})),"\uFDD0'svg",cljs.core.concat.call(null,"\uFDD0'svg".call(null,chart),(cljs.core.truth_(label_points_QMARK___229109)?cljs.core.PersistentVector.fromArray([point__229118,label__229119]):cljs.core.PersistentVector.fromArray([point__229118]))));
};
var add_point = function (chart,x,y,r,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return add_point__delegate.call(this, chart, x, y, r, options);
};
add_point.cljs$lang$maxFixedArity = 4;
add_point.cljs$lang$applyTo = (function (arglist__229120){
var chart = cljs.core.first(arglist__229120);
var x = cljs.core.first(cljs.core.next(arglist__229120));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229120)));
var r = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229120))));
var options = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229120))));
return add_point__delegate(chart, x, y, r, options);
});
add_point.cljs$lang$arity$variadic = add_point__delegate;
return add_point;
})()
;
goog.exportSymbol('apogee.charts.add_point', apogee.charts.add_point);
apogee.charts.points__GT_xy = (function points__GT_xy(points){
return cljs.core.reduce.call(null,(function (p__229121,p__229122){
var vec__229123__229125 = p__229121;
var x__229126 = cljs.core.nth.call(null,vec__229123__229125,0,null);
var y__229127 = cljs.core.nth.call(null,vec__229123__229125,1,null);
var vec__229124__229128 = p__229122;
var p1__229129 = cljs.core.nth.call(null,vec__229124__229128,0,null);
var p2__229130 = cljs.core.nth.call(null,vec__229124__229128,1,null);
return cljs.core.PersistentVector.fromArray([cljs.core.conj.call(null,x__229126,p1__229129),cljs.core.conj.call(null,y__229127,p2__229130)]);
}),cljs.core.PersistentVector.fromArray([cljs.core.PersistentVector.fromArray([]),cljs.core.PersistentVector.fromArray([])]),points);
});
goog.exportSymbol('apogee.charts.points__GT_xy', apogee.charts.points__GT_xy);
apogee.charts.xy__GT_points = (function xy__GT_points(p__229131){
var vec__229132__229133 = p__229131;
var x__229134 = cljs.core.nth.call(null,vec__229132__229133,0,null);
var y__229135 = cljs.core.nth.call(null,vec__229132__229133,1,null);
return cljs.core.map.call(null,(function (p1,p2){
return cljs.core.PersistentVector.fromArray([p1,p2]);
}),x__229134,y__229135);
});
goog.exportSymbol('apogee.charts.xy__GT_points', apogee.charts.xy__GT_points);
/**
* @param {...*} var_args
*/
apogee.charts.add_points = (function() { 
var add_points__delegate = function (chart,data,p__229136){
var map__229137__229138 = p__229136;
var map__229137__229139 = ((cljs.core.seq_QMARK_.call(null,map__229137__229138))?cljs.core.apply.call(null,cljs.core.hash_map,map__229137__229138):map__229137__229138);
var fill__229140 = cljs.core.get.call(null,map__229137__229139,"\uFDD0'fill");
var transpose_data_QMARK___229141 = cljs.core.get.call(null,map__229137__229139,"\uFDD0'transpose-data?");
var colors__229142 = cljs.core.get.call(null,map__229137__229139,"\uFDD0'colors");
var sizes__229143 = cljs.core.get.call(null,map__229137__229139,"\uFDD0'sizes");
var size__229144 = cljs.core.get.call(null,map__229137__229139,"\uFDD0'size");
var points__229145 = (cljs.core.truth_(transpose_data_QMARK___229141)?apogee.charts.xy__GT_points.call(null,data):data);
var sizes__229148 = (function (){var or__3548__auto____229146 = sizes__229143;
if(cljs.core.truth_(or__3548__auto____229146))
{return or__3548__auto____229146;
} else
{return cljs.core.repeat.call(null,cljs.core.count.call(null,points__229145),(function (){var or__3548__auto____229147 = size__229144;
if(cljs.core.truth_(or__3548__auto____229147))
{return or__3548__auto____229147;
} else
{return 3;
}
})());
}
})();
var colors__229151 = (function (){var or__3548__auto____229149 = colors__229142;
if(cljs.core.truth_(or__3548__auto____229149))
{return or__3548__auto____229149;
} else
{return cljs.core.repeat.call(null,cljs.core.count.call(null,points__229145),(function (){var or__3548__auto____229150 = fill__229140;
if(cljs.core.truth_(or__3548__auto____229150))
{return or__3548__auto____229150;
} else
{return apogee.svg.rgb.call(null,0,0,255);
}
})());
}
})();
var data__229157 = cljs.core.map.call(null,(function (p__229152,r,color){
var vec__229153__229154 = p__229152;
var x__229155 = cljs.core.nth.call(null,vec__229153__229154,0,null);
var y__229156 = cljs.core.nth.call(null,vec__229153__229154,1,null);
return cljs.core.PersistentVector.fromArray([x__229155,y__229156,r,color]);
}),points__229145,sizes__229148,colors__229151);
return cljs.core.reduce.call(null,(function (chart_svg,p__229158){
var vec__229159__229160 = p__229158;
var x__229161 = cljs.core.nth.call(null,vec__229159__229160,0,null);
var y__229162 = cljs.core.nth.call(null,vec__229159__229160,1,null);
var r__229163 = cljs.core.nth.call(null,vec__229159__229160,2,null);
var color__229164 = cljs.core.nth.call(null,vec__229159__229160,3,null);
return apogee.charts.add_point.call(null,chart_svg,x__229161,y__229162,r__229163,"\uFDD0'fill",color__229164);
}),chart,data__229157);
};
var add_points = function (chart,data,var_args){
var p__229136 = null;
if (goog.isDef(var_args)) {
  p__229136 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return add_points__delegate.call(this, chart, data, p__229136);
};
add_points.cljs$lang$maxFixedArity = 2;
add_points.cljs$lang$applyTo = (function (arglist__229165){
var chart = cljs.core.first(arglist__229165);
var data = cljs.core.first(cljs.core.next(arglist__229165));
var p__229136 = cljs.core.rest(cljs.core.next(arglist__229165));
return add_points__delegate(chart, data, p__229136);
});
add_points.cljs$lang$arity$variadic = add_points__delegate;
return add_points;
})()
;
goog.exportSymbol('apogee.charts.add_points', apogee.charts.add_points);
apogee.charts.emit_svg = (function emit_svg(chart){
return apogee.xml.emit.call(null,apogee.svg.svg.call(null,"\uFDD0'svg".call(null,chart)));
});
goog.exportSymbol('apogee.charts.emit_svg', apogee.charts.emit_svg);
