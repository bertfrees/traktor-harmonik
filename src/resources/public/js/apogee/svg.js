goog.provide('apogee.svg');
goog.require('cljs.core');
goog.require('apogee.xml');
/**
* @param {...*} var_args
*/
apogee.svg.svg = (function() { 
var svg__delegate = function (content){
var xmlns__229166 = cljs.core.ObjMap.fromObject(["xmlns:svg","xmlns","xmlns:xlink","version"],{"xmlns:svg":"http://www.w3.org/2000/svg","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","version":"1.0"});
var attrs__229167 = ((cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,content)))?cljs.core.first.call(null,content):cljs.core.ObjMap.fromObject([],{}));
var content__229168 = ((cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,content)))?cljs.core.rest.call(null,content):content);
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'svg",cljs.core.merge.call(null,xmlns__229166,attrs__229167)]),content__229168);
};
var svg = function (var_args){
var content = null;
if (goog.isDef(var_args)) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return svg__delegate.call(this, content);
};
svg.cljs$lang$maxFixedArity = 0;
svg.cljs$lang$applyTo = (function (arglist__229169){
var content = cljs.core.seq(arglist__229169);;
return svg__delegate(content);
});
svg.cljs$lang$arity$variadic = svg__delegate;
return svg;
})()
;
goog.exportSymbol('apogee.svg.svg', apogee.svg.svg);
apogee.svg.style_map = (function style_map(elem,props){
var styling__229175 = (cljs.core.truth_(cljs.core.seq.call(null,props))?cljs.core.reduce.call(null,(function (s,p__229170){
var vec__229171__229172 = p__229170;
var k__229173 = cljs.core.nth.call(null,vec__229171__229172,0,null);
var v__229174 = cljs.core.nth.call(null,vec__229171__229172,1,null);
return [cljs.core.str(s),cljs.core.str(" "),cljs.core.str(cljs.core.name.call(null,k__229173)),cljs.core.str(": "),cljs.core.str(((cljs.core.keyword_QMARK_.call(null,v__229174))?cljs.core.name.call(null,v__229174):v__229174)),cljs.core.str("; ")].join('');
}),"",props):null);
return apogee.xml.add_attrs.call(null,elem,"\uFDD0'style",styling__229175);
});
goog.exportSymbol('apogee.svg.style_map', apogee.svg.style_map);
/**
* @param {...*} var_args
*/
apogee.svg.style = (function() { 
var style__delegate = function (elem,properties){
return apogee.svg.style_map.call(null,elem,cljs.core.apply.call(null,cljs.core.hash_map,properties));
};
var style = function (elem,var_args){
var properties = null;
if (goog.isDef(var_args)) {
  properties = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return style__delegate.call(this, elem, properties);
};
style.cljs$lang$maxFixedArity = 1;
style.cljs$lang$applyTo = (function (arglist__229176){
var elem = cljs.core.first(arglist__229176);
var properties = cljs.core.rest(arglist__229176);
return style__delegate(elem, properties);
});
style.cljs$lang$arity$variadic = style__delegate;
return style;
})()
;
goog.exportSymbol('apogee.svg.style', apogee.svg.style);
/**
* @param {...*} var_args
*/
apogee.svg.line = (function() { 
var line__delegate = function (x1,y1,x2,y2,options){
var attrs__229177 = cljs.core.apply.call(null,cljs.core.hash_map,options);
return cljs.core.PersistentVector.fromArray(["\uFDD0'line",cljs.core.apply.call(null,cljs.core.merge,cljs.core.ObjMap.fromObject(["\uFDD0'x1","\uFDD0'y1","\uFDD0'x2","\uFDD0'y2"],{"\uFDD0'x1":x1,"\uFDD0'y1":y1,"\uFDD0'x2":x2,"\uFDD0'y2":y2}),attrs__229177)]);
};
var line = function (x1,y1,x2,y2,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return line__delegate.call(this, x1, y1, x2, y2, options);
};
line.cljs$lang$maxFixedArity = 4;
line.cljs$lang$applyTo = (function (arglist__229178){
var x1 = cljs.core.first(arglist__229178);
var y1 = cljs.core.first(cljs.core.next(arglist__229178));
var x2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229178)));
var y2 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229178))));
var options = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229178))));
return line__delegate(x1, y1, x2, y2, options);
});
line.cljs$lang$arity$variadic = line__delegate;
return line;
})()
;
goog.exportSymbol('apogee.svg.line', apogee.svg.line);
/**
* @param {...*} var_args
*/
apogee.svg.rect = (function() { 
var rect__delegate = function (x,y,height,width,options){
var attrs__229179 = cljs.core.apply.call(null,cljs.core.hash_map,options);
return cljs.core.PersistentVector.fromArray(["\uFDD0'rect",cljs.core.apply.call(null,cljs.core.merge,cljs.core.ObjMap.fromObject(["\uFDD0'x","\uFDD0'y","\uFDD0'height","\uFDD0'width"],{"\uFDD0'x":x,"\uFDD0'y":y,"\uFDD0'height":height,"\uFDD0'width":width}),attrs__229179)]);
};
var rect = function (x,y,height,width,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return rect__delegate.call(this, x, y, height, width, options);
};
rect.cljs$lang$maxFixedArity = 4;
rect.cljs$lang$applyTo = (function (arglist__229180){
var x = cljs.core.first(arglist__229180);
var y = cljs.core.first(cljs.core.next(arglist__229180));
var height = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229180)));
var width = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229180))));
var options = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229180))));
return rect__delegate(x, y, height, width, options);
});
rect.cljs$lang$arity$variadic = rect__delegate;
return rect;
})()
;
goog.exportSymbol('apogee.svg.rect', apogee.svg.rect);
/**
* @param {...*} var_args
*/
apogee.svg.circle = (function() { 
var circle__delegate = function (cx,cy,r,options){
var attrs__229181 = cljs.core.apply.call(null,cljs.core.hash_map,options);
return cljs.core.PersistentVector.fromArray(["\uFDD0'circle",cljs.core.apply.call(null,cljs.core.merge,cljs.core.ObjMap.fromObject(["\uFDD0'cx","\uFDD0'cy","\uFDD0'r"],{"\uFDD0'cx":cx,"\uFDD0'cy":cy,"\uFDD0'r":r}),attrs__229181)]);
};
var circle = function (cx,cy,r,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return circle__delegate.call(this, cx, cy, r, options);
};
circle.cljs$lang$maxFixedArity = 3;
circle.cljs$lang$applyTo = (function (arglist__229182){
var cx = cljs.core.first(arglist__229182);
var cy = cljs.core.first(cljs.core.next(arglist__229182));
var r = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229182)));
var options = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__229182)));
return circle__delegate(cx, cy, r, options);
});
circle.cljs$lang$arity$variadic = circle__delegate;
return circle;
})()
;
goog.exportSymbol('apogee.svg.circle', apogee.svg.circle);
/**
* @param {...*} var_args
*/
apogee.svg.ellipse = (function() { 
var ellipse__delegate = function (cx,cy,rx,ry,options){
var attrs__229183 = cljs.core.apply.call(null,cljs.core.hash_map,options);
return cljs.core.PersistentVector.fromArray(["\uFDD0'ellipse",cljs.core.apply.call(null,cljs.core.merge,cljs.core.ObjMap.fromObject(["\uFDD0'cx","\uFDD0'cy","\uFDD0'rx","\uFDD0'ry"],{"\uFDD0'cx":cx,"\uFDD0'cy":cy,"\uFDD0'rx":rx,"\uFDD0'ry":ry}),attrs__229183)]);
};
var ellipse = function (cx,cy,rx,ry,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return ellipse__delegate.call(this, cx, cy, rx, ry, options);
};
ellipse.cljs$lang$maxFixedArity = 4;
ellipse.cljs$lang$applyTo = (function (arglist__229184){
var cx = cljs.core.first(arglist__229184);
var cy = cljs.core.first(cljs.core.next(arglist__229184));
var rx = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229184)));
var ry = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229184))));
var options = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__229184))));
return ellipse__delegate(cx, cy, rx, ry, options);
});
ellipse.cljs$lang$arity$variadic = ellipse__delegate;
return ellipse;
})()
;
goog.exportSymbol('apogee.svg.ellipse', apogee.svg.ellipse);
/**
* @param {...*} var_args
*/
apogee.svg.polygon = (function() { 
var polygon__delegate = function (p__229185,options){
var vec__229186__229187 = p__229185;
var points__229188 = cljs.core.nthnext.call(null,vec__229186__229187,0);
var attrs__229189 = cljs.core.apply.call(null,cljs.core.hash_map,options);
var points__229195 = cljs.core.reduce.call(null,(function (s,p__229190){
var vec__229191__229192 = p__229190;
var x__229193 = cljs.core.nth.call(null,vec__229191__229192,0,null);
var y__229194 = cljs.core.nth.call(null,vec__229191__229192,1,null);
return [cljs.core.str(s),cljs.core.str(" "),cljs.core.str(x__229193),cljs.core.str(","),cljs.core.str(y__229194)].join('');
}),"",cljs.core.partition.call(null,2,points__229188));
return cljs.core.PersistentVector.fromArray(["\uFDD0'polygon",cljs.core.apply.call(null,cljs.core.merge,cljs.core.ObjMap.fromObject(["\uFDD0'points"],{"\uFDD0'points":points__229195}),attrs__229189)]);
};
var polygon = function (p__229185,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return polygon__delegate.call(this, p__229185, options);
};
polygon.cljs$lang$maxFixedArity = 1;
polygon.cljs$lang$applyTo = (function (arglist__229196){
var p__229185 = cljs.core.first(arglist__229196);
var options = cljs.core.rest(arglist__229196);
return polygon__delegate(p__229185, options);
});
polygon.cljs$lang$arity$variadic = polygon__delegate;
return polygon;
})()
;
goog.exportSymbol('apogee.svg.polygon', apogee.svg.polygon);
/**
* @param {...*} var_args
*/
apogee.svg.text = (function() { 
var text__delegate = function (content){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'text"]),content);
};
var text = function (var_args){
var content = null;
if (goog.isDef(var_args)) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return text__delegate.call(this, content);
};
text.cljs$lang$maxFixedArity = 0;
text.cljs$lang$applyTo = (function (arglist__229197){
var content = cljs.core.seq(arglist__229197);;
return text__delegate(content);
});
text.cljs$lang$arity$variadic = text__delegate;
return text;
})()
;
goog.exportSymbol('apogee.svg.text', apogee.svg.text);
/**
* @param {...*} var_args
*/
apogee.svg.group = (function() { 
var group__delegate = function (content){
return cljs.core.cons.call(null,"\uFDD0'g",content);
};
var group = function (var_args){
var content = null;
if (goog.isDef(var_args)) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return group__delegate.call(this, content);
};
group.cljs$lang$maxFixedArity = 0;
group.cljs$lang$applyTo = (function (arglist__229198){
var content = cljs.core.seq(arglist__229198);;
return group__delegate(content);
});
group.cljs$lang$arity$variadic = group__delegate;
return group;
})()
;
goog.exportSymbol('apogee.svg.group', apogee.svg.group);
/**
* @param {...*} var_args
*/
apogee.svg.draw = (function() { 
var draw__delegate = function (commands){
return cljs.core.reduce.call(null,(function (s,p__229199){
var vec__229200__229201 = p__229199;
var cmd__229202 = cljs.core.nth.call(null,vec__229200__229201,0,null);
var args__229203 = cljs.core.nth.call(null,vec__229200__229201,1,null);
return [cljs.core.str(s),cljs.core.str(" "),cljs.core.str(cljs.core.name.call(null,cmd__229202)),cljs.core.str(cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,",",args__229203)))].join('');
}),"",cljs.core.partition.call(null,2,commands));
};
var draw = function (var_args){
var commands = null;
if (goog.isDef(var_args)) {
  commands = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return draw__delegate.call(this, commands);
};
draw.cljs$lang$maxFixedArity = 0;
draw.cljs$lang$applyTo = (function (arglist__229204){
var commands = cljs.core.seq(arglist__229204);;
return draw__delegate(commands);
});
draw.cljs$lang$arity$variadic = draw__delegate;
return draw;
})()
;
goog.exportSymbol('apogee.svg.draw', apogee.svg.draw);
/**
* @param {...*} var_args
*/
apogee.svg.path = (function() { 
var path__delegate = function (draw_commands,options){
var attrs__229205 = cljs.core.apply.call(null,cljs.core.hash_map,options);
return cljs.core.PersistentVector.fromArray(["\uFDD0'path",cljs.core.merge.call(null,cljs.core.ObjMap.fromObject(["\uFDD0'd"],{"\uFDD0'd":cljs.core.apply.call(null,apogee.svg.draw,draw_commands)}),attrs__229205)]);
};
var path = function (draw_commands,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return path__delegate.call(this, draw_commands, options);
};
path.cljs$lang$maxFixedArity = 1;
path.cljs$lang$applyTo = (function (arglist__229206){
var draw_commands = cljs.core.first(arglist__229206);
var options = cljs.core.rest(arglist__229206);
return path__delegate(draw_commands, options);
});
path.cljs$lang$arity$variadic = path__delegate;
return path;
})()
;
goog.exportSymbol('apogee.svg.path', apogee.svg.path);
apogee.svg.tref = (function tref(id){
return cljs.core.PersistentVector.fromArray(["\uFDD0'tref",cljs.core.ObjMap.fromObject(["xlink:href"],{"xlink:href":[cljs.core.str("#"),cljs.core.str(cljs.core.name.call(null,id))].join('')})]);
});
goog.exportSymbol('apogee.svg.tref', apogee.svg.tref);
apogee.svg.rgb = (function rgb(r,g,b){
return [cljs.core.str("rgb("),cljs.core.str(r),cljs.core.str(","),cljs.core.str(g),cljs.core.str(","),cljs.core.str(b),cljs.core.str(")")].join('');
});
goog.exportSymbol('apogee.svg.rgb', apogee.svg.rgb);
/**
* @param {...*} var_args
*/
apogee.svg.animate = (function() { 
var animate__delegate = function (elem,attr,attrs){
return apogee.xml.add_content.call(null,elem,apogee.xml.merge_attrs.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'animate",cljs.core.ObjMap.fromObject(["\uFDD0'attributeName","\uFDD0'begin","\uFDD0'fill"],{"\uFDD0'attributeName":cljs.core.name.call(null,attr),"\uFDD0'begin":0,"\uFDD0'fill":"freeze"})]),cljs.core.apply.call(null,cljs.core.hash_map,attrs)));
};
var animate = function (elem,attr,var_args){
var attrs = null;
if (goog.isDef(var_args)) {
  attrs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return animate__delegate.call(this, elem, attr, attrs);
};
animate.cljs$lang$maxFixedArity = 2;
animate.cljs$lang$applyTo = (function (arglist__229207){
var elem = cljs.core.first(arglist__229207);
var attr = cljs.core.first(cljs.core.next(arglist__229207));
var attrs = cljs.core.rest(cljs.core.next(arglist__229207));
return animate__delegate(elem, attr, attrs);
});
animate.cljs$lang$arity$variadic = animate__delegate;
return animate;
})()
;
goog.exportSymbol('apogee.svg.animate', apogee.svg.animate);
/**
* @param {...*} var_args
*/
apogee.svg.animate_motion = (function() { 
var animate_motion__delegate = function (elem,attrs){
return apogee.xml.add_content.call(null,elem,apogee.xml.merge_attrs.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'animateMotion",cljs.core.ObjMap.fromObject(["\uFDD0'begin","\uFDD0'fill"],{"\uFDD0'begin":0,"\uFDD0'fill":"freeze"})]),cljs.core.apply.call(null,cljs.core.hash_map,attrs)));
};
var animate_motion = function (elem,var_args){
var attrs = null;
if (goog.isDef(var_args)) {
  attrs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return animate_motion__delegate.call(this, elem, attrs);
};
animate_motion.cljs$lang$maxFixedArity = 1;
animate_motion.cljs$lang$applyTo = (function (arglist__229208){
var elem = cljs.core.first(arglist__229208);
var attrs = cljs.core.rest(arglist__229208);
return animate_motion__delegate(elem, attrs);
});
animate_motion.cljs$lang$arity$variadic = animate_motion__delegate;
return animate_motion;
})()
;
goog.exportSymbol('apogee.svg.animate_motion', apogee.svg.animate_motion);
/**
* @param {...*} var_args
*/
apogee.svg.animate_color = (function() { 
var animate_color__delegate = function (elem,attr,attrs){
return apogee.xml.add_content.call(null,elem,apogee.xml.merge_attrs.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'animateColor",cljs.core.ObjMap.fromObject(["\uFDD0'attributeName","\uFDD0'begin","\uFDD0'fill"],{"\uFDD0'attributeName":cljs.core.name.call(null,attr),"\uFDD0'begin":0,"\uFDD0'fill":"freeze"})]),cljs.core.apply.call(null,cljs.core.hash_map,attrs)));
};
var animate_color = function (elem,attr,var_args){
var attrs = null;
if (goog.isDef(var_args)) {
  attrs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return animate_color__delegate.call(this, elem, attr, attrs);
};
animate_color.cljs$lang$maxFixedArity = 2;
animate_color.cljs$lang$applyTo = (function (arglist__229209){
var elem = cljs.core.first(arglist__229209);
var attr = cljs.core.first(cljs.core.next(arglist__229209));
var attrs = cljs.core.rest(cljs.core.next(arglist__229209));
return animate_color__delegate(elem, attr, attrs);
});
animate_color.cljs$lang$arity$variadic = animate_color__delegate;
return animate_color;
})()
;
goog.exportSymbol('apogee.svg.animate_color', apogee.svg.animate_color);
/**
* @param {...*} var_args
*/
apogee.svg.animate_transform = (function() { 
var animate_transform__delegate = function (elem,attrs){
return apogee.xml.add_content.call(null,elem,apogee.xml.merge_attrs.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'animateTransform",cljs.core.ObjMap.fromObject(["\uFDD0'attributeName","\uFDD0'begin","\uFDD0'fill"],{"\uFDD0'attributeName":"transform","\uFDD0'begin":0,"\uFDD0'fill":"freeze"})]),cljs.core.apply.call(null,cljs.core.hash_map,attrs)));
};
var animate_transform = function (elem,var_args){
var attrs = null;
if (goog.isDef(var_args)) {
  attrs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return animate_transform__delegate.call(this, elem, attrs);
};
animate_transform.cljs$lang$maxFixedArity = 1;
animate_transform.cljs$lang$applyTo = (function (arglist__229210){
var elem = cljs.core.first(arglist__229210);
var attrs = cljs.core.rest(arglist__229210);
return animate_transform__delegate(elem, attrs);
});
animate_transform.cljs$lang$arity$variadic = animate_transform__delegate;
return animate_transform;
})()
;
goog.exportSymbol('apogee.svg.animate_transform', apogee.svg.animate_transform);
apogee.svg.transform = (function transform(elem,trans){
var attrs__229211 = apogee.xml.get_attrs.call(null,elem);
var trans__229212 = (cljs.core.truth_("\uFDD0'transform".call(null,attrs__229211))?[cljs.core.str("\uFDD0'transform".call(null,attrs__229211)),cljs.core.str(" "),cljs.core.str(trans)].join(''):trans);
return apogee.xml.add_attrs.call(null,elem,"\uFDD0'transform",trans__229212);
});
goog.exportSymbol('apogee.svg.transform', apogee.svg.transform);
apogee.svg.rotate = (function rotate(elem,angle,x,y){
return apogee.svg.transform.call(null,elem,[cljs.core.str("rotate("),cljs.core.str(angle),cljs.core.str(","),cljs.core.str(x),cljs.core.str(","),cljs.core.str(y),cljs.core.str(")")].join(''));
});
goog.exportSymbol('apogee.svg.rotate', apogee.svg.rotate);
apogee.svg.translate = (function() {
var translate = null;
var translate__2 = (function (elem,x){
return apogee.svg.transform.call(null,elem,[cljs.core.str("translate("),cljs.core.str(x),cljs.core.str(")")].join(''));
});
var translate__3 = (function (elem,x,y){
return apogee.svg.transform.call(null,elem,[cljs.core.str("translate("),cljs.core.str(x),cljs.core.str(","),cljs.core.str(y),cljs.core.str(")")].join(''));
});
translate = function(elem,x,y){
switch(arguments.length){
case 2:
return translate__2.call(this,elem,x);
case 3:
return translate__3.call(this,elem,x,y);
}
throw('Invalid arity: ' + arguments.length);
};
translate.cljs$lang$arity$2 = translate__2;
translate.cljs$lang$arity$3 = translate__3;
return translate;
})()
;
goog.exportSymbol('apogee.svg.translate', apogee.svg.translate);
apogee.svg.defs = (function defs(p__229213){
var vec__229214__229215 = p__229213;
var bindings__229216 = cljs.core.nthnext.call(null,vec__229214__229215,0);
var bindings__229217 = cljs.core.partition.call(null,2,bindings__229216);
var f__229223 = (function (defs_tag,p__229218){
var vec__229219__229220 = p__229218;
var id__229221 = cljs.core.nth.call(null,vec__229219__229220,0,null);
var tag__229222 = cljs.core.nth.call(null,vec__229219__229220,1,null);
return cljs.core.conj.call(null,defs_tag,apogee.xml.add_attrs.call(null,tag__229222,"\uFDD0'id",cljs.core.name.call(null,id__229221)));
});
return cljs.core.reduce.call(null,f__229223,cljs.core.PersistentVector.fromArray(["\uFDD0'defs"]),bindings__229217);
});
goog.exportSymbol('apogee.svg.defs', apogee.svg.defs);
apogee.svg.text_path = (function text_path(text,path_id){
return cljs.core.PersistentVector.fromArray(["\uFDD0'textPath",cljs.core.ObjMap.fromObject(["xlink:href"],{"xlink:href":[cljs.core.str("#"),cljs.core.str(cljs.core.name.call(null,path_id))].join('')}),text]);
});
goog.exportSymbol('apogee.svg.text_path', apogee.svg.text_path);
/**
* @param {...*} var_args
*/
apogee.svg.tspan = (function() { 
var tspan__delegate = function (content){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray(["\uFDD0'tspan"]),content);
};
var tspan = function (var_args){
var content = null;
if (goog.isDef(var_args)) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return tspan__delegate.call(this, content);
};
tspan.cljs$lang$maxFixedArity = 0;
tspan.cljs$lang$applyTo = (function (arglist__229224){
var content = cljs.core.seq(arglist__229224);;
return tspan__delegate(content);
});
tspan.cljs$lang$arity$variadic = tspan__delegate;
return tspan;
})()
;
goog.exportSymbol('apogee.svg.tspan', apogee.svg.tspan);
/**
* @param {...*} var_args
*/
apogee.svg.image = (function() { 
var image__delegate = function (href,options){
var attrs__229225 = cljs.core.apply.call(null,cljs.core.hash_map,options);
return cljs.core.PersistentVector.fromArray(["\uFDD0'image",cljs.core.merge.call(null,cljs.core.ObjMap.fromObject(["xlink:href"],{"xlink:href":href}),attrs__229225)]);
};
var image = function (href,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return image__delegate.call(this, href, options);
};
image.cljs$lang$maxFixedArity = 1;
image.cljs$lang$applyTo = (function (arglist__229226){
var href = cljs.core.first(arglist__229226);
var options = cljs.core.rest(arglist__229226);
return image__delegate(href, options);
});
image.cljs$lang$arity$variadic = image__delegate;
return image;
})()
;
goog.exportSymbol('apogee.svg.image', apogee.svg.image);
apogee.svg.translate_value = (function translate_value(v,from_min,from_max,to_min,to_max){
var scale__229228 = ((to_max - to_min) / (from_max - from_min));
var trans__229229 = (to_min - (from_min * scale__229228));
return ((v * scale__229228) + trans__229229);
});
goog.exportSymbol('apogee.svg.translate_value', apogee.svg.translate_value);
apogee.svg.parse_inline_css = (function parse_inline_css(css_str){
return cljs.core.reduce.call(null,(function (m,p__229230){
var vec__229231__229232 = p__229230;
var k__229233 = cljs.core.nth.call(null,vec__229231__229232,0,null);
var v__229234 = cljs.core.nth.call(null,vec__229231__229232,1,null);
return cljs.core.assoc.call(null,m,cljs.core.keyword.call(null,k__229233),v__229234);
}),cljs.core.ObjMap.fromObject([],{}),cljs.core.map.call(null,(function (p1__229227_SHARP_){
return p1__229227_SHARP_.split(":");
}),css_str.split(";")));
});
goog.exportSymbol('apogee.svg.parse_inline_css', apogee.svg.parse_inline_css);
/**
* @param {...*} var_args
*/
apogee.svg.add_style = (function() { 
var add_style__delegate = function (elem,styling){
var css_str__229236 = (function (){var or__3548__auto____229235 = "\uFDD0'style".call(null,apogee.xml.get_attrs.call(null,elem));
if(cljs.core.truth_(or__3548__auto____229235))
{return or__3548__auto____229235;
} else
{return "";
}
})();
return apogee.svg.style_map.call(null,elem,cljs.core.apply.call(null,cljs.core.merge,apogee.svg.parse_inline_css.call(null,css_str__229236),cljs.core.apply.call(null,cljs.core.hash_map,styling)));
};
var add_style = function (elem,var_args){
var styling = null;
if (goog.isDef(var_args)) {
  styling = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return add_style__delegate.call(this, elem, styling);
};
add_style.cljs$lang$maxFixedArity = 1;
add_style.cljs$lang$applyTo = (function (arglist__229237){
var elem = cljs.core.first(arglist__229237);
var styling = cljs.core.rest(arglist__229237);
return add_style__delegate(elem, styling);
});
add_style.cljs$lang$arity$variadic = add_style__delegate;
return add_style;
})()
;
goog.exportSymbol('apogee.svg.add_style', apogee.svg.add_style);
