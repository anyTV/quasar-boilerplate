'use strict';

const axios = require('axios').default;
const config = require('./config/env/production');

const app_zone = '<your-app-zone-from-cloudflare>';
const cloudflare_token = config.CLOUDFLARE_API_TOKEN;


async function start () {
    try {
        const response = await axios({
            method: 'POST',
            url: `https://api.cloudflare.com/client/v4/zones/${cid_zone}/purge_cache`,
            data: {
                files: ['<your-app-domain>']
            },
            headers: {
                'Authorization': `Bearer ${cloudflare_token}`
            }
        });

        if (response.data.success) {
            console.log('Successfully purged cache');
            console.log('\n');
        }
    }
    catch (e) {
        console.error('Error purging files: ', e.message);
        console.log('\n');
    }
}

start();
