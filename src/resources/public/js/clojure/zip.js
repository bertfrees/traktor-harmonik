goog.provide('clojure.zip');
goog.require('cljs.core');
/**
* Creates a new zipper structure.
* 
* branch? is a fn that, given a node, returns true if can have
* children, even if it currently doesn't.
* 
* children is a fn that, given a branch node, returns a seq of its
* children.
* 
* make-node is a fn that, given an existing node and a seq of
* children, returns a new branch node with the supplied children.
* root is the root node.
*/
clojure.zip.zipper = (function zipper(branch_QMARK_,children,make_node,root){
return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([root,null]),cljs.core.ObjMap.fromObject(["\uFDD0'zip/make-node","\uFDD0'zip/children","\uFDD0'zip/branch?"],{"\uFDD0'zip/make-node":make_node,"\uFDD0'zip/children":children,"\uFDD0'zip/branch?":branch_QMARK_}));
});
/**
* Returns a zipper for nested sequences, given a root sequence
*/
clojure.zip.seq_zip = (function seq_zip(root){
return clojure.zip.zipper.call(null,cljs.core.seq_QMARK_,cljs.core.identity,(function (node,children){
return cljs.core.with_meta.call(null,children,cljs.core.meta.call(null,node));
}),root);
});
/**
* Returns a zipper for nested vectors, given a root vector
*/
clojure.zip.vector_zip = (function vector_zip(root){
return clojure.zip.zipper.call(null,cljs.core.vector_QMARK_,cljs.core.seq,(function (node,children){
return cljs.core.with_meta.call(null,cljs.core.vec.call(null,children),cljs.core.meta.call(null,node));
}),root);
});
/**
* Returns a zipper for xml elements (as from xml/parse),
* given a root element
*/
clojure.zip.xml_zip = (function xml_zip(root){
return clojure.zip.zipper.call(null,cljs.core.complement.call(null,cljs.core.string_QMARK_),cljs.core.comp.call(null,cljs.core.seq,"\uFDD0'content"),(function (node,children){
return cljs.core.assoc.call(null,node,"\uFDD0'content",(function (){var and__3546__auto____232587 = children;
if(cljs.core.truth_(and__3546__auto____232587))
{return cljs.core.apply.call(null,cljs.core.vector,children);
} else
{return and__3546__auto____232587;
}
})());
}),root);
});
/**
* Returns the node at loc
*/
clojure.zip.node = (function node(loc){
return loc.call(null,0);
});
/**
* Returns true if the node at loc is a branch
*/
clojure.zip.branch_QMARK_ = (function branch_QMARK_(loc){
return "\uFDD0'zip/branch?".call(null,cljs.core.meta.call(null,loc)).call(null,clojure.zip.node.call(null,loc));
});
/**
* Returns a seq of the children of node at loc, which must be a branch
*/
clojure.zip.children = (function children(loc){
if(cljs.core.truth_(clojure.zip.branch_QMARK_.call(null,loc)))
{return "\uFDD0'zip/children".call(null,cljs.core.meta.call(null,loc)).call(null,clojure.zip.node.call(null,loc));
} else
{throw "called children on a leaf node";
}
});
/**
* Returns a new branch node, given an existing node and new
* children. The loc is only used to supply the constructor.
*/
clojure.zip.make_node = (function make_node(loc,node,children){
return "\uFDD0'zip/make-node".call(null,cljs.core.meta.call(null,loc)).call(null,node,children);
});
/**
* Returns a seq of nodes leading to this loc
*/
clojure.zip.path = (function path(loc){
return "\uFDD0'pnodes".call(null,loc.call(null,1));
});
/**
* Returns a seq of the left siblings of this loc
*/
clojure.zip.lefts = (function lefts(loc){
return cljs.core.seq.call(null,"\uFDD0'l".call(null,loc.call(null,1)));
});
/**
* Returns a seq of the right siblings of this loc
*/
clojure.zip.rights = (function rights(loc){
return "\uFDD0'r".call(null,loc.call(null,1));
});
/**
* Returns the loc of the leftmost child of the node at this loc, or
* nil if no children
*/
clojure.zip.down = (function down(loc){
if(cljs.core.truth_(clojure.zip.branch_QMARK_.call(null,loc)))
{var vec__232588__232590 = loc;
var node__232591 = cljs.core.nth.call(null,vec__232588__232590,0,null);
var path__232592 = cljs.core.nth.call(null,vec__232588__232590,1,null);
var vec__232589__232593 = clojure.zip.children.call(null,loc);
var c__232594 = cljs.core.nth.call(null,vec__232589__232593,0,null);
var cnext__232595 = cljs.core.nthnext.call(null,vec__232589__232593,1);
var cs__232596 = vec__232589__232593;
if(cljs.core.truth_(cs__232596))
{return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([c__232594,cljs.core.ObjMap.fromObject(["\uFDD0'l","\uFDD0'pnodes","\uFDD0'ppath","\uFDD0'r"],{"\uFDD0'l":cljs.core.PersistentVector.fromArray([]),"\uFDD0'pnodes":(cljs.core.truth_(path__232592)?cljs.core.conj.call(null,"\uFDD0'pnodes".call(null,path__232592),node__232591):cljs.core.PersistentVector.fromArray([node__232591])),"\uFDD0'ppath":path__232592,"\uFDD0'r":cnext__232595})]),cljs.core.meta.call(null,loc));
} else
{return null;
}
} else
{return null;
}
});
/**
* Returns the loc of the parent of the node at this loc, or nil if at
* the top
*/
clojure.zip.up = (function up(loc){
var vec__232597__232598 = loc;
var node__232599 = cljs.core.nth.call(null,vec__232597__232598,0,null);
var path__232600 = cljs.core.nth.call(null,vec__232597__232598,1,null);
var path__232601 = ((cljs.core.seq_QMARK_.call(null,path__232600))?cljs.core.apply.call(null,cljs.core.hash_map,path__232600):path__232600);
var l__232602 = cljs.core.get.call(null,path__232601,"\uFDD0'l");
var ppath__232603 = cljs.core.get.call(null,path__232601,"\uFDD0'ppath");
var pnodes__232604 = cljs.core.get.call(null,path__232601,"\uFDD0'pnodes");
var r__232605 = cljs.core.get.call(null,path__232601,"\uFDD0'r");
var changed_QMARK___232606 = cljs.core.get.call(null,path__232601,"\uFDD0'changed?");
if(cljs.core.truth_(pnodes__232604))
{var pnode__232607 = cljs.core.peek.call(null,pnodes__232604);
return cljs.core.with_meta.call(null,(cljs.core.truth_(changed_QMARK___232606)?cljs.core.PersistentVector.fromArray([clojure.zip.make_node.call(null,loc,pnode__232607,cljs.core.concat.call(null,l__232602,cljs.core.cons.call(null,node__232599,r__232605))),(function (){var and__3546__auto____232608 = ppath__232603;
if(cljs.core.truth_(and__3546__auto____232608))
{return cljs.core.assoc.call(null,ppath__232603,"\uFDD0'changed?",true);
} else
{return and__3546__auto____232608;
}
})()]):cljs.core.PersistentVector.fromArray([pnode__232607,ppath__232603])),cljs.core.meta.call(null,loc));
} else
{return null;
}
});
/**
* zips all the way up and returns the root node, reflecting any
* changes.
*/
clojure.zip.root = (function root(loc){
while(true){
if(cljs.core._EQ_.call(null,"\uFDD0'end",loc.call(null,1)))
{return clojure.zip.node.call(null,loc);
} else
{var p__232609 = clojure.zip.up.call(null,loc);
if(cljs.core.truth_(p__232609))
{{
var G__232610 = p__232609;
loc = G__232610;
continue;
}
} else
{return clojure.zip.node.call(null,loc);
}
}
break;
}
});
/**
* Returns the loc of the right sibling of the node at this loc, or nil
*/
clojure.zip.right = (function right(loc){
var vec__232611__232613 = loc;
var node__232614 = cljs.core.nth.call(null,vec__232611__232613,0,null);
var path__232615 = cljs.core.nth.call(null,vec__232611__232613,1,null);
var path__232616 = ((cljs.core.seq_QMARK_.call(null,path__232615))?cljs.core.apply.call(null,cljs.core.hash_map,path__232615):path__232615);
var l__232617 = cljs.core.get.call(null,path__232616,"\uFDD0'l");
var vec__232612__232618 = cljs.core.get.call(null,path__232616,"\uFDD0'r");
var r__232619 = cljs.core.nth.call(null,vec__232612__232618,0,null);
var rnext__232620 = cljs.core.nthnext.call(null,vec__232612__232618,1);
var rs__232621 = vec__232612__232618;
if(cljs.core.truth_((function (){var and__3546__auto____232622 = path__232616;
if(cljs.core.truth_(and__3546__auto____232622))
{return rs__232621;
} else
{return and__3546__auto____232622;
}
})()))
{return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([r__232619,cljs.core.assoc.call(null,path__232616,"\uFDD0'l",cljs.core.conj.call(null,l__232617,node__232614),"\uFDD0'r",rnext__232620)]),cljs.core.meta.call(null,loc));
} else
{return null;
}
});
/**
* Returns the loc of the rightmost sibling of the node at this loc, or self
*/
clojure.zip.rightmost = (function rightmost(loc){
var vec__232623__232624 = loc;
var node__232625 = cljs.core.nth.call(null,vec__232623__232624,0,null);
var path__232626 = cljs.core.nth.call(null,vec__232623__232624,1,null);
var path__232627 = ((cljs.core.seq_QMARK_.call(null,path__232626))?cljs.core.apply.call(null,cljs.core.hash_map,path__232626):path__232626);
var l__232628 = cljs.core.get.call(null,path__232627,"\uFDD0'l");
var r__232629 = cljs.core.get.call(null,path__232627,"\uFDD0'r");
if(cljs.core.truth_((function (){var and__3546__auto____232630 = path__232627;
if(cljs.core.truth_(and__3546__auto____232630))
{return r__232629;
} else
{return and__3546__auto____232630;
}
})()))
{return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([cljs.core.last.call(null,r__232629),cljs.core.assoc.call(null,path__232627,"\uFDD0'l",cljs.core.apply.call(null,cljs.core.conj,l__232628,node__232625,cljs.core.butlast.call(null,r__232629)),"\uFDD0'r",null)]),cljs.core.meta.call(null,loc));
} else
{return loc;
}
});
/**
* Returns the loc of the left sibling of the node at this loc, or nil
*/
clojure.zip.left = (function left(loc){
var vec__232631__232632 = loc;
var node__232633 = cljs.core.nth.call(null,vec__232631__232632,0,null);
var path__232634 = cljs.core.nth.call(null,vec__232631__232632,1,null);
var path__232635 = ((cljs.core.seq_QMARK_.call(null,path__232634))?cljs.core.apply.call(null,cljs.core.hash_map,path__232634):path__232634);
var l__232636 = cljs.core.get.call(null,path__232635,"\uFDD0'l");
var r__232637 = cljs.core.get.call(null,path__232635,"\uFDD0'r");
if(cljs.core.truth_((function (){var and__3546__auto____232638 = path__232635;
if(cljs.core.truth_(and__3546__auto____232638))
{return cljs.core.seq.call(null,l__232636);
} else
{return and__3546__auto____232638;
}
})()))
{return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([cljs.core.peek.call(null,l__232636),cljs.core.assoc.call(null,path__232635,"\uFDD0'l",cljs.core.pop.call(null,l__232636),"\uFDD0'r",cljs.core.cons.call(null,node__232633,r__232637))]),cljs.core.meta.call(null,loc));
} else
{return null;
}
});
/**
* Returns the loc of the leftmost sibling of the node at this loc, or self
*/
clojure.zip.leftmost = (function leftmost(loc){
var vec__232639__232640 = loc;
var node__232641 = cljs.core.nth.call(null,vec__232639__232640,0,null);
var path__232642 = cljs.core.nth.call(null,vec__232639__232640,1,null);
var path__232643 = ((cljs.core.seq_QMARK_.call(null,path__232642))?cljs.core.apply.call(null,cljs.core.hash_map,path__232642):path__232642);
var l__232644 = cljs.core.get.call(null,path__232643,"\uFDD0'l");
var r__232645 = cljs.core.get.call(null,path__232643,"\uFDD0'r");
if(cljs.core.truth_((function (){var and__3546__auto____232646 = path__232643;
if(cljs.core.truth_(and__3546__auto____232646))
{return cljs.core.seq.call(null,l__232644);
} else
{return and__3546__auto____232646;
}
})()))
{return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([cljs.core.first.call(null,l__232644),cljs.core.assoc.call(null,path__232643,"\uFDD0'l",cljs.core.PersistentVector.fromArray([]),"\uFDD0'r",cljs.core.concat.call(null,cljs.core.rest.call(null,l__232644),cljs.core.PersistentVector.fromArray([node__232641]),r__232645))]),cljs.core.meta.call(null,loc));
} else
{return loc;
}
});
/**
* Inserts the item as the left sibling of the node at this loc,
* without moving
*/
clojure.zip.insert_left = (function insert_left(loc,item){
var vec__232647__232648 = loc;
var node__232649 = cljs.core.nth.call(null,vec__232647__232648,0,null);
var path__232650 = cljs.core.nth.call(null,vec__232647__232648,1,null);
var path__232651 = ((cljs.core.seq_QMARK_.call(null,path__232650))?cljs.core.apply.call(null,cljs.core.hash_map,path__232650):path__232650);
var l__232652 = cljs.core.get.call(null,path__232651,"\uFDD0'l");
if((path__232651 == null))
{throw "Insert at top";
} else
{return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([node__232649,cljs.core.assoc.call(null,path__232651,"\uFDD0'l",cljs.core.conj.call(null,l__232652,item),"\uFDD0'changed?",true)]),cljs.core.meta.call(null,loc));
}
});
/**
* Inserts the item as the right sibling of the node at this loc,
* without moving
*/
clojure.zip.insert_right = (function insert_right(loc,item){
var vec__232653__232654 = loc;
var node__232655 = cljs.core.nth.call(null,vec__232653__232654,0,null);
var path__232656 = cljs.core.nth.call(null,vec__232653__232654,1,null);
var path__232657 = ((cljs.core.seq_QMARK_.call(null,path__232656))?cljs.core.apply.call(null,cljs.core.hash_map,path__232656):path__232656);
var r__232658 = cljs.core.get.call(null,path__232657,"\uFDD0'r");
if((path__232657 == null))
{throw "Insert at top";
} else
{return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([node__232655,cljs.core.assoc.call(null,path__232657,"\uFDD0'r",cljs.core.cons.call(null,item,r__232658),"\uFDD0'changed?",true)]),cljs.core.meta.call(null,loc));
}
});
/**
* Replaces the node at this loc, without moving
*/
clojure.zip.replace = (function replace(loc,node){
var vec__232659__232660 = loc;
var ___232661 = cljs.core.nth.call(null,vec__232659__232660,0,null);
var path__232662 = cljs.core.nth.call(null,vec__232659__232660,1,null);
return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([node,cljs.core.assoc.call(null,path__232662,"\uFDD0'changed?",true)]),cljs.core.meta.call(null,loc));
});
/**
* Replaces the node at this loc with the value of (f node args)
* @param {...*} var_args
*/
clojure.zip.edit = (function() { 
var edit__delegate = function (loc,f,args){
return clojure.zip.replace.call(null,loc,cljs.core.apply.call(null,f,clojure.zip.node.call(null,loc),args));
};
var edit = function (loc,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return edit__delegate.call(this, loc, f, args);
};
edit.cljs$lang$maxFixedArity = 2;
edit.cljs$lang$applyTo = (function (arglist__232663){
var loc = cljs.core.first(arglist__232663);
var f = cljs.core.first(cljs.core.next(arglist__232663));
var args = cljs.core.rest(cljs.core.next(arglist__232663));
return edit__delegate(loc, f, args);
});
edit.cljs$lang$arity$variadic = edit__delegate;
return edit;
})()
;
/**
* Inserts the item as the leftmost child of the node at this loc,
* without moving
*/
clojure.zip.insert_child = (function insert_child(loc,item){
return clojure.zip.replace.call(null,loc,clojure.zip.make_node.call(null,loc,clojure.zip.node.call(null,loc),cljs.core.cons.call(null,item,clojure.zip.children.call(null,loc))));
});
/**
* Inserts the item as the rightmost child of the node at this loc,
* without moving
*/
clojure.zip.append_child = (function append_child(loc,item){
return clojure.zip.replace.call(null,loc,clojure.zip.make_node.call(null,loc,clojure.zip.node.call(null,loc),cljs.core.concat.call(null,clojure.zip.children.call(null,loc),cljs.core.PersistentVector.fromArray([item]))));
});
/**
* Moves to the next loc in the hierarchy, depth-first. When reaching
* the end, returns a distinguished loc detectable via end?. If already
* at the end, stays there.
*/
clojure.zip.next = (function next(loc){
if(cljs.core._EQ_.call(null,"\uFDD0'end",loc.call(null,1)))
{return loc;
} else
{var or__3548__auto____232665 = (function (){var and__3546__auto____232664 = clojure.zip.branch_QMARK_.call(null,loc);
if(cljs.core.truth_(and__3546__auto____232664))
{return clojure.zip.down.call(null,loc);
} else
{return and__3546__auto____232664;
}
})();
if(cljs.core.truth_(or__3548__auto____232665))
{return or__3548__auto____232665;
} else
{var or__3548__auto____232666 = clojure.zip.right.call(null,loc);
if(cljs.core.truth_(or__3548__auto____232666))
{return or__3548__auto____232666;
} else
{var p__232667 = loc;
while(true){
if(cljs.core.truth_(clojure.zip.up.call(null,p__232667)))
{var or__3548__auto____232668 = clojure.zip.right.call(null,clojure.zip.up.call(null,p__232667));
if(cljs.core.truth_(or__3548__auto____232668))
{return or__3548__auto____232668;
} else
{{
var G__232669 = clojure.zip.up.call(null,p__232667);
p__232667 = G__232669;
continue;
}
}
} else
{return cljs.core.PersistentVector.fromArray([clojure.zip.node.call(null,p__232667),"\uFDD0'end"]);
}
break;
}
}
}
}
});
/**
* Moves to the previous loc in the hierarchy, depth-first. If already
* at the root, returns nil.
*/
clojure.zip.prev = (function prev(loc){
var temp__3695__auto____232670 = clojure.zip.left.call(null,loc);
if(cljs.core.truth_(temp__3695__auto____232670))
{var lloc__232671 = temp__3695__auto____232670;
var loc__232672 = lloc__232671;
while(true){
var temp__3695__auto____232674 = (function (){var and__3546__auto____232673 = clojure.zip.branch_QMARK_.call(null,loc__232672);
if(cljs.core.truth_(and__3546__auto____232673))
{return clojure.zip.down.call(null,loc__232672);
} else
{return and__3546__auto____232673;
}
})();
if(cljs.core.truth_(temp__3695__auto____232674))
{var child__232675 = temp__3695__auto____232674;
{
var G__232676 = clojure.zip.rightmost.call(null,child__232675);
loc__232672 = G__232676;
continue;
}
} else
{return loc__232672;
}
break;
}
} else
{return clojure.zip.up.call(null,loc);
}
});
/**
* Returns true if loc represents the end of a depth-first walk
*/
clojure.zip.end_QMARK_ = (function end_QMARK_(loc){
return cljs.core._EQ_.call(null,"\uFDD0'end",loc.call(null,1));
});
/**
* Removes the node at loc, returning the loc that would have preceded
* it in a depth-first walk.
*/
clojure.zip.remove = (function remove(loc){
var vec__232677__232678 = loc;
var node__232679 = cljs.core.nth.call(null,vec__232677__232678,0,null);
var path__232680 = cljs.core.nth.call(null,vec__232677__232678,1,null);
var path__232681 = ((cljs.core.seq_QMARK_.call(null,path__232680))?cljs.core.apply.call(null,cljs.core.hash_map,path__232680):path__232680);
var l__232682 = cljs.core.get.call(null,path__232681,"\uFDD0'l");
var ppath__232683 = cljs.core.get.call(null,path__232681,"\uFDD0'ppath");
var pnodes__232684 = cljs.core.get.call(null,path__232681,"\uFDD0'pnodes");
var rs__232685 = cljs.core.get.call(null,path__232681,"\uFDD0'r");
if((path__232681 == null))
{throw "Remove at top";
} else
{if((cljs.core.count.call(null,l__232682) > 0))
{var loc__232686 = cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([cljs.core.peek.call(null,l__232682),cljs.core.assoc.call(null,path__232681,"\uFDD0'l",cljs.core.pop.call(null,l__232682),"\uFDD0'changed?",true)]),cljs.core.meta.call(null,loc));
while(true){
var temp__3695__auto____232688 = (function (){var and__3546__auto____232687 = clojure.zip.branch_QMARK_.call(null,loc__232686);
if(cljs.core.truth_(and__3546__auto____232687))
{return clojure.zip.down.call(null,loc__232686);
} else
{return and__3546__auto____232687;
}
})();
if(cljs.core.truth_(temp__3695__auto____232688))
{var child__232689 = temp__3695__auto____232688;
{
var G__232691 = clojure.zip.rightmost.call(null,child__232689);
loc__232686 = G__232691;
continue;
}
} else
{return loc__232686;
}
break;
}
} else
{return cljs.core.with_meta.call(null,cljs.core.PersistentVector.fromArray([clojure.zip.make_node.call(null,loc,cljs.core.peek.call(null,pnodes__232684),rs__232685),(function (){var and__3546__auto____232690 = ppath__232683;
if(cljs.core.truth_(and__3546__auto____232690))
{return cljs.core.assoc.call(null,ppath__232683,"\uFDD0'changed?",true);
} else
{return and__3546__auto____232690;
}
})()]),cljs.core.meta.call(null,loc));
}
}
});
