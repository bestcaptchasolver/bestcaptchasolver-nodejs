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
    // user_agent: 'Your user agent', // optional
    // proxy: 'abc:def@12.35.56.78:4321 or 12.35.56.78:4321',        // optional
    // v3_action: '',   // v3 action, optional
    // v3_min_score: '0.3', // if v3, score to target, optional
    // domain: 'www.google.com',      // optional
    // data_s: 'recaptcha data-s parameter used in loading reCAPTCHA',
    // cookie_input: 'a=b;c=d',       // used in reCAPTCHA solving, optional
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve response */ };
```

**Geetest**
- domain
- gt
- challenge
- api_server (optional)
- user_agent (optional)
- proxy (optional)

```javascript
bestcaptchasolver.submit_geetest({
    domain: 'DOMAIN_HERE',
    gt: 'GT_HERE',
    challenge: 'CHALLENGE_HERE',
    // api_server: 'GT_DOMAIN_HERE',         // optional
    // user_agent: 'your user agent',        // optional
    // proxy: 'user:pass@123.45.67.89:3031', // optional
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```


**GeetestV4**
- domain
- captchaid
- user_agent (optional)
- proxy (optional)

**Important:** This is not the captchaid that's in our system that you receive while submitting a captcha. Gather this from HTML source of page with geetestv4 captcha, inside the `<script>` tag you'll find a link that looks like this: https://i.imgur.com/XcZd47y.png

```javascript
bestcaptchasolver.submit_geetest_v4({
    domain: 'https://example.com',
    captchaid: '647f5ed2ed8acb4be36784e01556bb71',
    // user_agent: 'your user agent',        // optional
    // proxy: 'user:pass@123.45.67.89:3031', // optional
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Capy**
- page_url
- site_key
- user_agent (optional)
- proxy (optional)

```javascript
bestcaptchasolver.submit_capy({
    page_url: 'PAGE_URL_HERE',
    site_key: 'SITE_KEY_HERE',
    // user_agent: 'your user agent',        // optional
    // proxy: 'user:pass@123.45.67.89:3031', // optional
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**hCaptcha**
- page_url
- site_key
- invisible (optional)
- payload (optional)
- domain (optional)
- user_agent (optional)
- proxy (optional)

```javascript
bestcaptchasolver.submit_hcaptcha({
    page_url: 'PAGE_URL_HERE',
    site_key: 'SITE_KEY_HERE',
    // invisible: 1,
    // payload: {rqdata: 'from web requests'},
    // domain: 'hcaptcha.com',
    // user_agent: 'your UA',
    // proxy: '12.34.54.56:1234'
    // affiliate_id: 'ID of affiliate'
}).then(function (id)) { /* use id to retrieve solution */ };
```

**FunCaptcha (Arkose Labs)**
- page_url
- s_url
- site_key
- data (optional)
- user_agent (optional)
- proxy (optional)

```javascript
bestcaptchasolver.submit_funcaptcha({
    page_url: 'https://abc.com',
    s_url: 'https://api.arkoselabs.com',
    site_key: '11111111-1111-1111-1111-111111111111',
    // data: '{"x":"y"}',                    // optional
    // user_agent: 'your user agent',        // optional
    // proxy: 'user:pass@123.45.67.89:3031', // optional
    // affiliate_id: 'ID of affiliate'       // optional
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Turnstile (Cloudflare)**
- page_url
- site_key
- action (optional)
- cdata (optional)
- domain (optional)
- user_agent (optional)
- proxy (optional)

```javascript
bestcaptchasolver.submit_turnstile({
    page_url: 'PAGE_URL_HERE',
    site_key: 'SITE_KEY_HERE',
    // action: 'taken from page source, optional',
    // cdata: 'taken from page source, optional',
    // domain: 'challenges.cloudflare.com',
    // user_agent: 'your UA',
    // proxy: '12.34.54.56:1234'
    // affiliate_id: 'ID of affiliate'
}).then(function (id)) { /* use id to retrieve solution */ };
```

**Task**
- template_name
- page_url
- variables
- user_agent (optional)
- proxy (optional)

```javascript
bestcaptchasolver.submit_task({
    template_name: 'Login test page',
    page_url: 'https://bestcaptchasolver.com/automation/login',
    variables: {"username": "xyz", "password": "0000"},
    // user_agent: 'your UA',
    // proxy: '12.34.54.56:1234'
    // affiliate_id: 'ID of affiliate'
}).then(function (id)) { /* use id to retrieve solution */ };
```

#### Task pushVariables
Update task variables while it is being solved by the worker. Useful when dealing with data / variables, of which
value you don't know, only after a certain step or action of the task. For example, in websites that require 2 factor
authentication code.

When the task (while running on workers machine) is getting to an action defined in the template, that requires a variable, but variable was not
set with the task submission, it will wait until the variable is updated through push.

The `bestcaptchasolver.task_push_variables(captcha_id, push_variables)` method can be used as many times as it is needed.

```javascript
bestcaptchasolver.task_push_variables(captcha_id, {"tfa_code": "4965"})
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

