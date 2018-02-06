import _ from 'lodash';
import sinon from 'sinon';

import googleConfig from 'src/config/google-api';
import GoogleAPIClient from 'src/helpers/google-api-client';


const sandbox = sinon.createSandbox({
    useFakeServer: true
});
/**
 * @test {GoogleAPIClient}
 */
describe('GoogleAPIClient', function () {

    afterEach(function () {
        sandbox.restore();
    });
    /**
     * @test {GoogleAPIClient#constructor}
     */
    it('GoogleAPIClient#constructor should create an instance of GoogleAPIClient', function () {

        const client = new GoogleAPIClient({
            apiKey: '',
            clientId: '',
            discoveryDocs: [],
            scope: []
        });

        client.should.be.an.instanceof(GoogleAPIClient);
    });

    /**
     * @test {GoogleAPIClient#load}
     */
    it('GoogleAPIClient#load should return a promise', function () {
        GoogleAPIClient.load(_.pick(googleConfig, ['clientURL', 'libraries'])).should.be.an.instanceof(Promise);
    });

    /**
     * @test {GoogleAPIClient#load}
     */
    it('GoogleAPIClient#load should request for google api script', function () {

        sandbox.useFakeServer();
        const content = '(function(){})()';
        sandbox.server.respondWith('GET', googleConfig.clientURL, [
            200,
            { 'Content-Type': 'application/javascript' },
            content
        ]);
        const callback = sandbox.spy();
        const body = sandbox.stub(document.body, 'appendChild');

        delete window.gapi;

        GoogleAPIClient.load(_.pick(googleConfig, ['clientURL', 'libraries']))
            .then(callback);

        sandbox.server.respond();

        callback.calledWith.should.be.a('function');
        body.calledOnce.should.be.equals(true);
    });

    /**
     * @test {GoogleAPIClient#init}
     */
    it('GoogleAPIClient#init should return a promise', function () {

        const client = new GoogleAPIClient({
            apiKey: '',
            clientId: '',
            discoveryDocs: [],
            scope: []
        });

        client.init([]).should.be.instanceof(Promise);
    });

    /**
     * @test {GoogleAPIClient#grantOfflineAccess}
     */
    it('GoogleAPIClient#grantOfflineAccess should set _offlineAccess', function () {

        const client = new GoogleAPIClient({
            apiKey: '',
            clientId: '',
            discoveryDocs: [],
            scope: []
        });

        const spy = sandbox.spy(client, 'grantOfflineAccess');

        client.grantOfflineAccess();
        spy.thisValues[0]._offlineAccess.should.be.equals(true);

        client.grantOfflineAccess(false);
        spy.thisValues[0]._offlineAccess.should.be.equals(false);

        client.grantOfflineAccess(true);
        spy.thisValues[0]._offlineAccess.should.be.equals(true);
    });
});
