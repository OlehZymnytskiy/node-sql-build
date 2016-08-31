var expect = require('chai').expect,
  q = require('..');

describe('Update statement', function() {
  it('should generate simple update statement', function() {
    expect(q.update().table('users').set({ oleh: 'nice' }).str()).to.equal("UPDATE \"users\" SET oleh='nice'");
  });

  it('should add where', function() {
    expect(q.update().table('users').set({ oleh: 'nice' }).where({ id: 3 }).str()).to.equal("UPDATE \"users\" SET oleh='nice' WHERE id=3");
  });

  it('should support many fields to set', function() {
    expect(q.update().table('users').set({ oleh: 'nice', fresh: 'milk' }).where({ id: 3 }).str()).to.equal("UPDATE \"users\" SET oleh='nice', fresh='milk' WHERE id=3");
  });
});

