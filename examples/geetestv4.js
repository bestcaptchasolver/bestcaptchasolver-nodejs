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
        log('Submitting geetestv4...');
        return bestcaptchasolver.submit_geetest_v4({
            domain: 'https://example.com',
            captchaid: '647f5ed2ed8acb4be36784e01556bb71',
            // affiliate_id: 'ID of affiliate'       // optional
        });
    }).then(function (id) {
        captcha_id = id;
        log('Got ID ' + id + ', waiting for solution ...');
        return bestcaptchasolver.retrieve_captcha(id);
    }).then(function (data) {
        log('Geetestv4 solution: ' + JSON.stringify(data.solution));
        // return bestcaptchasolver.set_captcha_bad(captcha_id);     // set captcha as bad
    }).catch(function (err) {
        log('Error: ' + err.message || err);
    }).then(function () {
        log('Example finished !');
    });
}

example();      // run example
