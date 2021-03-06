;(function(global){
var NtApp = function(el){
  var app        =  this;
  app.$root      = el;
  app.$children  = [];
  var namespace  = {};
  for(var node   = el.firstChild; node; node = node.nextSibling){
    var sub_app = new NtApp(node);
    app.$children.push(sub_app);
    namespace = Object.assign(namespace, sub_app.$namespace);
  }
  
  
  if(el.getAttribute){ var id = el.getAttribute("nt-id"); if(id) namespace[id] = el; }
  app.$namespace = namespace;
  app.$root.$app = app;
}

  var app = NtApp.prototype;

  app.el = function(name){
    return this.$namespace[name];
  };
  app.s = function(value){
    var name = this.$root.getAttribute("nt-default") || "innerText";
    (this.$root[name] = value);
  };
  
  app.g = function(fn){
    var name = this.$root.getAttribute("nt-default") || "innerText";
    fn = ((typeof fn === "function") ? fn : (function(x){return x;}));
    return fn(this.$root[name]);
  };
  
  app.m = function(mfunc){
      var name = this.$root.getAttribute("nt-default") || "innerText";
      var old = this.$root[name];
      this.$root[name] = mfunc(this.$root[name]);
      return old;
     
  };
  
  app.modify = function(obj){
    var self = this;
    Object.keys(obj).forEach(function(key){
    	if(self.el(key)){
         if(self.el(key).$app === self){
            self.m(obj[key]);
         }else{
            self.el(key).$app.modify({[key]: obj[key]});
         }
      }
    });
  };
  
  
  app.get = function(obj){
    var self = this;
    var ret = {};
    Object.keys(obj).forEach(function(key){
    	if(self.el(key) && self.el(key).$app !== self){
            Object.assign(ret, self.el(key).$app.get(obj));
      }
    });
    Object.keys(obj).forEach(function(key){
         if(self.el(key) && self.el(key).$app === self){
            Object.assign(ret, {[key]: self.g(obj[key])});
         }
    });
    return ret;
  };
 
  
  app.set = function(obj){
    var self = this;
    Object.keys(obj).forEach(function(key){
    	if(self.el(key)){
         if(self.el(key).$app === self){
            self.s(obj[key]);
         }else{
            self.el(key).$app.set({[key]: obj[key]});
         }
      }
    });
  };
  
app.on = function(key, func){  this.$root.addEventListener(key, func); };
var nt_Q = function(obj){
  return document.querySelector(obj);
}
var nt_isString = function(obj){
  return !!({}).toString.call(obj).match(/\[object String\]/);
};
var ntapp = function(sel, par){
  if(!nt_isString(sel)){
     return new NtApp(sel);
  }else{
     var root = document.createElement("nt-root");
     root.innerHTML = sel;
     par.appendChild(root);
     return new NtApp(root);
  } 
};
 module.exports = {
     app: ntapp,
     q: nt_Q,
 };
})(this);
