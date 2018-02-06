import { LocalStorage } from 'quasar';
import jwt from 'jsonwebtoken';
import JWTHelper from 'src/helpers/jwt';

/**
 * @test {jwtHelper}
 */
describe('JWTHelper', function () {

    beforeEach(function () {
        LocalStorage.clear();
    });

    it('should be able to create an instance of JWTHelper', function () {
        (new JWTHelper('')).should.be.instanceof(JWTHelper);
    });

    it('JWTHelper#hasToken should check token presence', function () {
        const key = 'foo';
        const jwtHelper = new JWTHelper(key);

        jwtHelper.hasToken().should.be.equals(false);
        LocalStorage.set(key, 'value');
        jwtHelper.hasToken().should.be.equals(true);
    });

    it('JWTHelper#getToken should return token', function () {
        const key = 'foo';
        const jwtHelper = new JWTHelper(key);

        should.equal(jwtHelper.getToken(), null);
        LocalStorage.set(key, 'value');
        jwtHelper.getToken().should.be.equals('value');
    });

    it('JWTHelper#setToken should check token presence', function () {
        const key = 'foo';
        const jwtHelper = new JWTHelper(key);

        jwtHelper.setToken('value');
        LocalStorage.get.item(key).should.be.equals('value');
    });

    it('JWTHelper#removeToken should check token presence', function () {
        const key = 'foo';
        const jwtHelper = new JWTHelper(key);

        LocalStorage.set(key, 'value');
        jwtHelper.removeToken();
        jwtHelper.hasToken().should.be.equals(false);
    });

    it('JWTHelper#decode should check token presence', function () {
        const key = 'foo';
        const jwtHelper = new JWTHelper(key);

        LocalStorage.set(key, jwt.sign({ some: 'value' }, 'someSecret'));
        const token = jwtHelper.decode();
        token.should.have.property('header');
        token.should.have.property('payload');
        token.payload.some.should.be.equals('value');
    });
});
