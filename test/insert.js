var expect = require('chai').expect,
  insert = require('..').insert;

describe('Insert statement', function() {
  var user = {
    firstName: 'Oleh',
    lastName: 'Zymnytskiy',
    age: 19,
  };

  it('should generate simple insert statement', function() {
    expect(insert().into('users').values(user).str()).to.equal('INSERT INTO "users" ("firstName", "lastName", "age") VALUES(\'Oleh\', \'Zymnytskiy\', 19)');
  });

  it('should support returning', function() {
    expect(insert().into('users').values(user).returning().str()).to.equal('INSERT INTO "users" ("firstName", "lastName", "age") VALUES(\'Oleh\', \'Zymnytskiy\', 19) RETURNING *');
  });

  it('should support returning as', function() {
    expect(insert().into('users').values(user).returning().as('result').str()).to.equal('INSERT INTO "users" ("firstName", "lastName", "age") VALUES(\'Oleh\', \'Zymnytskiy\', 19) RETURNING * AS "result"');
  });
});

