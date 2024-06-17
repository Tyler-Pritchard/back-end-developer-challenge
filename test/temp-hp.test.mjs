import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app.mjs'; // Adjust the path to your app file
import Character from '../models/characterModel.mjs';
const { expect } = chai;

chai.use(chaiHttp);

describe('Temporary HP Handling', () => {
  let character;

  before(async () => {
    // Clear the character collection and add a test character
    await Character.deleteMany({});
    character = new Character({
      name: 'Briv',
      level: 5,
      hitPoints: 100,
      maxHP: 100,
      tempHitPoints: 10,
      defenses: [
        { type: 'fire', defense: 'immunity' },
        { type: 'slashing', defense: 'resistance' }
      ]
    });
    await character.save();
  });

  it('should not add temporary HP if new temp HP is lower', (done) => {
    chai.request(server)
      .post('/api/temp-hp')
      .send({ characterId: 'Briv', tempHPAmount: 5 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.currentTempHP).to.equal(10); // tempHP should remain 10
        done();
      });
  });

  it('should replace temporary HP if new temp HP is higher', (done) => {
    chai.request(server)
      .post('/api/temp-hp')
      .send({ characterId: 'Briv', tempHPAmount: 15 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.currentTempHP).to.equal(15); // tempHP should be updated to 15
        done();
      });
  });

  it('should handle invalid temp HP amount', (done) => {
    chai.request(server)
      .post('/api/temp-hp')
      .send({ characterId: 'Briv', tempHPAmount: 'invalid' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Invalid input');
        done();
      });
  });

  it('should handle missing characterId', (done) => {
    chai.request(server)
      .post('/api/temp-hp')
      .send({ tempHPAmount: 20 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Invalid input');
        done();
      });
  });

  it('should handle non-existent characterId', (done) => {
    chai.request(server)
      .post('/api/temp-hp')
      .send({ characterId: 'NonExistent', tempHPAmount: 20 })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Character not found');
        done();
      });
  });
});
