var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash' );
var mongoose = require('mongoose');

var data = require('../../models/entries')

 describe('Entries', function (){

  beforeEach(function(){
    while(data.length > 4){
      data.model.deleteMany([{"NewPart": "INTEL i7 4th gen"}]);
    };
  });


      describe('GET /entries', function () {
              it('should return all', function(done) {
                    chai.request(server)
                        .get('/entries')
                        .end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.equal(4);
      var result = _.map(res.body, function (entry) {
          return { 
             OldPart : entry.OldPart,
             NewPart : entry.NewPart,
              Device: entry.Device,
             Likey : entry.Likey,  
          NoLikey: entry.NoLikey}
      });
     // expect(result).to.include( {Device : "HP", NewPart: "GTX_700", OldPart : "GTX_900", NoLikey : 0, Likey : 0  } );
      done();
  });
              });
        }); //End of GET/entries

 describe('POST /entries', function () {
          it('should return message entry was added', function(done) {
              var entry = { 
                  Device : "MSI", 
                  NewPart: "INTEL i7 4th gen",
                  OldPart : "INTEL i7 6th gen"
                };
                chai.request(server)
                  .post('/entries')
                  .send(entry)
                  .end(function(err, res) {
                       expect(res).to.have.status(200);
               expect(res.body).to.have.property('message').equal('Entry Added' ) ;
                     done();
                  });
          });
      }); //end of POST/entries

 describe('PUT /entries/:id/Likey', function () {
    it('should return entries +1 Likey', function(done) {
        chai.request(server)
            .put('/entries/5a00805a58f23cfd7c3c4a96/Likey')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).be.be.a('object');
               // expect(res.body).to.have.property('message').eql('Entry liked')
                var result = _.map(res.body, function (entries) {
                    return {// _id: entries._id, 
                        Likey: entries.Likey };
                }  );
               // expect(result).to.include( {Likey:4  } );
                done();
            });
    });
}); //end of PUT/entries

 describe('PUT /entries/:id/NoLikey', function () {
    it('should return entries +1 NoLikey', function(done) {
        chai.request(server)
            .put('/entries/5a00805a58f23cfd7c3c4a96/NoLikey')
            .end(function(err, res) {
                expect(res).to.have.status(200);
               // expect(res.body).to.have.property('message').eql('Entry disliked')
                var result = _.map(res.body, function (entries) {
                    return {
                        NoLikey: entries.NoLikey };
                }  );
                done();
            });
    });

}); //end of PUT/entries
describe('DELETE /entries/:id', function () {
    it('should delete a donation', function(done) {
        chai.request(server)
            .delete('/entries/5a01e28a40781e2b80fde6da')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('message').eql('Entry Deleted')
                
                done();
            });
});
    });

  }); //end of Entries

