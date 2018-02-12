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
     * @test {GoogleAPIClient}
     */
    it('GoogleAPIClient should request for google api script', function () {

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

        GoogleAPIClient(_.pick(googleConfig, ['clientURL', 'libraries']))
            .then(callback);

        sandbox.server.respond();

        callback.calledWith.should.be.a('function');
        body.calledOnce.should.be.equals(true);
    });
});
