var expect = require('chai').expect,
  q = require('..');

describe('Delete statement', function() {
  it('should generate simple delete statement', function() {
    expect(q.delete().from('users').str()).to.equal('DELETE FROM "users"');
  });

  it('should add where', function() {
    expect(q.delete().from('users').where({ id: 1 }).str()).to.equal('DELETE FROM "users" WHERE id=1');
  });
});

