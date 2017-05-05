var chai = require('chai');
var expect = chai.expect;
var jsdom = require('jsdom').JSDOM;
var dom = new jsdom("<!DOCTYPE html><p>Hello world</p>");
global.document = dom.window.document, global.window = document.window;
var ntapp = require('../../../index.js');
describe('test', function(){
  it('should work', function(){
      expect(1).to.eql(1);
  })
})