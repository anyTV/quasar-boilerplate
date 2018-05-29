export default {
    clientURL: 'https://apis.google.com/js/api.js',
    clientId: process.env.GOOGLE_CLIENT_ID,
    scope: [
        'email',
        'profile',
    ].join(' '),
    libraries: [
        'client',
        'auth2',
    ].join(' '),
};
