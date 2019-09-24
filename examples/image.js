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
    let captcha_id = undefined;
    bestcaptchasolver.set_access_token(ACCESS_TOKEN);
    // balance
    bestcaptchasolver.account_balance().then(function (balance) {
        log('Balance: $' + balance);   // print balance gathered
        log('Solving image captcha...');
        // captcha can be b64 encoded string or image file
        var captcha = '../captcha.png';
        return bestcaptchasolver.submit_captcha({
            b64image: captcha,
            // is_case: true,         // case sensitive, default: false, optional
            // is_phrase: true,       // contains at least one space, default: false, optional
            // is_math: true,         // math calculation captcha, default: false, optional
            // alphanumeric: 2,        // 1 (digits only) or 2 (letters only), default: all characters
            // minlength: 2,           // minimum length of captcha text, default: any
            // maxlength: 3,           // maximum length of captcha text, default: any
            // affiliate_id: 'ID of affiliate'       // default: None, optional
        });
    }).then(function (id) {
        log('Got ID ' + id + ', waiting for completion ...');
        captcha_id = id;
        return bestcaptchasolver.retrieve_captcha(id);
    }).then(function (data) {
        log('Captcha text: ' + data.text);    // print captcha text and submit recaptcha
        // return bestcaptchasolver.set_captcha_bad(captcha_id);     // set captcha as bad
    }).catch(function (err) {
        log('Error: ' + err.message || err);
    }).then(function () {
        log('Example finished !');
    });
}

example();      // run example