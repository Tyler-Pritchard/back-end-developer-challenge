import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app.mjs'; // Adjust the path to your app file
import Character from '../models/characterModel.mjs';
const { expect } = chai;

chai.use(chaiHttp);

describe('Damage Handling', () => {
  let character;

  before(async () => {
    // Clear the character collection and add a test character
    await Character.deleteMany({});
    character = new Character({
      name: 'Briv',
      level: 5,
      hitPoints: 100,
      maxHP: 100,
      defenses: [
        { type: 'fire', defense: 'immunity' },
        { type: 'slashing', defense: 'resistance' }
      ]
    });
    await character.save();
  });

  it('should apply full damage for normal attacks', (done) => {
    chai.request(server)
      .post('/api/damage')
      .send({ characterId: 'Briv', damageType: 'piercing', damageAmount: 10 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.remainingHP).to.equal(90);
        done();
      });
  });

  it('should apply half damage for resistant attacks', (done) => {
    chai.request(server)
      .post('/api/damage')
      .send({ characterId: 'Briv', damageType: 'slashing', damageAmount: 10 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.remainingHP).to.equal(85);
        done();
      });
  });

  it('should apply no damage for immune attacks', (done) => {
    chai.request(server)
      .post('/api/damage')
      .send({ characterId: 'Briv', damageType: 'fire', damageAmount: 10 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.remainingHP).to.equal(85);
        done();
      });
  });

  it('should handle invalid damage type', (done) => {
    chai.request(server)
      .post('/api/damage')
      .send({ characterId: 'Briv', damageType: 'unknown', damageAmount: 10 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.remainingHP).to.equal(75); // Assuming invalid type takes full damage
        done();
      });
  });

  it('should handle invalid inputs', (done) => {
    chai.request(server)
      .post('/api/damage')
      .send({ characterId: 'Briv', damageType: 'slashing' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal('Invalid input');
        done();
      });
  });
});
