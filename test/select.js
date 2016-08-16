var expect = require('chai').expect;
var q = require('..');

describe('Select statement', function() {
  it('should generate simple query', function() {
    expect(q.select().from('users').str()).to.equal('SELECT * FROM "users"');
  });

  it('should add distinct', function() {
    expect(q.select().distinct.from('users').str()).to.equal('SELECT DISTINCT * FROM "users"');
  });

  it('should parse where from object', function() {
    expect(q.select().from('users').where({ id: 1 }).str()).to.equal('SELECT * FROM "users" WHERE id=1');
  });

  it('should parse where from object', function() {
    expect(q.select().from('users').where({ id: 1, user: 'oleh' }).str()).to.equal('SELECT * FROM "users" WHERE id=1 AND user=\'oleh\'');
  });

  it('should parse where from string and arguments', function() {
    expect(q.select().from('users').where('id = ?', 1).str()).to.equal('SELECT * FROM "users" WHERE id=1');
  });

  it('should parse where greater then and another', function() {
    expect(q.select().from('users').where('id = ? a > ? l<=? b >= ?', 1, 2, 3, 4).str()).to.equal('SELECT * FROM "users" WHERE id=1 a>2 l<=3 b>=4');
  });

  it('should parse limit option', function() {
    expect(q.select().from('users').limit(1).str()).to.equal('SELECT * FROM "users" LIMIT 1');
  });

  it('should drop dot from quotes', function() {
    expect(q.select().from('information_schema.tables').str()).to.equal('SELECT * FROM "information_schema"."tables"');
  });
});
