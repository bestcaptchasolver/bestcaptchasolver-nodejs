const fs = require('fs');
const Q = require('q');
const R = require('requestify');

const BASE_URL = 'https://bcsapi.xyz/api';

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

/**
 * End utils
 */


// private variables
var _access_token = undefined, _username = undefined, _password = undefined;

/**
 * Set access token
 * @param access_token
 */
exports.set_access_token = function (access_token) {
    _access_token = access_token;
};

/**
 * Get account balance
 * @returns {Promise<any>}
 */
exports.account_balance = function () {
    var deferred = Q.defer();
    var data = {}, url = undefined;
    url = BASE_URL + '/user/balance?access_token=' + _access_token;
    R.get(url).then(function (resp) {
        return deferred.resolve(resp.getBody().balance);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit image captcha
 * @param opts
 * @returns {*|Promise<any>|PromiseLike<any>}
 */
exports.submit_captcha = function (opts) {
    var deferred = Q.defer();
    opts.access_token = _access_token;
    const url = BASE_URL + '/captcha/image';
    // check if we got a path instead of b64
    if (fs.existsSync(opts.b64image)) opts.b64image = base64_encode(opts.b64image);
    R.post(url, opts).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit reCAPTCHA
 * @param data
 * @returns {Promise<any>}
 */
exports.submit_recaptcha = function (data) {
    var deferred = Q.defer();
    data.access_token = _access_token;
    var url = BASE_URL + '/captcha/recaptcha';
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit GeeTest
 * @param data
 * @returns {Promise<any>}
 */
exports.submit_geetest = function (data) {
    var deferred = Q.defer();
    data.access_token = _access_token;
    var url = BASE_URL + '/captcha/geetest';
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit GeeTestV4
 * @param data
 * @returns {Promise<any>}
 */
exports.submit_geetest_v4 = function (data) {
    var deferred = Q.defer();
    data.access_token = _access_token;
    var url = BASE_URL + '/captcha/geetestv4';
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit Capy
 * @param data
 * @returns {Promise<any>}
 */
exports.submit_capy = function (data) {
    var deferred = Q.defer();
    data.access_token = _access_token;
    var url = BASE_URL + '/captcha/capy';
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit hCaptcha
 * @param data
 * @returns {Promise<any>}
 */
exports.submit_hcaptcha = function (data) {
    var deferred = Q.defer();
    data.access_token = _access_token;
    var url = BASE_URL + '/captcha/hcaptcha';
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit FunCaptcha
 * @param data
 * @returns {Promise<any>}
 */
exports.submit_funcaptcha = function (data) {
    var deferred = Q.defer();
    data.access_token = _access_token;
    var url = BASE_URL + '/captcha/funcaptcha';
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit turnstile
 * @param data
 * @returns {*}
 */
exports.submit_turnstile = function (data) {
    var deferred = Q.defer();
    data.access_token = _access_token;
    var url = BASE_URL + '/captcha/turnstile';
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Submit task
 * @param data
 * @returns {Promise<any>}
 */
exports.submit_task = function (data) {
    var deferred = Q.defer();
    data.access_token = _access_token;
    var url = BASE_URL + '/captcha/task';
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody().id);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Push variables for task
 * @param id
 * @param pushVariables
 * @returns {Promise<any>}
 */
exports.task_push_variables = function (id, pushVariables) {
    var deferred = Q.defer();
    const data = {
        access_token: _access_token,
        pushVariables
    }
    var url = `${BASE_URL}/captcha/task/pushVariables/${id}`;
    R.post(url, data).then(function (resp) {
        return deferred.resolve(resp.getBody()['status']);
    }).catch(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};

/**
 * Retrieve captcha text or gresponse by ID
 * @param id
 * @returns {Promise<any>}
 */
exports.retrieve_captcha = function (id) {
    var deferred = Q.defer();
    var url = BASE_URL + '/captcha/' + id + '?access_token=' + _access_token;

    // check progress method
    function check_progress() {
        R.get(url).then(function (resp) {
            resp = resp.getBody();
            // still pending ?
            if (resp.status === 'pending') return setTimeout(check_progress, 3000);        // recheck in 3000 millis
            return deferred.resolve(resp);
        }).fail(function (err) {
            return deferred.reject(new Error(err.getBody().error));
        });
    }

    check_progress();       // run it
    return deferred.promise;
};


/**
 * Set captcha bad
 * @param id
 * @returns {Promise<any>}
 */
exports.set_captcha_bad = function (id) {
    var deferred = Q.defer();
    var data = {access_token: _access_token};
    var url = BASE_URL + '/captcha/bad/' + id;
    // check progress method
    R.post(url, data).then(function (resp) {
        resp = resp.getBody();
        return deferred.resolve(resp);
    }).fail(function (err) {
        return deferred.reject(new Error(err.getBody().error));
    });
    return deferred.promise;
};
