var chai = require('chai');
var expect = chai.expect;
var jsdom = require('jsdom').JSDOM;

var dom = new jsdom(`<!DOCTYPE html><div id="app">
      <div nt-id='name'>unnamed</div>
    </div>`);
global.document = dom.window.document, global.window = document.window;
var nt = require('../../../index.js');
describe('test', function(){
  it('should work', function(){
    var app = nt.app(nt.q("#app"));
    app.el('name').innerText = "Artoria";
    expect(app.get({name: 1}).name).to.eql("Artoria");
  });

  it('should work for set, get and modify', function(){
    dom.window.document.body.innerHTML = `<div id="app">
      <div nt-id='name'>unnamed</div>
      <input nt-id='age' nt-default='value'>
    </div>`;
    var app = nt.app(nt.q("#app"));
    app.set({name: "Hello", age: 99});
    app.modify({name: x => x.toUpperCase()});
    app.on('click', function(){ app.set({name: 'world'});});
    expect(app.get({name: 1}).name).to.eql("HELLO");
    var e = document.createEvent('MouseEvent'); 
    e.initEvent('click', false, false); 
    app.$root.dispatchEvent(e); 
    expect(app.get({name: x => x.toUpperCase()}).name).to.eql("WORLD");
    app.set({age: 99});
    expect(app.get({age: 1}).age).to.eql("99");
    app.modify({age: (x) => x * 2});
    expect(app.get({age: 1}).age).to.eql("198");
  });
      
  it('should work for fragment', function(){
     var app = nt.app(`<div>
      <div nt-id='name'>unnamed</div>
      <input nt-id='age' nt-default='value'>
    </div>`, document.body);
    app.set({name: "Hello", age: 99});
    expect(app.get({name: 1}).name).to.eql("HELLO");    
  });
})
