import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app.mjs'; // Adjust the path to your app file
import Character from '../models/characterModel.mjs';
const { expect } = chai;

chai.use(chaiHttp);

describe('Healing Handling', () => {
  let character;

  before(async () => {
    // Clear the character collection and add a test character
    await Character.deleteMany({});
    character = new Character({
      name: 'Briv',
      level: 5,
      hitPoints: 50,
      maxHP: 100,
      defenses: [
        { type: 'fire', defense: 'immunity' },
        { type: 'slashing', defense: 'resistance' }
      ]
    });
    await character.save();
  });

  it('should heal up to maximum HP', (done) => {
    chai.request(server)
      .post('/api/heal')
      .send({ characterId: 'Briv', healAmount: 60 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.currentHP).to.equal(100); // HP should not exceed maxHP
        done();
      });
  });

  it('should heal correctly within limits', (done) => {
    chai.request(server)
      .post('/api/heal')
      .send({ characterId: 'Briv', healAmount: 30 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.currentHP).to.equal(80); // HP should increase by 30
        done();
      });
  });

  it('should handle invalid heal amount', (done) => {
    chai.request(server)
      .post('/api/heal')
      .send({ characterId: 'Briv', healAmount: 'invalid' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Invalid input');
        done();
      });
  });

  it('should handle missing characterId', (done) => {
    chai.request(server)
      .post('/api/heal')
      .send({ healAmount: 20 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Invalid input');
        done();
      });
  });

  it('should handle non-existent characterId', (done) => {
    chai.request(server)
      .post('/api/heal')
      .send({ characterId: 'NonExistent', healAmount: 20 })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal('Character not found');
        done();
      });
  });
});
