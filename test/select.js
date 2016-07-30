var expect = require('chai').expect;
var Query = require('../');

function q() { return new Query(); }

describe('Select statement', function() {
  it('should generate simple query', function() {
    expect(q().select('*').from('users').str()).to.equal('SELECT * FROM users');
  });

  it('should add distinct', function() {
    expect(q().select('*').distinct.from('users').str()).to.equal('SELECT DISTINCT * FROM users');
  });

  it('should parse where from object', function() {
    expect(q().select('*').from('users').where({ id: 1 }).str()).to.equal('SELECT * FROM users WHERE id=1');
  });

  it('should parse where from string and arguments', function() {
    expect(q().select('*').from('users').where('id = ?', 1).str()).to.equal('SELECT * FROM users WHERE id=1');
  });
});

