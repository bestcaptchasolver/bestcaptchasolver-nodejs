#!/usr/bin/node

// require library
var bestcaptchasolver = require('../');
// check /account for accesskey
const ACCESS_TOKEN = 'BAC21DFA5FE5415CA9608BED45F8D703';

// log what's happening to UI and console
function log(txt) {
    console.log(txt);
}

// example method
function example() {
    var captcha_id = undefined;
    bestcaptchasolver.set_access_token(ACCESS_TOKEN);

    // balance
    bestcaptchasolver.account_balance().then(function (balance) {
        log('Balance: $' + balance);   // print balance gathered
        log('Solving image captcha');
        // captcha can be b64 encoded string or image file
        var captcha = 'captcha.png';
        return bestcaptchasolver.submit_captcha({
            b64image: captcha,
            //case_sensitive: true,                 // optional, defaults to false
            //affiliate_id: 'ID of affiliate'       // optional
        });
    }).then(function (id) {
        log('Got ID ' + id + ', waiting for completion ...');
        return bestcaptchasolver.retrieve_captcha(id);
    }).then(function (data) {
        log('Captcha text: ' + data.text);    // print captcha text and submit recaptcha
        log('Solving recaptcha');
        return bestcaptchasolver.submit_recaptcha({
            page_url: 'bestcaptchasolver.com',
            site_key: '6LfGJmcUAAAAALGtIb_FxC0LXm_GwOLyJAfbbUCN',
            //user_agent: 'Your user agent',    // optional
            //proxy: 'abc:def@12.35.56.78:4321 or 12.35.56.78:4321',        // optional
            //type: '1', // 1 - normal, 2 - invisible, 3 - v3, optional and defaults to 1
            //v3_action: '',   // v3 action, optional
            //v3_min_score: '0.3', // if v3, score to target, optional
            //affiliate_id: 'ID of affiliate'       // optional
        });
    }).then(function (id) {
        captcha_id = id;
        log('Got ID ' + id + ', waiting for completion ...');
        return bestcaptchasolver.retrieve_captcha(id);
    }).then(function (data) {
        // --------------------------------------
        log('Recaptcha response: ' + data.gresponse);
        //log('Proxy status: ' + data.proxy_status);

        // Set captcha bad
        // ---------------
    //     return bestcaptchasolver.set_captcha_bad(captcha_id);
    // }).then(function (resp) {
    //     log(resp);
    }).catch(function (err) {
        log('Error: ' + err.message || err);
    }).then(function () {
        log('Example finished !');
    });
}

example();      // run example