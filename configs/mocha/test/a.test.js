var chai = require('chai');
var expect = chai.expect;
var jsdom = require('jsdom').JSDOM;


var nt = require('../../../index.js');
describe('test', function(){
  it('should work', function(){
    var dom = new jsdom(`<!DOCTYPE html><div id="app">
      <div nt-id='name'>unnamed</div>
    </div>`);
    global.document = dom.window.document, global.window = document.window;
    var app = nt.app(nt.q("#app"));
    app.el('name').innerText = "Artoria";
    expect(app.get({name: 1}).name).to.eql("Artoria");
  });

  it('should work for set, get and modify', function(){
    var dom = new jsdom(`<div id="app">
      <div nt-id='name'>unnamed</div>
      <input nt-id='age' nt-default='value'>
    </div>`);
    global.document = dom.window.document, global.window = document.window;
    var app = require('ntempl').app(nt.q("#app"));
    app.set({name: "Hello", age: 99});
    app.modify({name: x => x.toUpperCase()});
    expect(app.get({name: 1}).name).to.eql("HELLO");
  })
})