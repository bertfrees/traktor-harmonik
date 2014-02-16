goog.provide('apogee.xml');
goog.require('cljs.core');
goog.require('clojure.zip');
apogee.xml.has_attrs_QMARK_ = (function has_attrs_QMARK_(tag){
return cljs.core.map_QMARK_.call(null,cljs.core.second.call(null,tag));
});
goog.exportSymbol('apogee.xml.has_attrs_QMARK_', apogee.xml.has_attrs_QMARK_);
apogee.xml.has_content_QMARK_ = (function has_content_QMARK_(tag){
if(cljs.core.truth_(apogee.xml.has_attrs_QMARK_.call(null,tag)))
{return (cljs.core.count.call(null,tag) > 2);
} else
{return (cljs.core.count.call(null,tag) > 1);
}
});
goog.exportSymbol('apogee.xml.has_content_QMARK_', apogee.xml.has_content_QMARK_);
apogee.xml.get_name = (function get_name(tag){
var temp__3695__auto____229242 = cljs.core.first.call(null,tag);
if(cljs.core.truth_(temp__3695__auto____229242))
{var n__229243 = temp__3695__auto____229242;
return cljs.core.name.call(null,n__229243);
} else
{return null;
}
});
goog.exportSymbol('apogee.xml.get_name', apogee.xml.get_name);
apogee.xml.get_attrs = (function get_attrs(tag){
if(cljs.core.truth_(apogee.xml.has_attrs_QMARK_.call(null,tag)))
{return cljs.core.second.call(null,tag);
} else
{return cljs.core.ObjMap.fromObject([],{});
}
});
goog.exportSymbol('apogee.xml.get_attrs', apogee.xml.get_attrs);
apogee.xml.get_content = (function get_content(tag){
if(cljs.core.truth_(apogee.xml.has_attrs_QMARK_.call(null,tag)))
{return cljs.core.drop.call(null,2,tag);
} else
{return cljs.core.rest.call(null,tag);
}
});
goog.exportSymbol('apogee.xml.get_content', apogee.xml.get_content);
apogee.xml.set_attrs = (function set_attrs(tag,attrs){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([apogee.xml.get_name.call(null,tag),attrs]),apogee.xml.get_content.call(null,tag));
});
goog.exportSymbol('apogee.xml.set_attrs', apogee.xml.set_attrs);
/**
* @param {...*} var_args
*/
apogee.xml.set_content = (function() { 
var set_content__delegate = function (tag,content){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([apogee.xml.get_name.call(null,tag),apogee.xml.get_attrs.call(null,tag)]),content);
};
var set_content = function (tag,var_args){
var content = null;
if (goog.isDef(var_args)) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return set_content__delegate.call(this, tag, content);
};
set_content.cljs$lang$maxFixedArity = 1;
set_content.cljs$lang$applyTo = (function (arglist__229244){
var tag = cljs.core.first(arglist__229244);
var content = cljs.core.rest(arglist__229244);
return set_content__delegate(tag, content);
});
set_content.cljs$lang$arity$variadic = set_content__delegate;
return set_content;
})()
;
goog.exportSymbol('apogee.xml.set_content', apogee.xml.set_content);
/**
* @param {...*} var_args
*/
apogee.xml.add_attrs = (function() { 
var add_attrs__delegate = function (tag,attrs){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([apogee.xml.get_name.call(null,tag),cljs.core.apply.call(null,cljs.core.assoc,apogee.xml.get_attrs.call(null,tag),attrs)]),apogee.xml.get_content.call(null,tag));
};
var add_attrs = function (tag,var_args){
var attrs = null;
if (goog.isDef(var_args)) {
  attrs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return add_attrs__delegate.call(this, tag, attrs);
};
add_attrs.cljs$lang$maxFixedArity = 1;
add_attrs.cljs$lang$applyTo = (function (arglist__229245){
var tag = cljs.core.first(arglist__229245);
var attrs = cljs.core.rest(arglist__229245);
return add_attrs__delegate(tag, attrs);
});
add_attrs.cljs$lang$arity$variadic = add_attrs__delegate;
return add_attrs;
})()
;
goog.exportSymbol('apogee.xml.add_attrs', apogee.xml.add_attrs);
apogee.xml.merge_attrs = (function merge_attrs(tag,attrs){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([apogee.xml.get_name.call(null,tag),cljs.core.merge.call(null,apogee.xml.get_attrs.call(null,tag),attrs)]),apogee.xml.get_content.call(null,tag));
});
goog.exportSymbol('apogee.xml.merge_attrs', apogee.xml.merge_attrs);
/**
* @param {...*} var_args
*/
apogee.xml.add_content = (function() { 
var add_content__delegate = function (tag,content){
return cljs.core.concat.call(null,cljs.core.PersistentVector.fromArray([apogee.xml.get_name.call(null,tag),apogee.xml.get_attrs.call(null,tag)]),cljs.core.concat.call(null,apogee.xml.get_content.call(null,tag),content));
};
var add_content = function (tag,var_args){
var content = null;
if (goog.isDef(var_args)) {
  content = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return add_content__delegate.call(this, tag, content);
};
add_content.cljs$lang$maxFixedArity = 1;
add_content.cljs$lang$applyTo = (function (arglist__229246){
var tag = cljs.core.first(arglist__229246);
var content = cljs.core.rest(arglist__229246);
return add_content__delegate(tag, content);
});
add_content.cljs$lang$arity$variadic = add_content__delegate;
return add_content;
})()
;
goog.exportSymbol('apogee.xml.add_content', apogee.xml.add_content);
/**
* @param {...*} var_args
*/
apogee.xml.update_attrs = (function() { 
var update_attrs__delegate = function (tag,p__229247,update_fn,args){
var vec__229248__229249 = p__229247;
var keys__229250 = cljs.core.nthnext.call(null,vec__229248__229249,0);
return apogee.xml.set_attrs.call(null,tag,cljs.core.apply.call(null,cljs.core.update_in,apogee.xml.get_attrs.call(null,tag),keys__229250,update_fn,args));
};
var update_attrs = function (tag,p__229247,update_fn,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_attrs__delegate.call(this, tag, p__229247, update_fn, args);
};
update_attrs.cljs$lang$maxFixedArity = 3;
update_attrs.cljs$lang$applyTo = (function (arglist__229251){
var tag = cljs.core.first(arglist__229251);
var p__229247 = cljs.core.first(cljs.core.next(arglist__229251));
var update_fn = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229251)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__229251)));
return update_attrs__delegate(tag, p__229247, update_fn, args);
});
update_attrs.cljs$lang$arity$variadic = update_attrs__delegate;
return update_attrs;
})()
;
goog.exportSymbol('apogee.xml.update_attrs', apogee.xml.update_attrs);
apogee.xml.emit_attrs = (function emit_attrs(attrs){
if(cljs.core.truth_(attrs))
{return cljs.core.reduce.call(null,(function (s,p__229253){
var vec__229254__229255 = p__229253;
var k__229256 = cljs.core.nth.call(null,vec__229254__229255,0,null);
var v__229257 = cljs.core.nth.call(null,vec__229254__229255,1,null);
return [cljs.core.str(s),cljs.core.str(cljs.core.name.call(null,k__229256)),cljs.core.str("=\""),cljs.core.str(((cljs.core.keyword_QMARK_.call(null,v__229257))?cljs.core.name.call(null,v__229257):v__229257)),cljs.core.str("\" ")].join('');
}),"",attrs);
} else
{return null;
}
});
goog.exportSymbol('apogee.xml.emit_attrs', apogee.xml.emit_attrs);
apogee.xml.emit_tag = (function emit_tag(tag){
var temp__3695__auto____229260 = apogee.xml.get_name.call(null,tag);
if(cljs.core.truth_(temp__3695__auto____229260))
{var n__229261 = temp__3695__auto____229260;
return [cljs.core.str("<"),cljs.core.str(n__229261),cljs.core.str(" "),cljs.core.str(apogee.xml.emit_attrs.call(null,apogee.xml.get_attrs.call(null,tag))),cljs.core.str((cljs.core.truth_(cljs.core.seq.call(null,apogee.xml.get_content.call(null,tag)))?[cljs.core.str(">"),cljs.core.str(cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (p1__229252_SHARP_){
if(cljs.core.string_QMARK_.call(null,p1__229252_SHARP_))
{return p1__229252_SHARP_;
} else
{return emit_tag.call(null,p1__229252_SHARP_);
}
}),apogee.xml.get_content.call(null,tag)))),cljs.core.str("</"),cljs.core.str(n__229261),cljs.core.str(">")].join(''):"/>"))].join('');
} else
{return null;
}
});
goog.exportSymbol('apogee.xml.emit_tag', apogee.xml.emit_tag);
/**
* @param {...*} var_args
*/
apogee.xml.emit = (function() { 
var emit__delegate = function (tags){
return [cljs.core.str(cljs.core.reduce.call(null,(function (p1__229258_SHARP_,p2__229259_SHARP_){
return [cljs.core.str(p1__229258_SHARP_),cljs.core.str(apogee.xml.emit_tag.call(null,p2__229259_SHARP_))].join('');
}),"",tags))].join('');
};
var emit = function (var_args){
var tags = null;
if (goog.isDef(var_args)) {
  tags = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return emit__delegate.call(this, tags);
};
emit.cljs$lang$maxFixedArity = 0;
emit.cljs$lang$applyTo = (function (arglist__229262){
var tags = cljs.core.seq(arglist__229262);;
return emit__delegate(tags);
});
emit.cljs$lang$arity$variadic = emit__delegate;
return emit;
})()
;
goog.exportSymbol('apogee.xml.emit', apogee.xml.emit);
apogee.xml.parse_xml_map = (function parse_xml_map(xml_map){
if(cljs.core.map_QMARK_.call(null,xml_map))
{var map__229267__229268 = xml_map;
var map__229267__229269 = ((cljs.core.seq_QMARK_.call(null,map__229267__229268))?cljs.core.apply.call(null,cljs.core.hash_map,map__229267__229268):map__229267__229268);
var content__229270 = cljs.core.get.call(null,map__229267__229269,"\uFDD0'content");
var attrs__229271 = cljs.core.get.call(null,map__229267__229269,"\uFDD0'attrs");
var tag__229272 = cljs.core.get.call(null,map__229267__229269,"\uFDD0'tag");
return cljs.core.concat.call(null,(cljs.core.truth_(attrs__229271)?cljs.core.PersistentVector.fromArray([tag__229272,attrs__229271]):cljs.core.PersistentVector.fromArray([tag__229272])),cljs.core.map.call(null,parse_xml_map,content__229270));
} else
{return xml_map;
}
});
goog.exportSymbol('apogee.xml.parse_xml_map', apogee.xml.parse_xml_map);
/**
* Provides selector functionality used by filter-xml and transform-xml.
* 
* Examples of selectors:
* :tag-name
* {attr-name val}
* [:and :tag-name {:attr val}]
* [:or :tag1 :tag2]
* [:and [:not {attr val}] [:or :tag1 :tag2]]
* 
* 
*/
apogee.xml.select_loc_QMARK_ = (function select_loc_QMARK_(loc,selector){
if(cljs.core.truth_(clojure.zip.branch_QMARK_.call(null,loc)))
{var node__229273 = clojure.zip.node.call(null,loc);
if(cljs.core.map_QMARK_.call(null,selector))
{var and__3546__auto____229274 = apogee.xml.has_attrs_QMARK_.call(null,node__229273);
if(cljs.core.truth_(and__3546__auto____229274))
{return cljs.core._EQ_.call(null,cljs.core.select_keys.call(null,apogee.xml.get_attrs.call(null,node__229273),cljs.core.keys.call(null,selector)),selector);
} else
{return and__3546__auto____229274;
}
} else
{if((function (){var or__3548__auto____229275 = cljs.core.string_QMARK_.call(null,selector);
if(or__3548__auto____229275)
{return or__3548__auto____229275;
} else
{return cljs.core.keyword_QMARK_.call(null,selector);
}
})())
{return cljs.core._EQ_.call(null,apogee.xml.get_name.call(null,node__229273),cljs.core.name.call(null,selector));
} else
{if(cljs.core.coll_QMARK_.call(null,selector))
{var pred__229276__229279 = cljs.core._EQ_;
var expr__229277__229280 = cljs.core.first.call(null,selector);
if(cljs.core.truth_(pred__229276__229279.call(null,"\uFDD0'and",expr__229277__229280)))
{return cljs.core.reduce.call(null,(function (p1__229263_SHARP_,p2__229264_SHARP_){
var and__3546__auto____229281 = p1__229263_SHARP_;
if(cljs.core.truth_(and__3546__auto____229281))
{return select_loc_QMARK_.call(null,loc,p2__229264_SHARP_);
} else
{return and__3546__auto____229281;
}
}),true,cljs.core.next.call(null,selector));
} else
{if(cljs.core.truth_(pred__229276__229279.call(null,"\uFDD0'or",expr__229277__229280)))
{return cljs.core.reduce.call(null,(function (p1__229265_SHARP_,p2__229266_SHARP_){
var or__3548__auto____229282 = p1__229265_SHARP_;
if(cljs.core.truth_(or__3548__auto____229282))
{return or__3548__auto____229282;
} else
{return select_loc_QMARK_.call(null,loc,p2__229266_SHARP_);
}
}),false,cljs.core.next.call(null,selector));
} else
{if(cljs.core.truth_(pred__229276__229279.call(null,"\uFDD0'not",expr__229277__229280)))
{return cljs.core.not.call(null,select_loc_QMARK_.call(null,loc,cljs.core.PersistentVector.fromArray(["\uFDD0'or",cljs.core.second.call(null,selector)])));
} else
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__229277__229280)].join('')));
}
}
}
} else
{return null;
}
}
}
} else
{return null;
}
});
goog.exportSymbol('apogee.xml.select_loc_QMARK_', apogee.xml.select_loc_QMARK_);
apogee.xml.filter_xml = (function filter_xml(xml_seq,p__229283){
var vec__229284__229285 = p__229283;
var selectors__229286 = cljs.core.nthnext.call(null,vec__229284__229285,0);
var filter_xml_STAR___229294 = (function filter_xml_STAR_(zip_loc,p__229287){
var vec__229288__229289 = p__229287;
var selector__229290 = cljs.core.nth.call(null,vec__229288__229289,0,null);
var child_selectors__229291 = cljs.core.nthnext.call(null,vec__229288__229289,1);
var nodes__229292 = cljs.core.PersistentVector.fromArray([]);
var loc__229293 = zip_loc;
while(true){
if(cljs.core.truth_(clojure.zip.end_QMARK_.call(null,loc__229293)))
{return nodes__229292;
} else
{{
var G__229295 = (cljs.core.truth_(apogee.xml.select_loc_QMARK_.call(null,loc__229293,selector__229290))?(cljs.core.truth_(cljs.core.seq.call(null,child_selectors__229291))?filter_xml_STAR_.call(null,loc__229293,child_selectors__229291):cljs.core.conj.call(null,nodes__229292,clojure.zip.node.call(null,loc__229293))):nodes__229292);
var G__229296 = clojure.zip.next.call(null,loc__229293);
nodes__229292 = G__229295;
loc__229293 = G__229296;
continue;
}
}
break;
}
});
return filter_xml_STAR___229294.call(null,clojure.zip.seq_zip.call(null,xml_seq),selectors__229286);
});
goog.exportSymbol('apogee.xml.filter_xml', apogee.xml.filter_xml);
/**
* @param {...*} var_args
*/
apogee.xml.transform_xml = (function() { 
var transform_xml__delegate = function (xml_seq,p__229297,f,args){
var vec__229298__229299 = p__229297;
var selectors__229300 = cljs.core.nthnext.call(null,vec__229298__229299,0);
var transform_xml_STAR___229307 = (function() { 
var transform_xml_STAR___delegate = function (zip_loc,p__229301,f,args){
var vec__229302__229303 = p__229301;
var selector__229304 = cljs.core.nth.call(null,vec__229302__229303,0,null);
var child_selectors__229305 = cljs.core.nthnext.call(null,vec__229302__229303,1);
var loc__229306 = zip_loc;
while(true){
if(cljs.core.truth_(clojure.zip.end_QMARK_.call(null,loc__229306)))
{return loc__229306;
} else
{{
var G__229308 = clojure.zip.next.call(null,(cljs.core.truth_(apogee.xml.select_loc_QMARK_.call(null,loc__229306,selector__229304))?(cljs.core.truth_(cljs.core.seq.call(null,child_selectors__229305))?cljs.core.apply.call(null,transform_xml_STAR_,loc__229306,child_selectors__229305,f,args):cljs.core.apply.call(null,clojure.zip.edit,loc__229306,f,args)):loc__229306));
loc__229306 = G__229308;
continue;
}
}
break;
}
};
var transform_xml_STAR_ = function (zip_loc,p__229301,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return transform_xml_STAR___delegate.call(this, zip_loc, p__229301, f, args);
};
transform_xml_STAR_.cljs$lang$maxFixedArity = 3;
transform_xml_STAR_.cljs$lang$applyTo = (function (arglist__229309){
var zip_loc = cljs.core.first(arglist__229309);
var p__229301 = cljs.core.first(cljs.core.next(arglist__229309));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229309)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__229309)));
return transform_xml_STAR___delegate(zip_loc, p__229301, f, args);
});
transform_xml_STAR_.cljs$lang$arity$variadic = transform_xml_STAR___delegate;
return transform_xml_STAR_;
})()
;
return clojure.zip.root.call(null,cljs.core.apply.call(null,transform_xml_STAR___229307,clojure.zip.seq_zip.call(null,xml_seq),selectors__229300,f,args));
};
var transform_xml = function (xml_seq,p__229297,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return transform_xml__delegate.call(this, xml_seq, p__229297, f, args);
};
transform_xml.cljs$lang$maxFixedArity = 3;
transform_xml.cljs$lang$applyTo = (function (arglist__229310){
var xml_seq = cljs.core.first(arglist__229310);
var p__229297 = cljs.core.first(cljs.core.next(arglist__229310));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__229310)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__229310)));
return transform_xml__delegate(xml_seq, p__229297, f, args);
});
transform_xml.cljs$lang$arity$variadic = transform_xml__delegate;
return transform_xml;
})()
;
goog.exportSymbol('apogee.xml.transform_xml', apogee.xml.transform_xml);
