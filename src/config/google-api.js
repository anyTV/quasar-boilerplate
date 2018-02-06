export default {
    clientURL: 'https://apis.google.com/js/api.js',
    clientId: '',
    scope: [
        'email',
        'profile',
    ].join(' '),
    libraries: [
        'client',
        'auth2'
    ].join(':'),
};
