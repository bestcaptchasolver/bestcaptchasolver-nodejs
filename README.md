bestcaptchasolver - Bestcaptchasolver nodeJS client API library
===============================================================

bestcaptchasolver-nodejs is a super easy to use bypass captcha nodeJS API wrapper for bestcaptchasolver.com captcha service

## Installation

    npm install bestcaptchasolver

or

    git clone https://github.com/bestcaptchasolver/bestcaptchasolver-nodejs

## Usage

Set access token, before using the library

``` javascript
var bestcaptchasolver = require('bestcaptchasolver');
bestcaptchasolver.set_access_token('access token from /account');
```


**Get balance**

``` javascript
bestcaptchasolver.account_balance().then(function (balance) {
    console.log('Balance: $', balance);
})
```

**Submit image captcha**

The submission of image captcha is done by sending us the image as a b64 encoded string.

``` javascript
bestcaptchasolver.submit_captcha({
    b64image: captcha,
    // is_case: true,         // case sensitive, default: false, optional
    // is_phrase: true,       // contains at least one space, default: false, optional
    // is_math: true,         // math calculation captcha, default: false, optional
    // alphanumeric: 2,        // 1 (digits only) or 2 (letters only), default: all characters
    // minlength: 2,           // minimum length of captcha text, default: any
    // maxlength: 3,           // maximum length of captcha text, default: any
    // affiliate_id: 'ID of affiliate'       // default: None, optional
}).then(function (id)) { /* use id to retrieve text */ };
```

**Submit reCAPTCHA**

The `page_url` and `site_key` are the only requirements. There are other optional parameters though.

``` javascript
bestcaptchasolver.submit_recaptcha({
    page_url: 'bestcaptchasolver.com',
    site_key: '6LfGJmcUAAAAALGtIb_FxC0LXm_GwOLyJAfbbUCN',
    // user_agent: 'Your user agent',    // optional
    // proxy: 'abc:def@12.35.56.78:4321 or 12.35.56.78:4321',        // optional
    // type: '1', // 1 - normal, 2 - invisible, 3 - v3, optional and defaults to 1
    // v3_action: '',   // v3 action, optional
    // v3_min_score: '0.3', // if v3, score to target, optional
    // data_s: 'recaptcha data-s parameter used in loading reCAPTCHA',
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve response */ };
```

**Geetest**
- domain
- gt
- challenge

```javascript
bestcaptchasolver.submit_geetest({
    domain: 'DOMAIN_HERE',
    gt: 'GT_HERE',
    challenge: 'CHALLENGE_HERE',
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Capy**
- page_url
- site_key

```javascript
bestcaptchasolver.submit_capy({
    page_url: 'PAGE_URL_HERE',
    site_key: 'SITE_KEY_HERE',
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**hCaptcha**
- page_url
- site_key

```javascript
bestcaptchasolver.submit_hcaptcha({
    page_url: 'PAGE_URL_HERE',
    site_key: 'SITE_KEY_HERE',
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Retrieve**

Retrieval is done by passing the ID, for all captchas

``` javascript
bestcaptchasolver.retrieve_captcha(id).then(function (data) { console.log(JSON.stringify(data)); });
```

This method returns an object, with the `text` attribute for image captcha or `gresponse` if submission was done for reCAPTCHA
or `solution` for geetest and capy

**If reCAPTCHA is submitted with proxy, get proxy status**

```javascript
log('Recaptcha response: ' + data.gresponse);
log('Proxy status: ' + data.proxy_status);
```
**Set captcha bad**

```javascript
bestcaptchasolver.set_captcha_bad(captcha_id);
```

## Examples
Check the `examples` folder

## License
API library is licensed under the MIT License

## More information
More info about the API parameters can be found [here](https://bestcaptchasolver.com/captchabypass-api)


<sup><sub>captcha, bypasscaptcha, decaptcher, decaptcha, 2captcha, deathbycaptcha, anticaptcha, 
bypassrecaptchav2, bypassnocaptcharecaptcha, bypassinvisiblerecaptcha, captchaservicesforrecaptchav2, 
recaptchav2captchasolver, googlerecaptchasolver, recaptchasolverpython, recaptchabypassscript</sup></sub>

