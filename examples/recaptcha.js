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
        log('Solving recaptcha...');
        return bestcaptchasolver.submit_recaptcha({
            page_url: 'PAGE_URL_HERE',
            site_key: 'SITE_KEY_HERE',
            // other parameters
            // -------------------------------------------
            // reCAPTCHA type(s) - optional, defaults to 1
            // -------------------------------------------
            // 1 - v2
            // 2 - invisible
            // 3 - v3
            // 4 - enterprise v2
            // 5 - enterprise v3
            //
            // type: '1',
            //
            // user_agent: 'Your user agent',    // optional
            // proxy: 'abc:def@12.35.56.78:4321 or 12.35.56.78:4321',        // optional
            // v3_action: '',   // v3 action, optional
            // v3_min_score: '0.3', // if v3, score to target, optional
            // domain: 'www.google.com',      // optional
            // data_s: 'recaptcha data-s parameter used in loading reCAPTCHA',
            // cookie_input: 'a=b;c=d',       // used in reCAPTCHA solving, optional
            // affiliate_id: 'ID of affiliate'       // optional
        });
    }).then(function (id) {
        captcha_id = id;
        log('Got ID ' + id + ', waiting for completion ...');
        return bestcaptchasolver.retrieve_captcha(id);
    }).then(function (data) {
        log('Recaptcha response: ' + data.gresponse);
        // log('Proxy status: ' + data.proxy_status);                // get proxy status (if submitted with proxy)
        // return bestcaptchasolver.set_captcha_bad(captcha_id);     // set captcha as bad
    }).catch(function (err) {
        log('Error: ' + err.message || err);
    }).then(function () {
        log('Example finished !');
    });
}

example();      // run example
