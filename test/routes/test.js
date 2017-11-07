var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../bin/www');
var expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-things'));
var _ = require('lodash' );

 describe('Entries', function (){
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
      expect(result).to.include( {Device : "HP", NewPart: "GTX_700", OldPart : "GTX_900", NoLikey : 0, Likey : 0  } );
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
      }); 



  }); //end of Entries

