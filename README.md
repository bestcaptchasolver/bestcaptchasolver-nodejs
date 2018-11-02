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
There's the `case_sensitive` parameter as well, which is optional, and by default `false`

``` javascript
bestcaptchasolver.submit_captcha({
    b64image: captcha,
    //case_sensitive: true,
});
```

**Submit reCAPTCHA**

The `page_url` and `site_key` are the only requirements. There are other optional parameters though.

``` javascript
bestcaptchasolver.submit_recaptcha({
    page_url: 'bestcaptchasolver.com',
    site_key: '6LfGJmcUAAAAALGtIb_FxC0LXm_GwOLyJAfbbUCN',
    //user_agent: 'Your user agent',
    //proxy: 'abc:def@12.35.56.78:4321 or 12.35.56.78:4321',
    //type: '1', // 1 - normal, 2 - invisible, 3 - v3
    //v3_action: '',   // v3 action
    //v3_min_score: '0.3', // if v3, score to target
});
```

Just like the image submission method, this method also returns an ID, which is then used
to get the text or gresponse.

**Retrieve**

Retrieval is done by passing the ID

``` javascript
bestcaptchasolver.retrieve_captcha(id);
```

This method returns an object, with the `text` attribute for image captcha or `gresponse` if submission was done for reCAPTCHA

The returned object also contains a `proxy_status` attribute, which will tell if any proxy was used in completion, and if not, why

**Affiliate ID**

```javascript
bestcaptchasolver.set_affiliate_id('ID of affiliate from /account');
```

**Set captcha bad**

```javascript
bestcaptchasolver.set_captcha_bad(captcha_id);
```

## Examples
Check the example/example.js

## License
API library is licensed under the MIT License

## More information
More info about the API parameters can be found [here](https://bestcaptchasolver.com/captchabypass-api)


<sup><sub>captcha, bypasscaptcha, decaptcher, decaptcha, 2captcha, deathbycaptcha, anticaptcha, 
bypassrecaptchav2, bypassnocaptcharecaptcha, bypassinvisiblerecaptcha, captchaservicesforrecaptchav2, 
recaptchav2captchasolver, googlerecaptchasolver, recaptchasolverpython, recaptchabypassscript</sup></sub>

