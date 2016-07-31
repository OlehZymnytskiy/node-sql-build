var expect = require('chai').expect,
  Query = require('..');

function q() { return new Query(); }

describe('Update statement', function() {
  it('should generate simple update statement', function() {
    expect(q().update('users').set({ oleh: 'nice' }).str()).to.equal("UPDATE users SET oleh='nice'");
  });

  it('should add where', function() {
    expect(q().update('users').set({ oleh: 'nice' }).where({ id: 3 }).str()).to.equal("UPDATE users SET oleh='nice' WHERE id=3");
  });
});

