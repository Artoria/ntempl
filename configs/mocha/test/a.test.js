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
    app.dispatchEvent(e); 
    expect(app.get({name: 1}).name).to.eql("world");
  });
})
