
define('klass', [], function(require, exports, module) {
/**
  * Klass.js - copyright @dedfat
  * version 1.0
  * https://github.com/ded/klass
  * Follow our software http://twitter.com/dedfat :)
  * MIT License
  */
!function(a,b){function j(a,c){d[e]=this[e];var g=this,h=new d,j=typeof a==b,k=j?a:this,l=j?{}:a,m=function(){this.initialize?this.initialize.apply(this,arguments):(c||f(a)&&g.apply(this,arguments),k.apply(this,arguments))};m.methods=function(a){i(h,a,g),m[e]=h;return this},m.methods.call(m,l).prototype.constructor=m,m.extend=arguments.callee,m[e].implement=m.statics=function(a,b){a=typeof a=="string"?function(){var c={};c[a]=b;return c}():a,i(this,a,g);return this};return m}function i(a,d,f){for(var g in d)d.hasOwnProperty(g)&&(a[g]=typeof d[g]==b&&typeof f[e][g]==b&&c.test(d[g])?h(g,d[g],f):d[g])}function h(a,b,c){return function(){var d=this.supr;this.supr=c[e][a];var f=b.apply(this,arguments);this.supr=d;return f}}function g(a){return j.call(typeof a==b?a:d,a,1)}var c=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,d=function(){},e="prototype",f=function(a){return typeof a===b};if(typeof module!="undefined"&&module.exports)module.exports=g;else{var k=a.klass;g.noConflict=function(){a.klass=k;return this},a.klass=g}}(this,"function")});
