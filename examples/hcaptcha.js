#!/usr/bin/node

// require library
var bestcaptchasolver = require('../');
// check /account for accesskey
const ACCESS_TOKEN = 'ACCESS_TOKEN_HERE';

// log what's happening to UI and console
function log(txt) {
    console.log(txt);
}

// for more details check https://bestcaptchasolver.com/captchabypass-api
// example method
function example() {
    var captcha_id = undefined;
    bestcaptchasolver.set_access_token(ACCESS_TOKEN);

    // balance
    bestcaptchasolver.account_balance().then(function (balance) {
        log('Balance: $' + balance);   // print balance gathered
        log('Solving hCaptcha...');
        return bestcaptchasolver.submit_hcaptcha({
            page_url: 'PAGE_URL_HERE',
            site_key: 'SITE_KEY_HERE',
            // invisible: 1,
            // payload: {rqdata: 'from web requests'},
            // domain: 'hcaptcha.com',
            // user_agent: 'your UA',
            // proxy: '12.34.54.56:1234'
            // affiliate_id: 'ID of affiliate'
        });
    }).then(function (id) {
        captcha_id = id;
        log('Got ID ' + id + ', waiting for completion ...');
        return bestcaptchasolver.retrieve_captcha(id);
    }).then(function (data) {
        log('hCaptcha response: ' + JSON.stringify(data.solution));
    }).catch(function (err) {
        log('Error: ' + err.message || err);
    }).then(function () {
        log('Example finished !');
    });
}

example();      // run example
