var should = require('should');
var co = require('co');

require('../index');

//
// The functions we'll test
//
function make_success(cb) {
  cb(null, 'yay');
}

function make_error(cb) {
  cb('error');
}

function make_success_2(arg, cb) {
  cb(null, arg);
}

function make_error_2(arg, cb) {
  cb('error');
}


describe('usage as promises', function() {

  it('should work with functions that have no arguments besides the callback', function(done) {
    make_success.promise().then(function(val) {
      val.should.equal('yay');
      done();
    }, function(err) {
      should.not.exist(err);
    })
  })

  it('should work with functions that have other arguments besides the callback', function(done) {
    make_success_2.promise('yay').then(function(val) {
      val.should.equal('yay');
      done();
    }, function(err) {
      should.not.exist(err);
    })
  })

  it('should throw errors if the callback returns with an error', function(done) {
    make_error.promise().then(function(val) {
      should.not.exist(val);
    }, function(err) {
      should.exist(err);
      done();
    })
  })

  it('should throw errors if the callback returns with an error for multiple argument functions', function(done) {
    make_error_2.promise(121213).then(function(val) {
      should.not.exist(val);
    }, function(err) {
      should.exist(err);
      done();
    })
  })

  it('should throw if you pass too many arguments', function(done) {
    make_success.promise(1, 2, 3, 4).catch(function(e) {
      e.should.have.property('stack');
      done();
    })
  })

  it('should make your stupid mistakes with the number of arguments go away', function(done) {
    make_success_2.promise().then(function(val) {
      should.not.exist(val);
      done();
    }).catch(function(e) {
      should.not.exist(e);
      done();
    })
  })

  it('should make your stupid mistakes with the number of arguments go away, with errors', function(done) {
    make_error_2.promise().then(function(val) {
      console.log('wat');
      should.not.exist(val);
      done();
    }).catch(function(e) {
      e.should.equal('error');
      done();
    })
  })

  it('should work with co', function(done) {
    co(function*() {
      var yay = yield make_success.promise();
      yay.should.equal('yay');

      var yay2 = yield make_success_2.promise('yay2');
      yay2.should.equal('yay2');

    }).then(function() {
      done();
    }).catch(function(e) {
      should.not.exist(e);
      done();
    })
  })

  it('should throw errors with co', function(done) {
    co(function*() {
      var booooooooooooooooooo = yield make_error.promise();
    }).then(function(val) {
      should.not.exist(val);
    }).catch(function(e) {
      e.should.equal('error');
      done();
    })
  })

  it('should throw errors with co with complicated args lists', function(done) {
    co(function*() {
      var booooooooooooooooooo = yield make_error_2.promise('derp');
    }).then(function(val) {
      should.not.exist(val);
    }).catch(function(e) {
      e.should.equal('error');
      done();
    })
  })
})
