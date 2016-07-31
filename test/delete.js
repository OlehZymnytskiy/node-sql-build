var expect = require('chai').expect,
  Query = require('..');

function q() { return new Query(); }

describe('Delete statement', function() {
  it('should generate simple delete statement', function() {
    expect(q().delete.from('users').str()).to.equal('DELETE FROM users');
  });

  it('should add where', function() {
    expect(q().delete.from('users').where({ id: 1 }).str()).to.equal('DELETE FROM users WHERE id=1');
  });
});

