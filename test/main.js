var expect = require('chai').expect,
  q = require('..');

describe('Main features', function() {
  it('should gives same result', function() {
    var myQuery = q.select().from('my_table').where({ id: 1234 });
    expect(myQuery.str()).to.equal(myQuery.toString());
  });

  it('should gives same result', function() {
    var myQuery = q.select().from('my_table').where({ id: 'asdas1234' });
    expect(myQuery.str()).to.equal(myQuery.str());
  });
});

